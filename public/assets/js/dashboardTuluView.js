var gDealer = null;
var gDealerUsers = [];

function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	GetUser();
	// GetDealerId();
	GetVehicle();
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



function GetUser() {
	DisplayUser(tokenId).then(function () {});
}

async function DisplayUser(tokenId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/user/current",
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

function GetVehicle() {
	DisplayVehicle(gDealer).then(function () {});
}

async function DisplayVehicle(dealerId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.dealerId = dealerId;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/list",
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
