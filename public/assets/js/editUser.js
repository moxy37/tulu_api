
async function SaveUser(user) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.user = user;
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

async function AddAddress(tokenId, targetId,street,city,province,postal) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.primary = new Object();
	obj.primary.targetId = targetId;
	obj.primary.street = street;
	obj.primary.city = city;
	obj.primary.province = province;
	obj.primary.postal = postal;
	obj.table = 'Address';
	
	const result = await $.ajax({
		type: "PUT",
		url: "/api/helper/new",
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

async function AddPhone(tokenId, targetId,phone) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.primary = new Object();
	obj.primary.targetId = targetId;
	obj.primary.value = phone;
	obj.table = 'Phone';
	const result = await $.ajax({
		type: "PUT",
		url: "/api/helper/new",
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