function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	// GetUser();
	PopulateUser();
}

function AddNewAddress() {
	AddAddress(tokenId, gUser.id).then(function (address) {
		address.sequence = gUser.addresses.length;
		gUser.addresses.push(address);
		PopulateUser();
	});
}

function AddNewPhone() {
	AddPhone(tokenId, gUser.id).then(function (phone) {
		phone.sequence = gUser.phones.length;
		gUser.phones.push(phone);
		PopulateUser();
	});
}

function RemoveAddress(index) {
	gUser.addresses.slice(index, 1);
	PopulateUser();
}

function RemovePhone(index) {
	gUser.phones.slice(index, 1);
	PopulateUser();
}

function PopulateUser() {
	// DisplayUser(tokenId).then(function (user) {
	var user = gUser;
	console.log(user);
	$("#email").val(user.email);
	$("#name").val(user.name);
	// $("#postalCode").val(user.postalCode);
	$("#phone").val(user.phone);
	// $("#postalCode").val(user.postalCode);
	$("#ig").val(user.instagram);
	$("#fb").val(user.facebook);
	$("#linkedIn").val(user.linkedIn);
	$("#bio").val(user.bio);

	for (var i = 0; i < user.addresses.length; i++) {
		//TODO: Add code to display addresses
	}
	for (var i = 0; i < user.phones.length; i++) {
		//TODO: Add code to display this too
	}
	// });
}

function SaveChanges() {
	gUser.bio = $("#bio").val();
	gUser.linkedIn = $("#linkedIn").val();
	gUser.facebook = $("#fb").val();
	SaveUser(gUser).then(function (user) {
		console.log(user);
	});
}
