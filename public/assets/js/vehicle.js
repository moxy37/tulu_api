async function GetVehicle() {
	var obj = new Object();
	obj.tokenId = "42422282-eb13-4c56-b0ae-f15b4f4b6ccb";
	obj.vin = "1FMFK20507LA67262";
	obj.dealerId = "dfb56be7-15ef-11eb-83a2-e86a647a411d";
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
