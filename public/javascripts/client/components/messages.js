var gMessage = null;

function PageLoadFunction() {
	// TestAjax();
	LoadNavigation();
	LoadSideMenu();
	$("#SendButton").hide();
	ListUsers().then(function (list) {
		// alert(JSON.stringify(list));
		var html = '<option value=""></option>';
		for (var i = 0; i < list.length; i++) {
			html += `<option value="` + list[i].id + `">` + list[i].name + `</option>`;
		}
		// alert(html);
		$("#TargetSelect").empty();
		$("#TargetSelect").append(html);
		ListMessages().then(function (msgs) {
			var html2 = '';
			for (var i = 0; i < msgs.length; i++) {
				html2 += `<p>From: ` + msgs[i].targetName + `, To: ` + msgs[i].senderName + `, Date: ` + msgs[i].timestamp + `, Message: ` + msgs[i].message;
				if (msgs[i].isRead === 0 || msgs[i].isRead === '0') {
					html2 += `<input type="button" value="Mark Read" onclick="ReadMessage('` + msgs[i].id + `');" />`;
				}
				html2 += `</p>`;
				// html2 += JSON.stringify(msgs[i]);
			}
			$("#ListMessageDiv").append(html2);
		});
	});
}

function ReadMessage(id) {
	SetReadMessage(id).then(function (msg) {
		location.reload(true);
	});
}


function SendMessage() {
	SaveMessage().then(function (msg) {
		location.reload(true);
	});
}

async function SetReadMessage(id) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.id = id;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/message/read",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

async function SaveMessage() {
	gMessage.message = $("#MessageValue").val();
	gMessage.type = $("#MessageType").val();
	gMessage.tokenId = tokenId;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/message/save",
		data: gMessage,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

async function ListMessages() {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.senderId = gUser.id;
	obj.targetId = $("#TargetSelect option:selected").val();
	const results = await $.ajax({
		type: "PUT",
		url: "/api/message/list",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

function NewMessage() {
	MakeNewMessage().then(function (msg) {
		alert(JSON.stringify(msg));
		gMessage = msg;
		$("#MessageType").val(msg.type);
		$("#SendButton").show();
		$("#NewMessageButton").hide();
	});
}

async function MakeNewMessage() {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.vin = '';
	obj.dealerId = '';
	obj.userId = gUser.id;
	obj.targetId = $("#TargetSelect option:selected").val();
	const results = await $.ajax({
		type: "PUT",
		url: "/api/message/new",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

async function ListUsers() {
	var obj = new Object();
	obj.tokenId = tokenId;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/user/list",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) { },
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}