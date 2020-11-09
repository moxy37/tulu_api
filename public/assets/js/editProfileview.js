function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	// GetUser();
	PopulateUser();
}

function AddNewAddress() {
	var street = $("#street").val();
	var city = $("#city").val();
	var province = $("#province").val();
	var postal = $("#postalCode").val();
	AddAddress(tokenId, gUser.id,street,city,province,postal).then(function (address) {
		address.sequence = gUser.addresses.length;
		gUser.addresses.push(address);
		PopulateUser();
	});
}

function AddNewPhone() {
	var phoneNumber = $("#phone").val()
	AddPhone(tokenId, gUser.id,phoneNumber).then(function (phone) {
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
	var user = gUser;
	console.log(user);
	$("#email").val(user.email);
	$("#name").val(user.name);
	$("#ig").val(user.instagram);
	$("#fb").val(user.facebook);
	$("#linkedIn").val(user.linkedIn);
	$("#bio").val(user.bio);

	if(user.addresses.length ==0){
		document.querySelector("#addressContainer").style = "display:none !important;";
	}
	else{
		document.querySelector("#addressContainer").style = "display:flex !important;";
		var address="";
		for (var i = 0; i < user.addresses.length; i++) {
			address=address+'<div>';
			address=address+'<p class="address">'+user.addresses[i].street+','+user.addresses[i].city+','+user.addresses[i].province+','+user.addresses[i].postal+'</p>';
			address=address+'<i class="fas fa-times"></i>';
			address=address+'</div>';
		}

		$("#addressContainer").empty();
		$("#addressContainer").append(address);
	}


	if(user.phones.length ==0){
		document.querySelector("#phoneContainer").style = "display:none !important;";
	}
	else{
		document.querySelector("#phoneContainer").style = "display:flex !important;";
		var phone=""
		for (var i = 0; i < user.phones.length; i++) {
			phone=phone+'<div>';
			phone=phone+'<p class="phoneNumber">'+user.phones[i].value+'</p>';
			phone=phone+'<i class="fas fa-times"></i>';
			phone=phone+'</div>';
		}
		$("#phoneContainer").empty();
		$("#phoneContainer").append(phone);
	}
}

function SaveChanges() {
	gUser.email = $("#email").val();
	gUser.name = $("#name").val();
	gUser.bio = $("#bio").val();
	gUser.instagram = $("#ig").val();
	gUser.linkedIn = $("#linkedIn").val();
	gUser.facebook = $("#fb").val();

	if($("#password").val()!=""){
		if($("#password").val()==$("#confirmPassword").val()){
			gUser.password=$("#password").val();
		}else{
			alert("Password Doesnt Match!");
		}
	}
	SaveUser(gUser).then(function (user) {
		console.log(user);
	});

}
