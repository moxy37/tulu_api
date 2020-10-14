var addListingSetting="off";
const addPostingContainer = document.querySelector('.addPostingContainer');
const addPostingBtn = document.querySelector('.addPostingBtn');

const addListingMenu = () => {
    
    if(addListingSetting=="off"){
        addPostingContainer.style = "height:80vh;transition:0.5s ease-in-out;";
        addPostingBtn.style = "transform:rotate(405deg);transition:0.8s ease-in-out;";
        addListingSetting="on";
    }else{
        addPostingContainer.style = "height:10vh;transition:0.5s ease-in-out;";
        addPostingBtn.style = "transform:rotate(0deg);transition:0.8s ease-in-out;";
        addListingSetting="off";
    }
};


const addVehicleStepOne = document.querySelector('.addVehicleStepOne');
const addVehicleStepTwo = document.querySelector('.addVehicleStepTwo');
const addVehicleStepThree = document.querySelector('.addVehicleStepThree');
const vehicleAdded = document.querySelector('.vehicleAdded');
var addVehicleStepCount = 1;
const addVehicleStep = () => {
    if(addVehicleStepCount == 1){
        addVehicleStepOne.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepTwo.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(showAddVehicleStepTwo, 600);
    }else if(addVehicleStepCount == 2){
        addVehicleStepTwo.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepThree.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(showAddVehicleStepThree, 600);
    }else if(addVehicleStepCount == 3){
        addVehicleStepThree.style = "display:Flex; opacity:0; transition:0.5s;";
        vehicleAdded.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(addedSuccessful, 600);
    }
    else if(addVehicleStepCount == 4){
        vehicleAdded.style = "display:Flex; opacity:0; transition:0.5s;";
        setTimeout(addingDone, 600);
    }
};

const showAddVehicleStepOne = () => {
    addVehicleStepOne.style = "display:Flex; opacity:1; transition:0.5s;";
    vehicleAdded.style = "display:none;";
}

const addingDone = () => {
    addPostingContainer.style = "height:10vh;transition:0.5s ease-in-out;";
    addPostingBtn.style = "transform:rotate(0deg);transition:0.8s ease-in-out;";
    addListingSetting="off";
    addVehicleStepCount=1;
    setTimeout(showAddVehicleStepOne, 600);
}

const showAddVehicleStepTwo = () => {
    addVehicleStepTwo.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepOne.style = "display:none";
}

const showAddVehicleStepThree = () => {
    addVehicleStepThree.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepTwo.style = "display:none;";
}

const addedSuccessful = () => {
    vehicleAdded.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepThree.style = "display:none;";
}

var loadFile = function(event) {
	var html="";
    html=html+"<img class='uploadDisplayImage'>";

    $("#imageContainer").empty();	
	$("#imageContainer").append(html);

    var image = document.querySelector('.uploadDisplayImage');
	image.src = URL.createObjectURL(event.target.files[0]);
};

const addImage = () =>{
    const fileBtn = document.querySelector(`#file-input`);
    fileBtn.click();
}
