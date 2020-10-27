async function GetVehicle(vin, dealerId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vin = vin;
	obj.dealerId = dealerId;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/get",
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
	return result;
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
	return result;
}

async function NewVehicle(vin, dealerId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vin = vin;
	obj.dealerId = dealerId;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/vehicle/new",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			// alert(JSON.stringify(results));
			console.log(results);
			console.log(results.year);
			LoadVehicleInfo(results)
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

// GetVehicle(vin).then(function (vehicle) {
// 	alert(vehicle.vin);

// });
