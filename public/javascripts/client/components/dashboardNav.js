function LoadNavigation() {
	var html = `<a onclick=""><img src="/assets/images/PNG Files/tulu-logo_white.png" alt=""></a><div class="menuButton" onclick="slideMenu()"><i class="fas fa-bars fa-2x menuBtn"></i><i class="fas fa-times fa-2x closeMenuBtn"></i></div>`;
	
  
	$("#Nav").empty();
	$("#Nav").append(html);
}

function LoadSideMenu() {
	var html = ``;
	html+='<ul class="menu">';
	html+='	<li class="menuItems">';
	html+='		<p onclick="LocationChange(`dashboard`);">Dashboard</p>';
	html+='	</li>';
	html+='	<li class="menuItems">';
	html+='		<p>Notifications</p>';
	html+='	</li>';
	html+='	<li class="menuItems">';
	html+='		<p>Schedule</p>';
	html+='	</li>';
	html+='	<li class="menuItems">';
	html+='		<p>Vehicles</p>'
	html+='	</li>';
	html+='	<li class="menuItems">';
	html+='		<p onclick="LocationChange(`dashboard/user`);">Users</p>';
	html+='	</li>';
	html+='</ul>';
	$("#SideMenu").empty();
	$("#SideMenu").append(html);
}
