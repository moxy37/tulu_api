var gObj = null;

function PageLoadFunction() {
	// selector();
	LoadNavigation();
	LoadSideMenu();
	LoadRegistration();
	LoadStepCircles();
	MakeNewUser().then(function (user) {
		gObj = user;
		PopulateUserData(user);
	});
}

async function MakeNewUser() {
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/new",
		// data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			// alert(JSON.stringify(results));
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}


function UpdateUser() {
	gObj.name = $("#name").val();
	gObj.email = $("#email").val();
	gObj.password = $("#password").val();
	gObj.type = $("#userType").val();
	gObj.type = $("#userType").val();
	gObj.addresses[0].streeet = $("#userType").val();

	for (var i = 0; i < gObj.phones.length; i++) {
		gObj.phones[i].type = $("#phone_type_0 option:selected").val();
		gObj.phones[i].value = $("#phone_value_0").val();
	}
}

function SaveUser() {

	RegisterUser(gUser).then(function (u) {
		LocationChange('login');
	});
}

async function AddNewObject(table, key) {
	var obj = new Object();
	obj.primary = new Object();
	obj.primary.targetId = gObj.id;
	obj.table = table;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/helper/new",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			// alert(JSON.stringify(results));
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}

function AddNewObj(table, key) {
	AddNewObject(table, key).then(function (obj) {
		obj.sequence = gObj[key].length;
		gObj[key].push(obj);
		PopulateUserData(gObj);
	});
}

function RemovePhone(index) {
	gObj.phones.splice(index, 1);
	PopulateUserData(gObj);
}

function PopulateUserData(user) {
	console.log(JSON.stringify(user));
	$("#name").val(user.name);
	$("#email").val(user.email);
	$("#password").val(user.password);
	$("#userType").val(user.type);
	$("#postalcode").val(user.addresses[0].streeet);

	var html = '<div id="PhonesDiv" class="">';
	for (var i = 0; i < user.phones.length; i++) {
		html += `<div id="phone_0" class="">`;
		html += `<div class="">Number: <input type="text" id="phone_value_` + i + `" class="" /></div>`;
		html += `<div class="">Type: <select id="phone_type_` + i + `">`;
		html += `<option value="Home"`;
		if (user.phones[i].type === 'Home') { html += ` selected="selected"`; }
		html += `>Home</option>`;
		html += `<option value="Mobile"`;
		if (user.phones[i].type === 'Mobile') { html += ` selected="selected"`; }
		html += `>Home</option>`;
		html += `<option value="Other"`;
		if (user.phones[i].type === 'Other') { html += ` selected="selected"`; }
		html += `>Home</option>`;
		html += `</select></div>`;
		html += `<input type="button" class="" onclick="RemovePhone(` + i + `);" /></div>`;
	}
	html += `<input type="button" class="" onclick="AddNewObj('Phone', 'phones');" /></div>`;
	$("#multiplePhone").empty();
	$("#multiplePhone").append(html);
}

async function RegisterUser(user) {
	var obj = new Object();
	obj.user = user;
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/register",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			// alert(JSON.stringify(results));
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}
