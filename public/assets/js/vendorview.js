
function PageLoadFunction() {
	LoadNavigation();
	LoadSideMenu();
	LoadVendor();
	LoadActiveListing();
	LoadAddPosting();
	LoadMyAccountMenu();
	LoadListingSettings();
}


function decodeVin(user){
	const vin = document.querySelector("#vinNum");
	console.log(vin.value);    
	const vinNumber = vin.value;
	console.log(vinNumber);    
	fetch("http://localhost:3001/test_vin/"+vinNumber, {
        "method": "GET"
    })
    .then(res => res.json())          
    .then(vehicleInfo => {
		console.log(vehicleInfo);
	})
	addVehicleStep()
}

// function PopulateUserData(user) {
	
// 	console.log(JSON.stringify());


// }


// async function decodeVin(user) {
// 	var VehicleDAO = require(__base + "dao/vehicle/vehicledao");
//     var vehicleDao = new VehicleDAO();
//     var vin = req.params.vin;
//     vehicleDao.vinDecode('', vin, function (err, result) {
//         return res.send(result);
//     });
// }

