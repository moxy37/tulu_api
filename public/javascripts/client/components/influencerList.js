var influencers = [
	{
		image:"",
		influencerName:"Influencer Guy",
		influencerPhoneNumber:"403-123-3212",
		influencerListing:"42 cars listed",
	},{
		image:"",
		influencerName:"Logan Paul",
		influencerPhoneNumber:"403-069-4200",
		influencerListing:"21 cars listed",
	},{
		image:"",
		influencerName:"Lito Lapid",
		influencerPhoneNumber:"403-098-7654",
		influencerListing:"2 cars listed",
	},{
		image:"",
		influencerName:"Lord Tapulao",
		influencerPhoneNumber:"403-890-9725",
		influencerListing:"0 cars listed",
	},{
		image:"",
		influencerName:"Eddie Van Halen",
		influencerPhoneNumber:"403-123-5150",
		influencerListing:"3 cars listed",
	}
]

function LoadDealership() {
	var html = '';
	for(i=0;i!=influencers.length;i++){
		html=html+'<li class="influencerListItem">';
		html=html+'	<div class="influencerImage">';
		html=html+'		<img src="" alt="">';
		html=html+'	</div>';
		html=html+'	<div class="influencerInfo">';
		html=html+'		<h4 class="influencerName">'+influencers[i].influencerName+'</h4>';
		html=html+'		<p class="influencerPhoneNumber">'+influencers[i].influencerPhoneNumber+'</p>';
		html=html+'		<p class="influencerListing">'+influencers[i].influencerListing+'</p>';
		html=html+'	</div>';
		html=html+'</li>';
	}
	$("#influencerList").empty();
	$("#influencerList").append(html);
  }

  LoadDealership()