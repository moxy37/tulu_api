var carImage = [
	{
		image:"viper",
		name:"2006 Dodge Viper",
		kilometers:"20000 kms",
		price:"90000",
		owner:"One Owner",
		trim:"GTS",
		transmission:"Manual Transmission",
		accidents:"No Accidents"
	},
	{
		image:"gtr",
		name:"2010 Nissan GTR Black Edition",
		kilometers:"35000 kms",
		price:"90000",
		owner:"One Owner",
		trim:"Fully Loaded",
		transmission:"Automatic with DCT",
		accidents:"No Accidents"
	},
	{
		image:"lambo",
		name:"2006 Lamborghini Gallardo",
		kilometers:"9000 kms",
		price:"90000",
		owner:"One Owner",
		trim:"Local Car",
		transmission:"Manual Gated Speed",
		accidents:"No Accidents"
	},
];

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
	for(var i=0;i!=carImage.length;i++){
		html=html+'<li class="activeListingListItem">';		
		html=html+'    <img src="assets/images/car/'+carImage[i].image+'.Png" alt="" class="listingImage">';
		html=html+'    <div class="listingInfo">';
		html=html+'        <h4 class="listingName">'+carImage[i].name+'</h4>';		
		html=html+'        <p class="listingPrice">$'+carImage[i].price+'</p>';		
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
    html=html+'    ';
    html=html+'    <form action="" class="addVehicleForm addVehicleStepOne">';
    html=html+'        <label for="vinNum">VIN # :</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="vinNum" class="vinNum" name="vinNum"><br>';
    html=html+'        </div>';
    html=html+'        ';
    html=html+'        <button type="button" class="nextBtn" onclick="">ENTER VIN</button>';
    html=html+'        <!-- <label for="carDescription">Addition Description :</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <textarea type="text" id="carDescription" class="carDescription" name="carDescription"></textarea>';
    html=html+'        </div> -->';
    html=html+'        ';
    html=html+'        <button type="button" class="nextBtn" onclick="addVehicleStep()">NEXT</button>';
    html=html+'    </form>';
    html=html+'    <form action="" class="addVehicleForm addVehicleStepTwo">';
    html=html+'        <section class="vinInfo">';
    html=html+'            <ul class="vinInfoList">';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Condition</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Year</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Make</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Model</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Color</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Body Type</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Engine</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>DriveTrain</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Transmission</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Fuel Type</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Kilometers</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Trim</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'                <li class="vinInfoListItems">';
    html=html+'                    <p>Accidents</p>';
    html=html+'                    <p>N/A</p>';
    html=html+'                    <i class="fas fa-times"></i>';
    html=html+'                </li>';
    html=html+'            </ul>';
    html=html+'        </section>';
    html=html+'';
    html=html+'        <button type="button" class="nextBtn" onclick="addVehicleStep()">NEXT</button>';
    html=html+'';
    html=html+'    </form>';
    html=html+'    <form action="" class="addVehicleForm addVehicleStepThree">';
    html=html+'        <label for="carDescription">Addition Description :</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <textarea type="text" id="carDescription" class="carDescription" name="carDescription"></textarea>';
    html=html+'        </div>';
    html=html+'        <div id="imageContainer">';
    html=html+'        </div>';
    html=html+'        <input type="file" accept="image/*" onchange="loadFile(event)" id="file-input">';
    html=html+'        <button type="button" class="addImageBtn" onclick="addImage()">ADD PHOTOS</button>';
    html=html+'        <button type="button" class="submitBtn" onclick="addVehicleStep()">SUBMIT</button>';
    html=html+'    </form>';
    html=html+'    <div class="addVehicleForm vehicleAdded">';
    html=html+'    <div class="addVehicleForm vehicleAdded">';
    html=html+'    <div id="imageContainer">';
    html=html+'    </div>';
    html=html+'        <h3>Vehicle Added <i class="fas fa-check"></i></h3>';
    html=html+'        <button type="button" class="doneBtn" onclick="addVehicleStep()">DONE</button>';
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
    html=html+'        <a href="/contactUs">';
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