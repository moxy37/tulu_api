function LoadNavigation() {
	var html = '<li id="Home" class="active menu-li"><a onclick="LocationChange(\'\');"><i class="fa fa-home"></i><span class="hidden-sm">Home<br />Page</span></a></li>';
	html += '<li id="Defs" class="active menu-li"><a onclick="LocationChange(\'defs\');"><i class="fa fa-gear"></i><span class="hidden-sm">Config<br />Management</span></a></li>';
	html += '<li id="Test" class="active menu-li"><a onclick="LocationChange(\'test\');"><i class="fa fa-lightbulb-o"></i><span class="hidden-sm">Test<br />Screen</span></a></li>';
	html += '<li id="Users" class="active menu-li"><a onclick="LocationChange(\'user\');"><i class="fa fa-user"></i><span class="hidden-sm">User<br />Management</span></a></li>';
  
	$("#Navigation_UL").empty();
	$("#Navigation_UL").append(html);
	$(".menu-li").removeClass("active");
  }