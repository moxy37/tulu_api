var gDealer = null;

function PageLoadFunction() {
	
	loadScanner();
	LoadNavigation();
	LoadSideMenu();
	LoadVendor();
	LoadAddPosting();
	LoadMyAccountMenu();
	LoadListingSettings();
	GetDealerId();
}


function GetDealerId() {
	var dId = '';
	for (var i = 0; i < gUser.roles.length; i++) {
		if (gUser.roles[i].role === 'Dealer' || gUser.roles[i].role === 'DealerAdmin') {
			dId = gUser.roles[i].targetId;
		}
	}
	if (dId !== '') {
		GetDealer(dId).then(function (dealer) {
			gDealer = dealer;
		});
	}
}

async function GetDealer(id) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.id = id;
	const results = await $.ajax({
		type: "PUT",
		url: "/api/dealer/get",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			PopulateVehicle();
		},
		error: function (results) { console.log(results.statusText); },
	});
	return results;
}

function PopulateVehicle() {
	DisplayVehicle(gDealer).then(function (vehicle) {
		var html = '';
		for (var i = 0; i != vehicle.length; i++) {
			html = html + '<li class="activeListingListItem" id="' + vehicle[i].vin + '" >';
			var text = '';
			if (vehicle[i].links !== undefined) {
				if (vehicle[i].links[0] !== undefined) {
					if (vehicle[i].links[0].url !== undefined) {
						text = vehicle[i].links[0].url;
					}
				}
			}
			html = html + '    <img src="' + text + '" alt="" class="listingImage" onclick="ViewVehicle(\'' + vehicle[i].vin + '\',\'' + vehicle[i].dealerId + '\');">';
			html = html + '    <div class="listingInfo" onclick="ViewVehicle(\'' + vehicle[i].vin + '\',\'' + vehicle[i].dealerId + '\');">';
			html = html + '        <h4 class="listingName">' + vehicle[i].year + ' ' + vehicle[i].make + ' ' + vehicle[i].model + '</h4>';
			html = html + '        <p class="listingPrice">$' + vehicle[i].msrp + '</p>';
			html = html + '        <p  class="listingViews">4420 views</p>';
			html = html + '    </div>';
			html = html + '    <i class="fas fa-ellipsis-h" class="listingsettingBtn" onclick="listingSettings()"></i>';
			html = html + '</li>';
		}

		$(".userActiveListingCount").empty();
		$(".userActiveListingCount span").append(vehicle.length);

		$("#ActiveListing").empty();
		$("#ActiveListing").append(html);
	});


}

function ViewVehicle(vin, id) {
	window.sessionStorage.setItem("vin", vin);
	window.sessionStorage.setItem("viewDealerId", id);
	LocationChange('carView');
}