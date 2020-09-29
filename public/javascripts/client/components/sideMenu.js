function LoadSideMenu() {
	var html = '<ul class="menu"><li class="menuItems"><a href="/">About Us</a></li><li class="menuItems"><p class="menuDropDownTitle" onclick="shopSubMenu()">Shop<i class="fas fa-sort-down shopDropMenuBtn"></i></p><ul class="shopSubMenuList"><li class="subMenuListLink"><a href="/shop">All</a></li><li class="subMenuListLink"><a href="/">New</a></li><li class="subMenuListLink"><a href="/">Used</a></li></ul></li><li class="menuItems"><p class="menuDropDownTitle" onclick="accountSubMenu()">My Account<i class="fas fa-sort-down accountDropMenuBtn"></i></p><ul class="accountSubMenuList"><li class="subMenuListLink"><a href="/login">Sign In</a></li><li class="subMenuListLink"><a href="/register">Register</a></li></ul></li><li class="menuItems"><a href="/">Influencers</a></li><li class="menuItems"><a href="/">Dealerships</a></li><li class="menuItems"><a href="/"><button class="influencerBtn">Become an Influencer</button></a></li></ul>';
  
	$("#SideMenu").empty();
	$("#SideMenu").append(html);
  }

  LoadSideMenu()