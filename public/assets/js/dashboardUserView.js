// const cons = require("consolidate");

var gDealer = null;
var gDealerUsers = [];

var gIndex = null;

function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	GetDealerId();
	
}

function SearchUser(){
	var name = $("#searchInput").val();
	console.log(name)
	GetList(name).then(function (userList) {
		ShowUserList();
		PopulateUserList(userList);
	});
}

async function GetList(name) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.name = name;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/user/list",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}



function GetDealerId() {
	var dId = '';
	for (var i = 0; i < gUser.roles.length; i++) {
		if (gUser.roles[i].role === 'Dealer' || gUser.roles[i].role === 'DealerAdmin') {
			dId = gUser.roles[i].targetId;
		}
	}
	if (dId !== '') {
		GetDealer(dId).then(function (dealer) {
			gDealer = dealer;

			
			gDealerUsers = dealer.users;
			$("#userContainer").empty();
			var html = ``;
			for (var i = 0; i < dealer.users.length; i++) {
				var u = dealer.users[i];
				html += `<li><div class="image"></div>
				<div class="userInfo">
					<p>name:`+ u.name + `</p>
					<p>email:`+ u.email + `</p>
				</div>
				<div class="control">
					<i class="far fa-edit" onclick="showEditUser(`+ i + `)"></i>
					<i class="far fa-trash-alt" onclick="deleteUser(`+ i + `)"></i>
				</div>
				</li>`;
			}
			$("#userContainer").append(html);
		});
	}
}

async function GetDealer(id) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.id = id;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/dealer/get",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			// console.log(results)
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

function PopulateUserList(userList){
	var html = "";
	for(i=0;i!=userList.length;i++){
		var user = userList[i];
		html+="<li id="+i+"  onclick=AddExistingUser("+i+")><p class=username>"+userList[i].name+"</p><p class=email>"+userList[i].email+"</p></li>";
	}
	$(".userList").empty();
	$(".userList").append(html);
}

function ShowAddUserOption() {
	document.querySelector(".userOptionContainer").style = "display:flex;";
}

function ShowAddNewUser() {
	document.querySelector(".userOptionContainer").style = "display:none;";
	document.querySelector(".addNewUser").style = "display:flex;";
}

function ShowSearchUser() {
	document.querySelector(".userOptionContainer").style = "display:none;";
	document.querySelector(".searchUser").style = "display:flex;";
}

function ShowUserList() {
	document.querySelector(".searchUser").style = "display:none;";
	document.querySelector(".userListContainer").style = "display:flex;";
}

function HideSearchUser() {
	document.querySelector(".searchUser").style = "display:none;";
}

function HideAddNewUser() {
	document.querySelector(".addNewUser").style = "display:none;";
}

function showEditUser(index) {
	gIndex = index;
	$("#editName").val(gDealer.users[index].name);
	$("#editEmail").val(gDealer.users[index].email);
	document.querySelector(".editUser").style = "display:flex;";

}

function HideEditUser() {
	document.querySelector(".editUser").style = "display:none;";
}

function SaveEdit() {
	var i = gIndex;
	gDealer.users[i].name=$("#editName").val();
	gDealer.users[i].email=$("#editEmail").val();
	document.querySelector(".editUser").style = "display:none;";

	var update = gDealer.users[i];

	// UpdateUser(gDealer,i).then(function () {});
	
	
	SaveNewUser(tokenId,update).then(function(){
		gDealer.users.push(update);
		console.log(gDealer);
	})
}

function AddExistingUser(index){
	var email = $("#"+index+" .email").text();
	GetSelectedUser(email).then(function (userList) {
		console.log(userList);
		// var name = userList[0].name;
		// var email = userList[0].email;

		var newRole = new Object;
			newRole.role = "DealerAdmin"
			newRole.targetId = gDealer.id;
			newRole.userId = userList[0].id;

			userList[0].roles.push(newRole)

			SaveExistingUser(tokenId,userList).then(function(){
				document.querySelector(".userListContainer").style = "display:none;";
				PageLoadFunction();
				GetDealerId();
			})
			
			
	});
}

