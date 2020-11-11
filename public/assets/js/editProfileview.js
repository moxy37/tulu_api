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
		PageLoadFunction();
	});
	formsReset();
}

function AddNewPhone() {
	var phoneNumber = $("#phone").val()
	AddPhone(tokenId, gUser.id,phoneNumber).then(function (phone) {
		phone.sequence = gUser.phones.length;
		gUser.phones.push(phone);
		PageLoadFunction();
	});
	formsReset();
}

function RemoveAddress(index) {
	var address = new Object;
	for(i = 0; i != gUser.addresses.length; i++){
		if(i!=index){
			address[i] = gUser.addresses[i];
		}
	}
	AddressRemove(gUser,address).then(function (user) {});
	formsReset();
	PageLoadFunction();
	AccountReload();
	
}

function RemovePhone(index) {
	gUser.phones.slice(index,1);
	PageLoadFunction();


	var phone = new Object;
	for(i = 0; i != gUser.phones.length; i++){
		if(i!=index){
			phone[i] = gUser.phones[i];
		}
	}
	PhoneRemove(gUser,phone).then(function (user) {});
	formsReset();
	PageLoadFunction();
	AccountReload();
}


$('#upload-photos').on('submit', function (event) {
	event.preventDefault();
	var files = $('#photos-input').get(0).files;
	var formData = new FormData();
	if (files.length === 0) { return false; }
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var temp = String(file.name).split('.');
		myExt = temp.slice(-1)[0];
		uid = CreateUUID();
		formData.append('photos[]', file, file.name);
	}
	UploadFiles(formData,files);
});

function UploadFiles(formData,files) {
    $.ajax({
        headers: {
            'tokenid': tokenId,
            'uuid': uid,
            'myext': myExt
        },
        url: '/api/file/upload',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
            return xhr;
        }
    }).done(function (o) {

		console.log(files)
		var extention = "";
		console.log(files[0].name.length)
		for(i=0;i!= files[0].name.length; i++){
			console.log(files[0].name.charAt(i))
			if(files[0].name.charAt(i) == '.'){
				for(x = i; x!=files[0].name.length; x++){
					extention += files[0].name.charAt(x);
				}
			}
		}
		uid += extention;
		// console.log(gUser)
		changeImage(gUser,uid).then(function (user) {
			document.querySelector("#userImage").style = "background:url(/uploads/"+uid+");background-size:cover; background-position:center;";
			document.querySelector("#userIcon").style = "display:none;";
			PageLoadFunction();
			AccountReload();
		});
    }).fail(function (xhr, status) {
        alert(status);
    });
}

function formsReset(){
	$("#email").val(gUser.email);
	$("#name").val(gUser.name);
	$("#ig").val(gUser.instagram);
	$("#fb").val(gUser.facebook);
	$("#linkedIn").val(gUser.linkedIn);
	$("#bio").val(gUser.bio);

	$("#street").val("");
	$("#city").val("");
	$("#province").val("");
	$("#postalCode").val("");
	$("#phone").val("");
};

function PopulateUser() {
	var user = gUser;
	console.log(user);
	$("#email").val(user.email);
	$("#name").val(user.name);
	$("#ig").val(user.instagram);
	$("#fb").val(user.facebook);
	$("#linkedIn").val(user.linkedIn);
	$("#bio").val(user.bio);

	
	if(user.image != ""){
		document.querySelector("#userImage").style = "background:url(/uploads/"+user.image+");background-size:cover; background-position:center;"
		document.querySelector("#userImage i").style = "display:none;"
	}

	if(user.addresses.length ==0){
		document.querySelector("#addressContainer").style = "display:none !important;";
	}
	else{
		document.querySelector("#addressContainer").style = "display:flex !important;";
		var address="";
		for (var i = 0; i < user.addresses.length; i++) {
			address=address+'<div>';
			address=address+'<p class="address">'+user.addresses[i].street+','+user.addresses[i].city+','+user.addresses[i].province+','+user.addresses[i].postal+'</p>';
			address=address+'<i class="fas fa-times" onclick="RemoveAddress('+i+')"></i>';
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
			phone=phone+'<i class="fas fa-times" onclick="RemovePhone('+i+')"></i>';
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
		// console.log(user);
	});
	formsReset();
	PageLoadFunction()
}


function AccountReload() {
	var obj = new Object();
	obj.username = gUser.name;
	obj.password = gUser.password;
	obj.email = gUser.email;
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
			LocationChange('editProfile');
		},
		error: function (results) {
			alert("Error");
		},
	});
}

function cancelChanges(){
	var obj = new Object();
	obj.username = gUser.name;
	obj.password = gUser.password;
	obj.email = gUser.email;
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
			LocationChange('profile');
		},
		error: function (results) {
			alert("Error");
		},
	});
}