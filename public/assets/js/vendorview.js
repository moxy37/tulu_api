
function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	LoadVendor();
	LoadActiveListing();
	LoadAddPosting();
	LoadMyAccountMenu();
	LoadListingSettings();
	populateVehicle()
}

function populateVehicle() {
    var dealerId = 'dfb56be7-15ef-11eb-83a2-e86a647a411d';
    DisplayVehicle(dealerId).then(function (vehicle) {
		console.log(vehicle);
		var html = '';
		for (var i = 0; i != vehicle.length; i++) {
			html = html + '<li class="activeListingListItem">';
			html = html + '    <img src="assets/images/car/' + vehicle[i].image + '.Png" alt="" class="listingImage">';
			html = html + '    <div class="listingInfo">';
			html = html + '        <h4 class="listingName">' + vehicle[i].year +' '+ vehicle[i].make +' '+ vehicle[i].model + '</h4>';
			html = html + '        <p class="listingPrice">$' + vehicle[i].msrp + '</p>';
			html = html + '        <p  class="listingViews">4420 views</p>';
			html = html + '    </div>';
			html = html + '    <i class="fas fa-ellipsis-h" class="listingsettingBtn" onclick="listingSettings()"></i>';
			html = html + '</li>';
		}


		$("#ActiveListing").empty();
		$("#ActiveListing").append(html);
	});

	
}