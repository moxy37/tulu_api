var gDealer = null;
var gDealerUsers = [];

var gIndex = null;
var gVehicles = null;
var dId = null;

var currVin = null;

function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	getVehicles();
}

function getVehicles() {

	console.log(gUser.roles)
	for (var i = 0; i != gUser.roles.length; i++) {
		if (gUser.roles[i].role == "Dealer" || gUser.roles[i].role == "DealerAdmin") {
			console.log(gUser.roles[i].targetId);
			dId = gUser.roles[i].targetId;
		}
	}

	DisplayVehicle(dId).then(function (vehicleList) {
		gVehicles = vehicleList;
		var html = '';
		$("#vehicleContainer").empty();
		for (var i = 0; i != vehicleList.length; i++) {
			html += '<li>';
			html += '	<div class="image">';
			html += '	<img src=' + vehicleList[i].image + '>';
			html += '	</div>';
			html += '	<div class="userInfo">';
			html += '		<p>' + vehicleList[i].year + " " + vehicleList[i].make + " " + vehicleList[i].model + '</p>';
			html += '		<p>' + vehicleList[i].msrp + '</p>';
			html += '		<p>0 views</p>';
			html += '	</div>';
			html += '	<div class="control">';
			html += '		<i class="far fa-edit" onclick="showEditVehicle(' + i + ')"></i>';
			html += '		<i class="far fa-trash-alt" onclick="deleteVehicle(' + i + ')"></i>';
			html += '	</div>';
			html += '</li>';
		}
		$("#vehicleContainer").append(html);
	});
}

