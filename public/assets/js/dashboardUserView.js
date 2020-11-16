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

function showEditUser(){
	document.querySelector(".editUser").style = "display:flex;";
}

function hideEditUser(){
	document.querySelector(".editUser").style = "display:none;";
}

function saveEdit(){
	alert('Save Edit');
}

function saveUser(){
	alert('Save User');
}

function deleteUser(){
	alert('Delete User');
}