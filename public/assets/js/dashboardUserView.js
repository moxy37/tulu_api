function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
}


function showAddNewUser(){
	document.querySelector(".addNewUser").style = "display:flex;";
}

function hideAddNewUser(){
	document.querySelector(".addNewUser").style = "display:none;";
}