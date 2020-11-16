function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
}


function showAddNewVehicle(){
	document.querySelector(".addNewVehicle").style = "display:flex;";
}

function hideAddNewVehicle(){
	document.querySelector(".addNewVehicle").style = "display:none;";
}

function showEditVehicle(){
	document.querySelector(".editVehicle").style = "display:flex;";
}

function hideEditVehicle(){
	document.querySelector(".editVehicle").style = "display:none;";
}

function saveEdit(){
	alert('Save Edit');
}

function saveVehicle(){
	alert('Save Vehicle');
}

function deleteVehicle(){
	alert('Delete Vehicle');
}