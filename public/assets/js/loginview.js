function PageLoadFunction() {
	
}

function Login() {
	var obj = new Object();
	obj.email = $("#email").val();
	obj.password = $("#password").val();
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