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
	gObj.type = $("#userType").val();
	gObj.email = $("#email").val();
	gObj.password = $("#password").val();
	// gObj.fname = $("#fname").val();
	gObj.fname = $("#name").val();
	// gObj.lname = $("#lname").val();
	gObj.addresses[0].postalCode = $("#postalCode").val();
	gObj.phoneValue = $("#phone_value_").val();
	gObj.phoneType = $("#phone_type_").val();
	gObj.instagram = $("#ig").val();
	gObj.facebook = $("#fb").val();
	gObj.linkedIn = $("#linkedIn").val();
	gObj.bio = $("#bio").val();


	for (var i = 0; i < gObj.phones.length; i++) {
		gObj.phones[i].type = $("#phone_type_0 option:selected").val();
		gObj.phones[i].value = $("#phone_value_0").val();
	}
}

function SaveUser() {
	UpdateUser();
	RegisterUser(gObj).then(function (u) {
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
	$("#userType").val(user.type);
	$("#email").val(user.email);
	$("#password").val(user.password);
	$("#fname").val(user.name);
	// $("#lname").val(user.name);
	$("#postalcode").val(user.addresses[0].postalCode);
	$("#phone_value_").val(user.phoneValue);
	$("#phone_type_").val(user.phoneType);
	$("#ig").val(user.instagram);
	$("#fb").val(user.facebook);
	$("#linkedIn").val(user.linkedIn);
	$("#bio").val(user.bio);

	var html = '<div id="PhonesDiv" class="">';
	for (var i = 0; i < user.phones.length; i++) {
		html += `<div id="phone_0" class="">`;
		html += `<label for="phone">Number:</label><div class ="inputContainer"><input type="text" id="phone_value_` + i + `" class="" /></div>`;
		html += `<label for="phone">Type: </label><div class ="inputContainer"><select id="phone_type_` + i + `">`;
		html += `<option value="Home"`;
		if (user.phones[i].type === 'Home') { html += ` selected="selected"`; }
		html += `>Home</option>`;
		html += `<option value="Mobile"`;
		if (user.phones[i].type === 'Mobile') { html += ` selected="selected"`; }
		html += `>Mobile</option>`;
		html += `<option value="Other"`;
		if (user.phones[i].type === 'Other') { html += ` selected="selected"`; }
		html += `>Other</option>`;
		html += `</select></div>`;
		html += `<div class=""><button class="contactBtn" onclick="RemovePhone(` + i + `);">REMOVE</button></div>`;
	}
	html += `<button class="contactBtn" onclick="AddNewObj('Phone', 'phones');">ADD</button> </div></div>`;
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
			alert(JSON.stringify(results));
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}