async function SaveExistingUser(tokenId,newUser) {
	var obj = new Object();
	obj.tokenId = tokenId
	obj.user = newUser[0];
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}

async function GetSelectedUser(email) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.email = email;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/user/list",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

function SaveUser() {
	var name = $("#name").val();
	var email = $("#email").val();

	NewUser(name,email).then(function (newUser) {
		var newRole = new Object;
		newRole.role = "DealerAdmin"
		newRole.targetId = gDealer.id;
		newRole.userId = newUser.id;
		newUser.name = name;
		newUser.email = email;
		newUser.password = "1234";
		newUser.roles.push(newRole)
		SaveNewUser(tokenId,newUser).then(function(){
			PageLoadFunction()
		})
		GetDealerId();
		document.querySelector(".addNewUser").style = "display:none;";

		
	});
}

async function NewUser(name,email) {
	var obj = new Object();
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/new",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
			
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}

async function SaveNewUser(tokenId,newUser) {
	var obj = new Object();
	obj.tokenId = tokenId
	obj.user = newUser;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}



function deleteUser(index) {
	console.log(gDealer.users[index].roles);
	var newRoles = new Object;
	var x =0;
	for(var i = 0;i!=gDealer.users[index].roles.length;i++){
		if(gDealer.users[index].roles[i].role != "Dealer" && gDealer.users[index].roles[i].role != "DealerAdmin"){
			newRoles[x] = gDealer.users[index].roles[i];
			x++
			
		}
		console.log(newRoles)
	}

	var newUserRoles = new Object;
	var y =0;
	for(var i = 0;i!=gDealer.users[index].userRoles.length;i++){
		if(gDealer.users[index].userRoles[i] != "Dealer" && gDealer.users[index].userRoles[i] != "DealerAdmin"){
			newUserRoles[y] = gDealer.users[index].userRoles[i];
			y++
		}
		console.log(newUserRoles)
	}

	var user = gDealer.users[index];
	console.log(user);
	console.log(newRoles);
	UpdateUserRole(user,newRoles,newUserRoles).then(function (user) {
		user.roles = newRoles;
		user.userRoles = newUserRoles;
		GetDealerId()
	});
}

async function UpdateUserRole(user,newRoles,newUserRoles) {
	var obj = new Object();
	obj.user = user;
	obj.user.roles = newRoles;
	obj.user.userRoles = newUserRoles;
	obj.tokenId = tokenId;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;


	// var obj = new Object();
	// obj.tokenId = tokenId
	// obj.user = newUser;
	// const result = await $.ajax({
	// 	type: "PUT",
	// 	url: "/api/user/save",
	// 	data: obj,
	// 	cache: false,
	// 	dataType: "json",
	// 	contentType: "application/x-www-form-urlencoded",
	// 	success: function (results) {
			
	// 	},
	// 	error: function (results) { console.log(results.statusText); },
	// });
	// return result;

}

async function GetUser(id) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.name = id;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/user/current",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			check(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

function check(currentUser){
	var role = new Object();
	var x = 0;
	for(var i = 0; i != currentUser.user.roles.length; i++){
		if(currentUser.user.roles[i].role == "Dealer" || currentUser.user.roles[i].role == "DealerAdmin"){
			// alert("FUCK")
		}
		else{
			role[x] = currentUser.user.roles[i];
			x++;
		}
	}
	console.log(role)
	currentUser.user.roles = role;
	console.log(currentUser)
	var user=currentUser
	UpdateUser(user).then(function () {
		GetDealerId()
	});
}

async function UpdateUser(user,index) {
	var obj = new Object();
	obj.name = user.users[index].name;
	obj.email = user.users[index].email;
	obj.tokenId = tokenId;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}
