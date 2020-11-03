function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	LoadCarVendor();

	
	LoadShareButton();
	LoadFooter();
	var vin = window.sessionStorage.getItem("vin");
	var id = window.sessionStorage.getItem("viewDealerId");
	GetVehicle(vin, id).then(function (result) {
		gVehicle = result;
		// alert(JSON.stringify(result));
		console.log(result)
		LoadCarView();
		LoadCarGallery();
	});
}

var gVehicle;

function LoadCarVendor() {
	var carVendorInsert = "";
	carVendorInsert = carVendorInsert + '<a onclick="LocationChange(\'vendor\');">';
	carVendorInsert = carVendorInsert + '    <div class="userImage">';
	carVendorInsert = carVendorInsert + '        <i class="fas fa-user fa-2x"></i>';
	carVendorInsert = carVendorInsert + '    </div>';
	carVendorInsert = carVendorInsert + '</a>';
	carVendorInsert = carVendorInsert + '<div class="userInfo">';
	carVendorInsert = carVendorInsert + '    <h3 class="userName">';
	carVendorInsert = carVendorInsert + '        Company';
	carVendorInsert = carVendorInsert + '    </h3>';
	carVendorInsert = carVendorInsert + '    <p class="userActiveListingCount">';
	carVendorInsert = carVendorInsert + '        5 Active Listing';
	carVendorInsert = carVendorInsert + '    </p>';
	carVendorInsert = carVendorInsert + '</div>';
	$("#carVendor").empty();
	$("#carVendor").append(carVendorInsert);
}

function LoadCarView() {
	var html = '';
	// html=html+'<img src="assets/images/car/not-available.jpg" class="carImage" alt="car-image">';
	html = html + '<div class="carDetails">';
	html = html + '<img src="' + gVehicle.links[0].url + '" class="carImage" alt="car-image">';
	html = html + '     <div class="carTitle">';
	html = html + '         <h2 class="carName">' + gVehicle.model + '</h2>';
	html = html + '         <p class="carPrice">$&nbsp' + gVehicle.msrp + '</p>';
	html = html + '     </div>';
	html = html + '     <div class="carGallery">';
	html = html + '         <ul id="carImageList" class="lightbox-gallery carImageList">';
	html = html + '     	</ul>';
	html = html + '     </div>';
	html = html + '	</div>';
	html = html + '	<div class="carSpecsBox">';
	html = html + '	    <div class="carSpecsCol">';
	html = html + '		    <ul class="carSpecs">';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Condition</p>';
	html = html + '		            <p>' + '' + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Year</p>';
	html = html + '		            <p>' + gVehicle.year + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Make</p>';
	html = html + '		            <p>' + gVehicle.make + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Model</p>';
	html = html + '		            <p>' + gVehicle.model + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Color</p>';
	html = html + '		            <p>' + gVehicle.colorName + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Body Type</p>';
	html = html + '		            <p>' + gVehicle.bodyType + '</p>';
	html = html + '		        </li>';
	html = html + '		    </ul>';
	html = html + '		    <ul class="carSpecs">';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Engine</p>';
	html = html + '		            <p>' + gVehicle.engineName + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Drivetrain</p>';
	html = html + '		            <p>' + gVehicle.driveType + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Transmission</p>';
	html = html + '		            <p>' + gVehicle.transmissionName + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Fuel Type</p>';
	html = html + '		            <p>' + gVehicle.fueltype + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Kilometers</p>';
	html = html + '		            <p>' + '' + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Trim</p>';
	html = html + '		            <p>' + gVehicle.trim + '</p>';
	html = html + '		        </li>';
	html = html + '		        <li class="carInfo">';
	html = html + '		            <p>Accidents</p>';
	html = html + '		            <p>' + '' + '</p>';
	html = html + '		        </li>';
	html = html + '		    </ul>';
	html = html + '		</div>';
	html = html + '		<div class="infoBoxVN">';
	html = html + '		    <div class="carInfoVin">';
	html = html + '		        <p>VIN#:</p>';
	html = html + '		        <p>' + gVehicle.vin + '</p>';
	html = html + '		    </div>';
	html = html + '		    <div class="carInfo carInfoNotes">';
	html = html + '		        <p>Notes:</p>';
	html = html + '		        <p>' + gVehicle.notes + '</p>';
	html = html + '		    </div>';
	html = html + '		</div>';
	html = html + '</div>';


	$("#Vehicles").empty();
	$("#Vehicles").append(html);
}




function LoadCarGallery() {
	var carImageInsert = "";
	for (var i = 0; i != gVehicle.links.length; i++) {
		carImageInsert = carImageInsert + '                <li class="carImageListItems">';
		carImageInsert = carImageInsert + '                    <img src="' + gVehicle.links[i].url + '" data-image-hd="' + gVehicle.links[i].url + '">';
		carImageInsert = carImageInsert + '                </li>';
	}
	$("#carImageList").empty();
	$("#carImageList").append(carImageInsert);
	console.log(gVehicle.links);
}


function LoadShareButton() {
	var shareButtonInsert = "";
	shareButtonInsert = shareButtonInsert + '<div class="ShareContainer">';
	shareButtonInsert = shareButtonInsert + '    <p>Share This Listing</p>';
	shareButtonInsert = shareButtonInsert + '    <div class="shareBtnContainer">';
	shareButtonInsert = shareButtonInsert + '        <i class="fab fa-facebook fbIcon fa-2x"></i> ';
	shareButtonInsert = shareButtonInsert + '        <i class="fab fa-facebook-messenger messerngerIcon fa-2x"></i>';
	shareButtonInsert = shareButtonInsert + '        <i class="fas fa-link linkIcon fa-2x"></i>';
	shareButtonInsert = shareButtonInsert + '    </div>';
	shareButtonInsert = shareButtonInsert + '</div>';
	$("#shareSection").empty();
	$("#shareSection").append(shareButtonInsert);
}
