function PageLoadFunction() {
	LoadLogin();
	LoadNavigation();
	LoadSideMenu();
}

function Login() {
	var obj = new Object();
	obj.email = "admin";
	obj.password = "admin";
	$.ajax({
		type: "PUT",
		url: "/api/user/login",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			gUser = results;
			tokenId = gUser.tokenId;
			sessionStorage.setItem('gUser', JSON.stringify(gUser));
			for (var i = 0; i < results.roles.length; i++) {
				if (results.roles[i].role === 'Dealer' || results.roles[i].role === 'DealerAdmin') {
					dealerId = results.roles[i].targetId;
				}
			}
			sessionStorage.setItem('dealerId', dealerId);
			LocationChange('home');
		},
		error: function (results) {
			LocationChange('');
		},
	});
}

function goToRegister() {
	LocationChange('register');
}