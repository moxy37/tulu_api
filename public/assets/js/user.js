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
			// console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}