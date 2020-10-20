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

function SaveUser() {
	gObj.name = $("#name").val();
	RegisterUser(gUser).then(function (u) {
		LocationChange('login');
	});
}

function PopulateUserData(user) {
	console.log(JSON.stringify(user));
	$("#name").val(user.name);
	$("#email").val(user.email);
	$("#street").val(user.addresses[0].streeet);
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
