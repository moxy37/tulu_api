var gUser = null;

function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	GetUser();
	console.log(tokenId);
	// getMessages();
}

function GetUser() {
	var obj = new Object();
	obj.tokenId = tokenId;
	$.ajax({
		type: "PUT",
		url: "/api/user/current",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
			gUser = results.user;
		},
		error: function (results) {
			alert("Error");
		},
	});
}



function getMessages() {
	console.log(gUser)
	DisplayMessage(tokenId).then(function () { });
}

function SendMessage() {
	var message = $('#message').val();
	// SendMessage(tokenId, message).then(function () { });
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.id = gUser.id;
	obj.message = message;
	obj.senderId = '0167e373-15f1-11eb-83a2-e86a647a411d';
	obj.targerId = '2de62f1e-1e05-11eb-b7cf-e86a647a411d';
	alert(JSON.stringify(obj));
	$.ajax({
		type: "PUT",
		url: "/api/message/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
}

// async function SendMessage(tokenId, message) {
// 	var obj = new Object();
// 	obj.tokenId = tokenId;
// 	obj.id = gUser.id;
// 	obj.message = message;
// 	obj.senderId = '0167e373-15f1-11eb-83a2-e86a647a411d';
// 	obj.targerId = '2de62f1e-1e05-11eb-b7cf-e86a647a411d';
// 	const results = await $.ajax({
// 		type: "PUT",
// 		url: "/api/message/save",
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

async function DisplayMessage(tokenId) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.id = gUser.id;
	obj.senderId = gUser.id;;
	obj.targerId = '2de62f1e-1e05-11eb-b7cf-e86a647a411d';
	const results = await $.ajax({
		type: "PUT",
		url: "/api/message/list",
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

