function PageLoadFunction() {
	// selector();
	LoadNavigation();
	LoadSideMenu();
	LoadMyAccountMenu();
	LoadProfile();
	PopulateUser();
	GetUser();
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
		console.log(user)
		$(".userName").text(user.user.name);
		$(".userBio").text(user.user.bio);

		if(user.image != ""){
			document.querySelector("#userImage").style = "background:url(/uploads/"+user.user.image+");background-size:cover; background-position:center;"
			document.querySelector("#userImage i").style = "display:none;"
		}

		var SocialMediaLinks ="";
		SocialMediaLinks+='        <li>';
		SocialMediaLinks+='            <a href="'+user.user.facebook+'" target="_blank">';
		SocialMediaLinks+='                <i class="fab fa-facebook fa-2x"></i>';
		SocialMediaLinks+='            </a>';
		SocialMediaLinks+='        </li>';
		SocialMediaLinks+='        <li>';
		SocialMediaLinks+='            <a href="'+user.user.instagram+'" target="_blank">';
		SocialMediaLinks+='                <i class="fab fa-instagram fa-2x"></i>';
		SocialMediaLinks+='            </a>';
		SocialMediaLinks+='        </li>';
		SocialMediaLinks+='        <li>';
		SocialMediaLinks+='            <a href="'+user.user.linkedIn+'" target="_blank">';
		SocialMediaLinks+='                <i class="fab fa-linkedin-in fa-2x"></i>';
		SocialMediaLinks+='            </a>';
		SocialMediaLinks+='        </li>';

		$(".socialMediaAccounts").empty();
		$(".socialMediaAccounts").append(SocialMediaLinks);
	});
}