function LoadNavigation() {
	var html = '<a href="/home"><img src="/assets/images/PNG Files/tulu-logo_white.png" alt=""></a><div class="menuButton" onclick="slideMenu()"><i class="fas fa-bars fa-2x menuBtn"></i><i class="fas fa-times fa-2x closeMenuBtn"></i></div>';
	
  
	$("#Nav").empty();
	$("#Nav").append(html);
  }

  LoadNavigation()