async function DisplayVehicle(dId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vehicle = gVehicles;
	obj.dealerId = dId;
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

function showAddNewVehicle() {
	document.querySelector(".addNewVehicle").style = "display:flex;";
}

function hideAddNewVehicle() {
	document.querySelector(".addNewVehicle").style = "display:none;";
}

function showEditVehicle(index) {
	document.querySelector(".editVehicle").style = "display:flex;";

	gIndex = index;
	$("#price").val(gVehicles[index].msrp);
	// $("#mileage").val(gVehicles[index].msrp);
	$("#engine").val(gVehicles[index].engineName);
	$("#color").val(gVehicles[index].colorName);
	document.querySelector(".editVehicle").style = "display:flex;";
}

function hideEditVehicle() {
	document.querySelector(".editVehicle").style = "display:none;";
}

function saveEdit() {
	var i = gIndex;
	console.log(gVehicles)
	gVehicles[gIndex].msrp = $("#price").val();
	gVehicles[gIndex].engineName = $("#engine").val();
	gVehicles[gIndex].colorName = $("#color").val();
	alert('Save Edit');
}

function saveVehicle() {
	alert('Save Vehicle');
}


function deleteVehicle(index, dId) {

	alert('Delete Vehicle');
	gIndex = index;
	var n = new Array;
	var vehicle = null;
	for (var i = 0; i != gVehicles.length; i++) {
		// console.log(gVehicles[i].vin);
		// console.log(gVehicles[gIndex].vin);
		// console.log(gVehicles[gIndex]);
		if (gVehicles[i].vin == gVehicles[gIndex].vin) {
			n = gVehicles[gIndex].vin;
			vehicle = gVehicles[i];
		}
	}

	// console.log(n)

	// gVehicles = n;
	if (vehicle !== null) {
		TestDeleteVehicle(vehicle).then(function () {

		});
	} else {
		alert("Nothing selected");
	}
	// 	gVehicles = vehicles;
	// 	console.log(n);
	// 	// DisplayVehicle(dId).then(function (vehicleList) {});
	// RemoveVehicle(gVehicles,n,dId).then(function (vehicles) {
	// 	gVehicles = vehicles;
	// 	console.log(n);
	// 	// DisplayVehicle(dId).then(function (vehicleList) {});
	// });

	// check(n,dId).then(function (vehicles) {

	// });
}

async function TestDeleteVehicle(vehicle) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vehicle = vehicle;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/delete",
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
async function UpdateVehicle(gVehicles) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vehicle = gVehicles;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/delete",
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

// async function check(n,dId) {
// 	var obj = new Object();
// 	obj.tokenId = tokenId;
// 	obj.vehicle = n;
// 	obj.dealerId = dId;
// 	const results = await $.ajax({
// 		type: "PUT",
// 		url: "/api/vehicle/list",
// 		data: obj,
// 		cache: false,
// 		dataType: "json",
// 		contentType: "application/x-www-form-urlencoded",
// 		success: function (results) {
// 			console.log(results);
// 		},
// 		error: function (results) { console.log(results.statusText); },
// 	});
// 	return results;
// }


// async function RemoveVehicle(n,dId) {
// 	var obj = new Object();
// 	obj.tokenId = tokenId;
// 	obj.vehicle = n;
// 	obj.dealerId = dId;
// 	const result = await $.ajax({
// 		type: "PUT",
// 		url: "/api/vehicle/save",
// 		data: obj,
// 		cache: false,
// 		dataType: "json",
// 		contentType: "application/x-www-form-urlencoded",
// 		success: function (results) {
// 			console.log(results);
// 		},
// 		error: function (results) { console.log(results.statusText); },
// 	});
// 	return result;

// }






// function deleteVehicle(index,dId){

// 	alert('Delete Vehicle');
// 	gIndex = index;
// 	var v = 0;
// 	for(var i = 0; i != gVehicles.length;i++){
// 		console.log(gVehicles[i].vin);
// 		console.log(gVehicles[gIndex].vin);
// 		console.log(gVehicles[gIndex]);
// 		if(gVehicles[i].vin != gVehicles[gIndex].vin){
// 			gVehicles[gIndex].dealerId="";
// 		}
// 	}	

// 	RemoveVehicle(gVehicles,dId).then(function () {});
// 	// UpdateVehicle(gVehecles,dId).then(function(){});
// }

// async function UpdateVehicle(gVehecles,dId) {
// 	var obj = new Object();
// 	obj.tokenId = tokenId;
// 	obj.dealerId = dId;
// 	const results = await $.ajax({
// 		type: "PUT",
// 		url: "/api/vehicle/list",
// 		data: obj,
// 		cache: false,
// 		dataType: "json",
// 		contentType: "application/x-www-form-urlencoded",
// 		success: function (results) {
// 			console.log(results);
// 		},
// 		error: function (results) { console.log(results.statusText); },
// 	});
// 	return results;
// }

// async function RemoveVehicle(gVehicles,dId) {
// 	var obj = new Object();
// 	obj.tokenId = tokenId;
// 	obj.vehicle = gVehicles;
// 	obj.dealerId = dId;
// 	const result = await $.ajax({
// 		type: "PUT",
// 		url: "/api/vehicle/save",
// 		data: obj,
// 		cache: false,
// 		dataType: "json",
// 		contentType: "application/x-www-form-urlencoded",
// 		success: function (results) {
// 			console.log(results);
// 		},
// 		error: function (results) { console.log(results.statusText); },
// 	});
// 	return result;

// }


// function deleteVehicle(index,dId){

// 	alert('Delete Vehicle');
// 	var newVehicleList = new Object();
// 	var v = 0;
// 	for(var i = 0; i != gVehicles.length;i++){
// 		console.log(gVehicles[i].vin);
// 		console.log(gVehicles[index].vin);
// 		if(gVehicles[i].vin != gVehicles[index].vin){
// 			newVehicleList[v] = gVehicles[i];
// 			v++;
// 		}
// 	}

// 	currVin = gVehicles[index].vin
// 	var vehicle = newVehicleList;
// 	console.log(vehicle);


// 	RemoveVehicle(vehicle,dId).then(function (vehicle) {
// 		gVehicles.push(vehicle);
// 		var html = "";
// 		$("#vehicleContainer").empty();
// 		for(var i = 0; i != vehicle.length; i++){
// 			html+='<li>';
// 			html+='	<div class="image">';
// 			html+='	<img src="'+vehicle[i].image+'">';
// 			html+='	</div>';
// 			html+='	<div class="userInfo">';
// 			html+='		<p>'+vehicle[i].year+" "+vehicle[i].make+" "+vehicle[i].model+'</p>';
// 			html+='		<p>'+vehicle[i].msrp+'</p>';
// 			html+='		<p>0 views</p>';
// 			html+='	</div>';
// 			html+='	<div class="control">';
// 			html+='		<i class="far fa-edit" onclick="showEditVehicle('+i+')"></i>';
// 			html+='		<i class="far fa-trash-alt" onclick="deleteVehicle('+i+')"></i>';
// 			html+='	</div>';
// 			html+='</li>';
// 		}
// 		$("#vehicleContainer").append(html);
// 	});
// 	DisplayVehicle();
// }

// async function RemoveVehicle(vehicle,dId) {
// 	var obj = new Object();
// 	obj.tokenId = tokenId;
// 	obj.vehicle = vehicle;
// 	obj.dealerId = "";
// 	const result = await $.ajax({
// 		type: "PUT",
// 		url: "/api/vehicle/save",
// 		data: obj,
// 		cache: false,
// 		dataType: "json",
// 		contentType: "application/x-www-form-urlencoded",
// 		success: function (results) {
// 			console.log(results);
// 		},
// 		error: function (results) { console.log(results.statusText); },
// 	});
// 	return result;

// }


