var carImage = [
    {
        image: "viper",
        name: "2006 Dodge Viper",
        kilometers: "20000 kms",
        price: "90000",
        owner: "One Owner",
        trim: "GTS",
        transmission: "Manual Transmission",
        accidents: "No Accidents"
    },
    {
        image: "gtr",
        name: "2010 Nissan GTR Black Edition",
        kilometers: "35000 kms",
        price: "90000",
        owner: "One Owner",
        trim: "Fully Loaded",
        transmission: "Automatic with DCT",
        accidents: "No Accidents"
    },
    {
        image: "lambo",
        name: "2006 Lamborghini Gallardo",
        kilometers: "9000 kms",
        price: "90000",
        owner: "One Owner",
        trim: "Local Car",
        transmission: "Manual Gated Speed",
        accidents: "No Accidents"
    },
];

function LoadVendor() {
    var html = '';
    html = html + '<div class="banner"></div>';
    html = html + '<div class="userInfo">';
    html = html + '	<div class="userImage">';
    html = html + '		<i class="fas fa-user fa-4x"></i>';
    html = html + '	</div>';
    html = html + '	<h3 class="userName">Jane Doe</h3>';
    html = html + '	<p class="userActiveListingCount">5 Active Listing</p>';
    html = html + '</div>';

    $("#VendorHeader").empty();
    $("#VendorHeader").append(html);

}


function LoadActiveListing() {
    var html = '';
    for (var i = 0; i != carImage.length; i++) {
        html = html + '<li class="activeListingListItem">';
        html = html + '    <img src="assets/images/car/' + carImage[i].image + '.Png" alt="" class="listingImage">';
        html = html + '    <div class="listingInfo">';
        html = html + '        <h4 class="listingName">' + carImage[i].name + '</h4>';
        html = html + '        <p class="listingPrice">$' + carImage[i].price + '</p>';
        html = html + '        <p  class="listingViews">4420 views</p>';
        html = html + '    </div>';
        html = html + '    <i class="fas fa-ellipsis-h" class="listingsettingBtn" onclick="listingSettings()"></i>';
        html = html + '</li>';
    }


    $("#ActiveListing").empty();
    $("#ActiveListing").append(html);
}

function MakeNewVehicle() {
    var vin = $("#vinNum").val();
    var dealerId = 'dfb56be7-15ef-11eb-83a2-e86a647a411d';
    NewVehicle(vin, dealerId).then(function (vehicle) {
        alert(JSON.stringify(vehicle));
        
        addVehicleStep();
    });
}

function LoadVehicleInfo(results) {
    var html = '';
    html = html + ' <section class="vinInfo">';
    html = html + ' <ul class="vinInfoList">';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Year</p>';
    html = html + '         <p>'+results.year+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Make</p>';
    html = html + '         <p>'+results.make+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Model</p>';
    html = html + '         <p>'+results.model+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Color</p>';
    html = html + '         <p>'+results.color+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Body Type</p>';
    html = html + '         <p>'+results.bodyType+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Engine</p>';
    html = html + '         <p>'+results.engineName+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>DriveTrain</p>';
    html = html + '         <p>'+results.driveType+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Transmission</p>';
    html = html + '         <p>'+results.transmissionName+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Fuel Type</p>';
    html = html + '         <p>'+results.fuelType+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Trim</p>';
    html = html + '         <p>'+results.trim+'</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + ' </ul>';
    html = html + '        <button type="button" class="nextBtn" onclick="addVehicleStep()">NEXT</button>';
    html = html + ' </section>';

    $("#addVehicleStepTwo").empty();
    $("#addVehicleStepTwo").append(html);
}

