var dealer = [
	{
		image:"",
		dealerName:"Acura",
		dealerLocation:"Calgary, AB",
		dealerPhoneNumber:"403-239-6237",
		dealerHours:"Open - Close 8p.m.",
		dealerListing:"5 cars listed",
	},{
		image:"",
		dealerName:"Ford",
		dealerLocation:"Reddeer, AB",
		dealerPhoneNumber:"403-229-4342",
		dealerHours:"Open - Close 8p.m.",
		dealerListing:"5 cars listed",
	},{
		image:"",
		dealerName:"Nissan Dealership",
		dealerLocation:"Cochrane, AB",
		dealerPhoneNumber:"403-123-321",
		dealerHours:"Open - Close 8p.m.",
		dealerListing:"5 cars listed",
	},{
		image:"",
		dealerName:"Dodge Dealership",
		dealerLocation:"Edmonton, AB",
		dealerPhoneNumber:"403-123-321",
		dealerHours:"Open - Close 8p.m.",
		dealerListing:"5 cars listed",
	},{
		image:"",
		dealerName:"BMW Dealership",
		dealerLocation:"Airdrie, AB",
		dealerPhoneNumber:"403-123-321",
		dealerHours:"Open - Close 8p.m.",
		dealerListing:"5 cars listed",
	},{
		image:"",
		dealerName:"VW Dealership",
		dealerLocation:"Banff, AB",
		dealerPhoneNumber:"403-123-321",
		dealerHours:"Open - Close 8p.m.",
		dealerListing:"5 cars listed",
	},{
		image:"",
		dealerName:"Hyundai Dealership",
		dealerLocation:"Canmore, AB",
		dealerPhoneNumber:"403-123-321",
		dealerHours:"Open - Close 8p.m.",
		dealerListing:"5 cars listed",
	}
]

function LoadDealership() {
	var html = '';
	for(i=0;i!=dealer.length;i++){
		html=html+'<li class="dealershipListItem">';
		html=html+'	<div class="dealerImage">';
		html=html+'		<img src="" alt="">';
		html=html+'	</div>';
		html=html+'	<div class="dealerInfo">';
		html=html+'		<h3 class="dealerName">'+dealer[i].dealerName+'</h3>';
		html=html+'		<h4 class="location">'+dealer[i].dealerLocation+'</h4>';
		html=html+'		<p class="phoneNumber">'+dealer[i].dealerPhoneNumber+'</p>';
		html=html+'		<p class="hours">'+dealer[i].dealerHours+'</p>';
		html=html+'		<p class="listing">'+dealer[i].dealerListing+'</p>';
		html=html+'	</div>';
		html=html+'</li>';
	}
	$("#dealershipList").empty();
	$("#dealershipList").append(html);
  }

  LoadDealership()