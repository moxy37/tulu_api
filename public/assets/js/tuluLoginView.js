function PageLoadFunction() {
	// LoadLogin();
	LoadNavigation();
	LoadSideMenu();
	var email = window.localStorage.getItem("email");
	if (email !== undefined && email !== null) {
		$("#email").val(email);
	}
	var password = window.localStorage.getItem("password");
	if (password !== undefined && password !== null) {
		$("#password").val(password);
	}
}

async function DoLogin() {
	var obj = new Object();
	obj.email = $("#email").val();
	obj.username = $("#email").val();
	obj.password = $("#password").val();
	const result = await $.ajax({
		type: "PUT",
		url: "/api/user/login",
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

function Login() {
	DoLogin().then(function (results) {
		gUser = results;
		tokenId = gUser.tokenId;
		var nextPage = 'home';
		if (gUser.userRoles.indexOf('Tulu') !== -1) {
			nextPage = 'profile';
		}
		for (var i = 0; i < gUser.roles.length; i++) {
			if (gUser.roles[i].role === 'Dealer' || gUser.roles[i].role === 'DealerAdmin') {
				dealerId = gUser.roles[i].targetId;
				nextPage = 'vendor';
			}
		}
		window.localStorage.setItem("email", $("#email").val());
		window.localStorage.setItem("password", $("#password").val());
		LocationChange(nextPage);
	});
}