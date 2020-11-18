// const cons = require("consolidate");

var gDealer = null;
var gDealerUsers = [];

var gIndex = null;

function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	GetDealerId();
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



function showAddNewUser() {
	document.querySelector(".addNewUser").style = "display:flex;";
}

function hideAddNewUser() {
	document.querySelector(".addNewUser").style = "display:none;";
}

function showEditUser(index) {
	gIndex = index;
	$("#editName").val(gDealer.users[index].name);
	$("#editEmail").val(gDealer.users[index].email);
	document.querySelector(".editUser").style = "display:flex;";

}

function hideEditUser() {
	document.querySelector(".editUser").style = "display:none;";
}

function saveEdit() {
	var i = gIndex;
	gDealer.users[i].name=$("#editName").val();
	gDealer.users[i].email=$("#editEmail").val();
	alert('Save Edit');
}

function saveUser() {
	var name = $("#name").val();
	var email = $("#email").val();

	NewUser(name,email).then(function () {
		GetDealerId();
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
			// console.log(results);
			var newRole = new Object;
			newRole.role = "DealerAdmin"
			newRole.targetId = gDealer.id;
			newRole.userId = results.id;
			results.name = name;
			results.email = email;
			results.password = "1234";
			results.roles.push(newRole)
			SaveNewUser(tokenId,results)
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}

async function SaveNewUser(tokenId,user) {
	var obj = new Object();
	obj.tokenId = tokenId
	obj.user = user;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			// alert(JSON.stringify(results));
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}



function deleteUser(index) {
	
	for(var i = 0; i != gDealer.users[index].roles.length; i++){
		if(gDealer.users[index].roles[i].role == "Dealer" || gDealer.users[index].roles[i].role == "DealerAdmin" )
		console.log(gDealer.users[index].roles[i].userId);
		var id = gDealer.users[index].roles[i].userId;
		console.log(gUser)
	}

	GetUser(id).then(function () {});
}

async function GetUser(id) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.name = id;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/user/list",
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

async function UpdateUser(user) {
	var obj = new Object();
	obj = user
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
