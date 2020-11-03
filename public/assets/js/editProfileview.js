function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	GetUser();
	PopulateUser();
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
			// console.log(JSON.stringify(results));
		},
		error: function (results) {
			alert("Error");
		},
	});
}

function PopulateUser() {
	DisplayUser(tokenId).then(function (user) {
		console.log(user);
		$("#email").val(user.user.email);
		$("#name").val(user.user.name);
		$("#postalCode").val(user.user.postalCode);
		$("#phone").val(user.user.phones);
		$("#postalCode").val(user.user.postalCode);
		$("#ig").val(user.user.instagram);
		$("#fb").val(user.user.facebook);
		$("#linkedIn").val(user.user.linkedIn);
		$("#bio").val(user.user.bio);
	});
}