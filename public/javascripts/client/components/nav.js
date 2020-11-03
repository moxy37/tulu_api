function LoadNavigation() {
	var html = `<a onclick="LocationChange('home');"><img src="/assets/images/PNG Files/tulu-logo_white.png" alt=""></a><div class="menuButton" onclick="slideMenu()"><i class="fas fa-bars fa-2x menuBtn"></i><i class="fas fa-times fa-2x closeMenuBtn"></i></div>`;
	
  
	$("#Nav").empty();
	$("#Nav").append(html);
}

function LoadSideMenu() {
	var html = `<ul class="menu"><li class="menuItems"><a onclick="LocationChange('about');">About Us</a></li><li class="menuItems"><p class="menuDropDownTitle" onclick="shopSubMenu()">Shop<i class="fas fa-sort-down shopDropMenuBtn"></i></p><ul class="shopSubMenuList"><li class="subMenuListLink"><a onclick="LocationChange('shop');">All</a></li><li class="subMenuListLink"><a onclick="/">New</a></li><li class="subMenuListLink"><a onclick="/">Used</a></li></ul></li><li class="menuItems"><p class="menuDropDownTitle" onclick="accountSubMenu()">My Account<i class="fas fa-sort-down accountDropMenuBtn"></i></p><ul class="accountSubMenuList"><li class="subMenuListLink"><a onclick="LocationChange('login');">Sign In</a></li><li class="subMenuListLink"><a onclick="LocationChange('register');">Register</a></li></ul></li><li class="menuItems"><a onclick="LocationChange('influencerList');">Influencers</a></li><li class="menuItems"><a onclick="LocationChange('dealershipList');">Dealerships</a></li><li class="menuItems"><a onclick="Logout()">Logout</a></li><li class="menuItems"><a onclick="/"><button class="influencerBtn">Become an Influencer</button></a></li></ul>`;
  
	$("#SideMenu").empty();
	$("#SideMenu").append(html);
}
