function LoadNavigation() {
	var html = `<a onclick="goToHome()"><img src="/assets/images/PNG Files/tulu-logo_white.png" alt=""></a><div class="menuButton" onclick="slideMenu()"><i class="fas fa-bars fa-2x menuBtn"></i><i class="fas fa-times fa-2x closeMenuBtn"></i></div>`;
	
  
	$("#Nav").empty();
	$("#Nav").append(html);
}



function LoadSideMenu() {
	var html = '<ul class="menu"><li class="menuItems"><a onclick="goToAbout()">About Us</a></li><li class="menuItems"><p class="menuDropDownTitle" onclick="shopSubMenu()">Shop<i class="fas fa-sort-down shopDropMenuBtn"></i></p><ul class="shopSubMenuList"><li class="subMenuListLink"><a onclick="goToShop()">All</a></li><li class="subMenuListLink"><a onclick="/">New</a></li><li class="subMenuListLink"><a onclick="/">Used</a></li></ul></li><li class="menuItems"><p class="menuDropDownTitle" onclick="accountSubMenu()">My Account<i class="fas fa-sort-down accountDropMenuBtn"></i></p><ul class="accountSubMenuList"><li class="subMenuListLink"><a onclick="goToLogin()">Sign In</a></li><li class="subMenuListLink"><a onclick="goToRegister()">Register</a></li></ul></li><li class="menuItems"><a onclick="goToInfluencer()">Influencers</a></li><li class="menuItems"><a onclick="goToDealership()">Dealerships</a></li><li class="menuItems"><a onclick="/"><button class="influencerBtn">Become an Influencer</button></a></li></ul>';
  
	$("#SideMenu").empty();
	$("#SideMenu").append(html);
}

function goToHome() {
	LocationChange('home');
}

function goToAbout() {
	LocationChange('about');
}

function goToShop() {
	LocationChange('shop');
}

function goToLogin() {
	LocationChange('login');
}

function goToRegister() {
	LocationChange('register');
}

function goToInfluencer() {
	LocationChange('influencerList');
}

function goToDealership() {
	LocationChange('dealershipList');
}