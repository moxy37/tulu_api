var carDetails = [
	{
		image:["stock-photo-1","stock-photo-2","stock-photo-3","stock-photo-4",],
		name:"2006 Dodge Viper",
		year:"2006",
		make:"Dodge",
		model:"Viper",
		color:"Silver",
		price:"$45,000",
		Condition:"Used",
		bodytype:"Coupe",
		engine:"8.3-liter V10",
		drivetrain:"N/A",
		fueltype:"N/A",
		kilometers:"20000 kms",
		owner:"One Owner",
		trim:"GTS",
		transmission:"Manual Transmission",
		accidents:"No Accidents",
		vin:"A1b2c31241aafdWFad124",
		notes:"This is just a addition info about the car. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eaque ipsum culpa iste sed ipsam."
	}
];


function LoadCarVendor() {
	var carVendorInsert = "";
	carVendorInsert=carVendorInsert+'<a href="/vendor">';
    carVendorInsert=carVendorInsert+'    <div class="userImage">';
    carVendorInsert=carVendorInsert+'        <i class="fas fa-user fa-2x"></i>';
    carVendorInsert=carVendorInsert+'    </div>';
    carVendorInsert=carVendorInsert+'</a>';
    carVendorInsert=carVendorInsert+'<div class="userInfo">';
    carVendorInsert=carVendorInsert+'    <h3 class="userName">';
    carVendorInsert=carVendorInsert+'        Company';
    carVendorInsert=carVendorInsert+'    </h3>';
    carVendorInsert=carVendorInsert+'    <p class="userActiveListingCount">';
    carVendorInsert=carVendorInsert+'        5 Active Listing';
    carVendorInsert=carVendorInsert+'    </p>';
    carVendorInsert=carVendorInsert+'</div>';
	$("#carVendor").empty();
	$("#carVendor").append(carVendorInsert);
}
LoadCarVendor();


function LoadCarView() {
	var html = '';
	// html=html+'<img src="assets/images/car/not-available.jpg" class="carImage" alt="car-image">';
    html=html+'<div class="carDetails">';
    html=html+'<img src="assets/images/car/not-available.jpg" class="carImage" alt="car-image">';
    html=html+'     <div class="carTitle">';
    html=html+'         <h2 class="carName">'+carDetails[0].name+'</h2>';
    html=html+'         <p class="carPrice">'+carDetails[0].price+'</p>';
    html=html+'     </div>';
    html=html+'     <div class="carGallery">';
    html=html+'         <ul id="carImageList" class="lightbox-gallery carImageList">';
    html=html+'     	</ul>';
    html=html+'     </div>';
    html=html+'	</div>';
    html=html+'	<div class="carSpecsBox">';
    html=html+'	    <div class="carSpecsCol">';
    html=html+'		    <ul class="carSpecs">';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Condition</p>';
    html=html+'		            <p>'+carDetails[0].condition+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Year</p>';
    html=html+'		            <p>'+carDetails[0].year+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Make</p>';
    html=html+'		            <p>'+carDetails[0].make+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Model</p>';
    html=html+'		            <p>'+carDetails[0].model+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Color</p>';
    html=html+'		            <p>'+carDetails[0].color+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Body Type</p>';
    html=html+'		            <p>'+carDetails[0].bodytype+'</p>';
    html=html+'		        </li>';
    html=html+'		    </ul>';
    html=html+'		    <ul class="carSpecs">';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Engine</p>';
    html=html+'		            <p>'+carDetails[0].engine+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Drivetrain</p>';
    html=html+'		            <p>'+carDetails[0].drivetrain+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Transmission</p>';
    html=html+'		            <p>'+carDetails[0].transmission+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Fuel Type</p>';
    html=html+'		            <p>'+carDetails[0].fueltype+'</p>';
    html=html+'		        </li>';
    html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Kilometers</p>';
    html=html+'		            <p>'+carDetails[0].kilometers+'</p>';
	html=html+'		        </li>';
	html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Trim</p>';
    html=html+'		            <p>'+carDetails[0].trim+'</p>';
	html=html+'		        </li>';
	html=html+'		        <li class="carInfo">';
    html=html+'		            <p>Accidents</p>';
    html=html+'		            <p>'+carDetails[0].accidents+'</p>';
    html=html+'		        </li>';
    html=html+'		    </ul>';
    html=html+'		</div>';
    html=html+'		<div class="infoBoxVN">';
	html=html+'		    <div class="carInfoVin">';
    html=html+'		        <p>VIN#:</p>';
    html=html+'		        <p>'+carDetails[0].vin+'</p>';
	html=html+'		    </div>';
	html=html+'		    <div class="carInfo carInfoNotes">';
    html=html+'		        <p>'+carDetails[0].notes+'</p>';
    html=html+'		    </div>';
    html=html+'		</div>';
    html=html+'</div>';


	$("#Vehicles").empty();
	$("#Vehicles").append(html);
  }

  LoadCarView()


function LoadCarGallery() {
  var carImageInsert = "";
	for(var i=0;i!=carDetails[0].image.length;i++){
		carImageInsert=carImageInsert+'                <li class="carImageListItems">';
    	carImageInsert=carImageInsert+'                    <img src="assets/images/car/'+carDetails[0].image[i]+'.jpg" data-image-hd="assets/images/car/stock-photo-1.jpg">';
		carImageInsert=carImageInsert+'                </li>';
	}
	$("#carImageList").empty();
	$("#carImageList").append(carImageInsert);
}
LoadCarGallery();

function LoadShareButton() {
	var shareButtonInsert = "";
	shareButtonInsert=shareButtonInsert+'<div class="ShareContainer">';
    shareButtonInsert=shareButtonInsert+'    <p>Share This Listing</p>';
    shareButtonInsert=shareButtonInsert+'    <div class="shareBtnContainer">';
    shareButtonInsert=shareButtonInsert+'        <i class="fab fa-facebook fbIcon fa-2x"></i> ';
    shareButtonInsert=shareButtonInsert+'        <i class="fab fa-facebook-messenger messerngerIcon fa-2x"></i>';
    shareButtonInsert=shareButtonInsert+'        <i class="fas fa-link linkIcon fa-2x"></i>';
    shareButtonInsert=shareButtonInsert+'    </div>';
	shareButtonInsert=shareButtonInsert+'</div>';
	$("#shareSection").empty();
	$("#shareSection").append(shareButtonInsert);
}
LoadShareButton();