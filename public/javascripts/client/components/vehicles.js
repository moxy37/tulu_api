function LoadVehicles() {
	var html = '';
	for(var i=0;i!=10;i++){
		html=html+'<li class="vehicleListItems">';
		html=html+'	<img src="assets/images/car/not-available.jpg" class="carImage" alt="car-image">';
		html=html+'	<div class="carDetails">';
		html=html+'		<h2 class="carName">McQueen</h2>';
		html=html+'		<p class="carPrice">$45,000</p>';
		html=html+'		<p class="carMileage">14,000km</p>';
		html=html+'		<a href="/carView">';
		html=html+'			<button class="moreInfo">Explore</button>';
		html=html+'		</a>';
		html=html+'	</div>';
		html=html+'</li>';
	}
	$("#Vehicles").empty();
	$("#Vehicles").append(html);
  }

  LoadVehicles()