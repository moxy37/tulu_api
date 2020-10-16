function PageLoadFunction() {
	
}

function Login() {
	var obj = new Object();
	obj.username = "admin";
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
			LocationChange('home');
		},
		error: function (results) {
			LocationChange('');
		},
	});
}