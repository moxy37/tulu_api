var gDealer = null;
var gDealerUsers = [];


var gIndex = null;
var gVehicles = null;
var dId = null;

var currVin = null;
var currVehicle = null;

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
			html += '	<div class="vehicleInfo">';
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


function MakeNewVehicle() {
    var vin = $("#vinNum").val();
    NewVehicle(vin, dId).then(function (vehicle) {
		vehicle = vehicle;
		SaveVehicle(vehicle, dId).then(function (vehicle) {
			hideAddNewVehicle();
			PageLoadFunction();
		});
    });
}

async function NewVehicle(vin, dId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vin = vin;
	obj.dealerId = dId;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/new",
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

async function SaveVehicle(vehicle, dealerId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vehicle = vehicle;
	obj.dealerId = dealerId;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/save",
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

function showAddNewVehicle() {
	document.querySelector(".addNewVehicle").style = "display:flex;";
}

function hideAddNewVehicle() {
	document.querySelector(".addNewVehicle").style = "display:none;";
}


function showEditVehicle(index) {
	document.querySelector(".editVehicle").style = "display:flex;";

	gIndex = index;
	currVin = gVehicles[index].vin;
	currVehicle = gVehicles[index];
	console.log(currVin);
	var html = ""
	
	for(var x = 0;x!=currVehicle.links.length;x++){
		html += '<img  class="thumbNail" src="' + currVehicle.links[x].url + '" />';
	}

    $("#imageContainer").empty();
    $("#imageContainer").append(html);

	$("#price").val(gVehicles[index].msrp);
	$("#year").val(gVehicles[index].year);
	$("#make").val(gVehicles[index].make);
	$("#model").val(gVehicles[index].model);
	$("#trim").val(gVehicles[index].trim);
	$("#mileage").val(gVehicles[index].mileage);
	$("#bodyType").val(gVehicles[index].bodyType);
	$("#driveTrain").val(gVehicles[index].driveType);
	$("#transmission").val(gVehicles[index].transmissionName);
	$("#gasType").val(gVehicles[index].fuelType);
	$("#engine").val(gVehicles[index].engineName);
	$("#color").val(gVehicles[index].colorName);
	$("#notes").val(gVehicles[index].notes);

}

function showImageUpload() {
	document.querySelector(".additionalInfoContainer").style = "display:flex;";
}

function hideImageUpload() {
	document.querySelector(".additionalInfoContainer").style = "display:none;";
}

function hideEditVehicle() {
	document.querySelector(".editVehicle").style = "display:none;";
}


function saveEdit() {
	var i = gIndex;
	console.log(gVehicles)
	gVehicles[gIndex].msrp = $("#price").val();
	gVehicles[gIndex].year = $("#year").val();
	gVehicles[gIndex].make = $("#make").val();
	gVehicles[gIndex].model = $("#model").val();
	gVehicles[gIndex].mileage = $("#mileage").val();
	gVehicles[gIndex].bodyType = $("#bodyType").val();
	gVehicles[gIndex].driveType = $("#driveTrain").val();
	gVehicles[gIndex].transmissionName = $("#transmission").val();
	gVehicles[gIndex].fuelType = $("#gasType").val();
	gVehicles[gIndex].msrp = $("#price").val();
	gVehicles[gIndex].engineName = $("#engine").val();
	gVehicles[gIndex].color = $("#color").val();
	gVehicles[gIndex].notes = $("#notes").val();

	var vehicle = gVehicles[gIndex];
	SaveVehicle(vehicle, dId).then(function (vehicle) {
		hideEditVehicle()
		PageLoadFunction();
	});
	alert('Save Edit');
}

function deleteVehicle(index, dId) {

	alert('Delete Vehicle');
	gIndex = index;
	var n = new Array;
	var vehicle = null;
	for (var i = 0; i != gVehicles.length; i++) {
		if (gVehicles[i].vin == gVehicles[gIndex].vin) {
			n = gVehicles[gIndex].vin;
			vehicle = gVehicles[i];
		}
	}

	if (vehicle !== null) {
		TestDeleteVehicle(vehicle).then(function () {
			PageLoadFunction();
		});
	} else {
		alert("Nothing selected");
	}
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

const addCarDocumentsImage = () =>{
	const fileBtn = document.querySelector(`#carDocuments-photos-input`);
	fileBtn.click();
}

function SubmitCarDocumentsImage() {
    var files = $('#carDocuments-photos-input').get(0).files;
    var formData = new FormData();
    if (files.length === 0) { return false; }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var temp = String(file.name).split('.');
        myExt = temp.slice(-1)[0];
        uid = CreateUUID();
        formData.append('photos[]', file, file.name);
    }
    console.log(files)
    UploadCarDocumentsFiles(formData);
};


function UploadCarDocumentsFiles(formData) {
    $.ajax({
        headers: {
            'vin': currVehicle.vin,
            'dealerid': currVehicle.dealerId,
            'tokenid': tokenId,
            'uuid': uid,
            'myext': myExt
        },
        url: '/api/file/upload',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
            return xhr;
        }
    }).done(function (o) {  
		console.log(currVehicle);
        o.sequence = currVehicle.links.length;
        o.type = "carDocuments";
        currVehicle.links.push(o);
        console.log(currVehicle.links);
        var html = '';
        for (var i = 0; i < currVehicle.links.length; i++) {
            if(currVehicle.links[i].type=="carDocuments"){
                html += '<img  class="thumbNail" src="' + currVehicle.links[i].url + '" />';
            }
        }
        $("#imageContainer").empty();
        $("#imageContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}