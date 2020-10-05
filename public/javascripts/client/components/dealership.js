var dealerListing = [
	{
		image:"",
		carName:"Ford Focus",
		carPrice:"35,000",
		carViews:"28k"
	},{
		image:"",
		carName:"Dodge Ram 1500",
		carPrice:"75,000",
		carViews:"13k"
	},{
		image:"",
		carName:"Honda Civic",
		carPrice:"45,000",
		carViews:"12k"
	},{
		image:"",
		carName:"Hyundai Elantra",
		carPrice:"35,000",
		carViews:"3k"
	},{
		image:"",
		carName:"Nissan 350z",
		carPrice:"45,000",
		carViews:"42"
	}
]

function LoadDealership() {
	var html = '';
	for(i=0;i!=dealerListing.length;i++){
		html=html+'<li class="dealerListingListItems">';
		html=html+'	<div class="carImage">';
		html=html+'		<img src="" alt="">';
		html=html+'	</div>';
		html=html+'	<div class="carInfo">';
		html=html+'		<h4 class="carName">'+dealerListing[i].carName+'</h4>';
		html=html+'		<p class="carPrice">$'+dealerListing[i].carPrice+'</p>';
		html=html+'		<p class="carViews">'+dealerListing[i].carViews+' views</p>';
		html=html+'		<a href="" class="viewVehicle">View Vehicle</a>';
		html=html+'	</div>';
		html=html+'</li>';
	}
	

	$("#dealerListingList").empty();
	$("#dealerListingList").append(html);
  }

  LoadDealership()