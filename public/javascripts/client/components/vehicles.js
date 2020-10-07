var carImage = [
	{
		image:"viper",
		name:"2006 Dodge Viper",
		kilometers:"20000 kms",
		owner:"One Owner",
		price:"90000",
		trim:"GTS",
		transmission:"Manual Transmission",
		accidents:"No Accidents"
	},
	{
		image:"gtr",
		name:"2010 Nissan GTR Black Edition",
		kilometers:"35000 kms",
		owner:"One Owner",
		price:"90000",
		trim:"Fully Loaded",
		transmission:"Automatic with DCT",
		accidents:"No Accidents"
	},
	{
		image:"lambo",
		name:"2006 Lamborghini Gallardo",
		kilometers:"9000 kms",
		owner:"One Owner",
		price:"90000",
		trim:"Local Car",
		transmission:"Manual Gated Speed",
		accidents:"No Accidents"
	},
];

function LoadVehicles() {
	var html = '';
	for(var i=0;i!=carImage.length;i++){
		html=html+'<li class="vehicleListItems">';
		html=html+'	<img src="assets/images/car/'+carImage[i].image+'.png" class="carImage" alt="car-image">';
		html=html+'	<div class="carDetails">';
		html=html+'		<h2 class="carName">'+carImage[i].name+'</h2>';
		html=html+'		<p class="carPrice">$'+carImage[i].price+'</p>';
		html=html+'		<p class="carMileage">'+carImage[i].kilometers+'</p>';
		html=html+'		<div class="additionalCarInfo" id="vehicle'+i+'">';
		html=html+'			<p class="carOwner">'+carImage[i].owner+'</p>';
		html=html+'			<p class="carTrim">'+carImage[i].trim+'</p>';
		html=html+'			<p class="carTransmission">'+carImage[i].transmission+'</p>';
		html=html+'			<p class="carAccidents">'+carImage[i].accidents+'</p>';
		html=html+'		</div>';
		html=html+'		<div class="moreInfoContainer">';
		html=html+'			<button class="moreInfo moreInfoBtn" id="moreInfo'+i+'" onclick="const div = document.querySelector(`#vehicle'+i+'`);const moreInfoBtn = document.querySelector(`#moreInfo'+i+'`);  if(moreInfoBtn.innerHTML==`More Info`){div.style=`display:flex;`;moreInfoBtn.innerHTML=`Hide Info`;}else{div.style=`display:none;`;moreInfoBtn.innerHTML=`More Info`;}">More Info</button>';
		html=html+'			<a href="/carView">';
		html=html+'				<button class="moreInfo">Explore</button>';
		html=html+'			</a>';
		html=html+'		</div>';
		html=html+'	</div>';
		html=html+'</li>';
	}
	$("#Vehicles").empty();
	$("#Vehicles").append(html);
  }

  LoadVehicles()