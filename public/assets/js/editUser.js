async function DisplayUser(tokenId,id) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.id = id;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/user/current",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			// console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

async function SaveUser(tokenId,id) {
	var obj = new Object();
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