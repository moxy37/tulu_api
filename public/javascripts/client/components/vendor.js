function LoadVendor() {
	var html = '';
	html=html+'<div class="banner"></div>';
	html=html+'<div class="userInfo">';
	html=html+'	<div class="userImage">';
	html=html+'		<i class="fas fa-user fa-4x"></i>';
	html=html+'	</div>';
	html=html+'	<h3 class="userName">Jane Doe</h3>';
	html=html+'	<p class="userActiveListingCount">5 Active Listing</p>';
	html=html+'</div>';
  
	$("#VendorHeader").empty();
	$("#VendorHeader").append(html);

}
LoadVendor()

function LoadActiveListing() {	
	var html = '';	
	for(var i=0;i!=10;i++){
		html=html+'<li class="activeListingListItem">';		
		html=html+'    <img src="assets/images/car/stock-photo-1.jpg" alt="" class="listingImage">';
		html=html+'    <div class="listingInfo">';
		html=html+'        <h4 class="listingName">Mcqueen</h4>';		
		html=html+'        <p class="listingPrice">$45,000</p>';		
		html=html+'        <p  class="listingViews">4420 views</p>';		
		html=html+'    </div>';		
		html=html+'    <i class="fas fa-ellipsis-h" class="listingsettingBtn" onclick="listingSettings()"></i>';		
		html=html+'</li>';	
	}	
	$("#ActiveListing").empty();	
	$("#ActiveListing").append(html);
}

LoadActiveListing()

function LoadAddPosting() {	
	var html = '';	
		html=html+'<div class="addPostingBtn"  onclick="addListingMenu()">';
        html=html+'    <i class="fas fa-plus"></i>';
        html=html+'</div>';
        html=html+'<div class="addVehicleContainer">';
        html=html+'    <form action="" class="addVehicleForm addVehicleStepOne">';
        html=html+'        <label for="vinNum">VIN # :</label>';
        html=html+'        <div class="inputContainer">';
        html=html+'            <input type="text" id="vinNum" class="vinNum" name="vinNum"><br>';
        html=html+'        </div>';
        html=html+'        ';
        html=html+'        <label for="carDescription">Addition Description :</label>';
        html=html+'        <div class="inputContainer">';
        html=html+'            <textarea type="text" id="carDescription" class="carDescription" name="carDescription"></textarea>';
        html=html+'        </div>';
        html=html+'        <button type="button" class="addImageBtn">ADD PHOTOS</button>';
        html=html+'        <button type="button" class="submitBtn" onclick="submitVehicle()">SUBMIT</button>';
        html=html+'    </form>';
        html=html+'    <div class="addVehicleForm vehicleAdded">';
        html=html+'        <h3>Vehicle Added <i class="fas fa-check"></i></h3>';
        html=html+'        <button type="button" class="doneBtn" onclick="showAddVehicleStepOne()">DONE</button>';
        html=html+'    </div>';
        html=html+'</div>';
	
	$("#AddPostingContainer").empty();	
	$("#AddPostingContainer").append(html);
}
LoadAddPosting();


function LoadMyAccountMenu() {
	var html = '';		
	html=html+'<ul class="accountMenuList">';
	html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/vendor">';
    html=html+'            <i class="far fa-user fa-2x accountMenuIcon"></i>';
    html=html+'            Profile';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/">';
    html=html+'            <i class="fas fa-columns fa-2x accountMenuIcon"></i>';
    html=html+'            Dashboard';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/schedule">';
    html=html+'            <i class="far fa-calendar-alt fa-2x accountMenuIcon"></i>';
    html=html+'            Schedule';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/">';
    html=html+'            <i class="fas fa-phone fa-2x accountMenuIcon"></i>';
    html=html+'            Contact Us';
    html=html+'        </a>';
    html=html+'    </li>';
	html=html+'</ul>';	
	
	$("#MyAccountMenu").empty();	
	$("#MyAccountMenu").append(html);
}
LoadMyAccountMenu()

function LoadListingSettings() {	
	var html = '';
	html=html+'<ul class="listingSettingsList">';
    html=html+'    <li class="settingsListItem">';
    html=html+'        <i class="far fa-clipboard"></i>';
    html=html+'        <p>';
    html=html+'            View Listing';
    html=html+'        </p>';
    html=html+'    </li>';
    html=html+'    <li class="settingsListItem">';
    html=html+'        <i class="far fa-trash-alt"></i>';
    html=html+'        <p>';
    html=html+'            Delete Listing';
    html=html+'        </p>';
    html=html+'    </li>';
    html=html+'    <li class="settingsListItem">';
    html=html+'        <i class="far fa-edit"></i>';
    html=html+'        <p>';
    html=html+'            Edit Listing';
    html=html+'        </p>';
    html=html+'    </li>';
    html=html+'    <li class="settingsListItem">';
    html=html+'        <i class="far fa-check-circle"></i>';
    html=html+'        <p>';
    html=html+'            Mark Sold';
    html=html+'        </p>';
    html=html+'    </li>';
    html=html+'    <li class="settingsListItem">';
    html=html+'        <i class="fas fa-chart-line"></i>';
    html=html+'        <p>';
    html=html+'            Boost Lisitng';
    html=html+'        </p>';
    html=html+'    </li>';
    html=html+'    <li class="settingsListItem">';
    html=html+'        <i class="far fa-share-square"></i>';
    html=html+'        <p>';
    html=html+'            Share Listing';
    html=html+'        </p>';
    html=html+'    </li>';
    html=html+'</ul>';
	
	$("#ListingSettingsContainer").empty();	
	$("#ListingSettingsContainer").append(html);
}
LoadListingSettings()