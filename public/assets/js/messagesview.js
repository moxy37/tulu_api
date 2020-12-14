var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var gMessage = null;
var day = null;
var month = null;
var year = null;
var time = null;


function PageLoadFunction() {
	// TestAjax();
	LoadNavigation();
	LoadSideMenu();
	$(".newMessage").hide();
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
			console.log(msgs);


			

			for (var i = 0; i < msgs.length; i++) {
				if(msgs[i].isRead == 1){
					html2 += `<div id="messageDiv" class="read">`;
				}else{
					html2 += `<div id="messageDiv" class="unread">`;
				}	
				html2 += `<p class="from"><b>From:&nbsp</b>`+ msgs[i].senderName + `</p>`;
				

				
				time = msgs[i].timestamp.slice(11,16);
				year = msgs[i].timestamp.slice(0,4);
				console.log(year)
				
				if(msgs[i].timestamp.slice(5,6) == "0"){
					month = msgs[i].timestamp.slice(6,7);
				}else{
					month = msgs[i].timestamp.slice(5,7);
				}
				console.log(month);

				if(msgs[i].timestamp.slice(8,9) == "0"){
					day = msgs[i].timestamp.slice(9,10);
				}else{
					day = msgs[i].timestamp.slice(8,10);
				}

				html2 += `<p class="time">`+ months[month-1] +` `+ day +`, `+ year +` `+ time +`</p>`;
				html2 += `<p class="message"><b>Message:&nbsp</b>`+ msgs[i].message + `</p>`;
				
				if (msgs[i].isRead === 0 || msgs[i].isRead === '0') {
					html2 += `<input type="button" value="Mark Read" id="readBtn" onclick="ReadMessage('` + msgs[i].id + `');" />`;
				}
				
				html2 += `</div>`;
				// html2 += JSON.stringify(msgs[i]);
			}
			$("#ListMessageDiv").append(html2);
		});
	});
}

function cancelMessage(){
	$(".newMessage").hide();
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
		$(".newMessage").show();
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