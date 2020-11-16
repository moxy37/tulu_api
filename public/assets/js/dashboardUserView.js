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
			// alert(JSON.stringify(dealer.users));
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
	alert('Save User');
}

function deleteUser() {
	alert('Delete User');
}