function LoadAddPosting() {
    var html = '';
    html = html + '<div class="addPostingBtn"  onclick="addListingMenu()">';
    html = html + '    <i class="fas fa-plus"></i>';
    html = html + '</div>';
    html = html + '<div class="addVehicleContainer">';
    html = html + '    ';
    html = html + '    <form action="" class="addVehicleForm addVehicleStepOne">';
    html = html + '        <label for="vinNum">VIN # :</label>';
    html = html + '        <div class="inputContainer">';
    html = html + '            <input type="text" id="vinNum" class="vinNum" name="vinNum" value=""><br>';
    html = html + '        </div>';
    html = html + '        ';
    html = html + '        <button type="button" class="nextBtn" onclick="MakeNewVehicle()">ENTER VIN</button>';
    html = html + '        <!-- <label for="carDescription">Addition Description :</label>';
    html = html + '        <div class="inputContainer">';
    html = html + '            <textarea type="text" id="carDescription" class="carDescription" name="carDescription"></textarea>';
    html = html + '        </div> -->';
    html = html + '        ';
    // html = html + '        <button type="button" class="nextBtn" onclick="addVehicleStep()">NEXT</button>';
    html = html + '    </form>';
    html = html + '    <form action="" class="addVehicleForm addVehicleStepTwo" id="addVehicleStepTwo">';
    
    html = html + '';
    
    html = html + '';
    html = html + '    </form>';
    html = html + '    <form action="" class="addVehicleForm addVehicleStepThree">';
    html = html + '        <label for="carDescription">Addition Description :</label>';
    html = html + '        <div class="inputContainer">';
    html = html + '            <textarea type="text" id="carDescription" class="carDescription" name="carDescription"></textarea>';
    html = html + '        </div>';
    html = html + '        <div id="imageContainer">';
    html = html + '        </div>';
    html = html + '        <input type="file" accept="image/*" onchange="loadFile(event)" id="file-input">';
    html = html + '        <button type="button" class="addImageBtn" onclick="addImage()">ADD PHOTOS</button>';
    html = html + '        <button type="button" class="submitBtn" onclick="addVehicleStep()">SUBMIT</button>';
    html = html + '    </form>';
    html = html + '    <div class="addVehicleForm vehicleAdded">';
    html = html + '    <div id="imageContainer">';
    html = html + '    </div>';
    html = html + '        <h3>Vehicle Added <i class="fas fa-check"></i></h3>';
    html = html + '        <button type="button" class="doneBtn" onclick="addVehicleStep()">DONE</button>';
    html = html + '    </div>';
    html = html + '</div>';

    $("#AddPostingContainer").empty();
    $("#AddPostingContainer").append(html);
}



function LoadMyAccountMenu() {
    var html = '';
    html = html + '<ul class="accountMenuList">';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a onclick="goToVendor()">';
    html = html + '            <i class="far fa-user fa-2x accountMenuIcon"></i>';
    html = html + '            Profile';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a href="/">';
    html = html + '            <i class="fas fa-columns fa-2x accountMenuIcon"></i>';
    html = html + '            Dashboard';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a onclick="goToSchedule()">';
    html = html + '            <i class="far fa-calendar-alt fa-2x accountMenuIcon"></i>';
    html = html + '            Schedule';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a href="/contactUs">';
    html = html + '            <i class="fas fa-phone fa-2x accountMenuIcon"></i>';
    html = html + '            Contact Us';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '</ul>';

    $("#MyAccountMenu").empty();
    $("#MyAccountMenu").append(html);
}


function LoadListingSettings() {
    var html = '';
    html = html + '<ul class="listingSettingsList">';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-clipboard"></i>';
    html = html + '        <p>';
    html = html + '            View Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-trash-alt"></i>';
    html = html + '        <p>';
    html = html + '            Delete Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-edit"></i>';
    html = html + '        <p>';
    html = html + '            Edit Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-check-circle"></i>';
    html = html + '        <p>';
    html = html + '            Mark Sold';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="fas fa-chart-line"></i>';
    html = html + '        <p>';
    html = html + '            Boost Lisitng';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-share-square"></i>';
    html = html + '        <p>';
    html = html + '            Share Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '</ul>';

    $("#ListingSettingsContainer").empty();
    $("#ListingSettingsContainer").append(html);
}

function goToVendor() {
    LocationChange('vendor');
}

function goToSchedule() {
    LocationChange('schedule');
}