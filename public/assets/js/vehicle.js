async function GetVehicle(vin, dealerId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vin = vin;
	obj.dealerId = dealerId;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/get",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
}

async function SaveVehicle(vehicle) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vehicle = vehicle;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
}

async function DeleteVehicle(vin) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vin = vin;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/delete",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
}
// GetVehicle(vin).then(function (vehicle) {
// 	alert(vehicle.vin);

// });
