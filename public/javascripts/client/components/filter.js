function LoadFilter() {
	var html = '<i class="fas fa-th-large gridDisplayBtn" onclick="vehicleDisplay()"></i><div class="searchBar"><input type="text"><i class="fas fa-search searchBtn"></i></div><i class="fas fa-ellipsis-v filterBtn" onclick="slideFilterMenu()"></i>';
  
	$("#Filter").empty();
	$("#Filter").append(html);
  }

  LoadFilter()