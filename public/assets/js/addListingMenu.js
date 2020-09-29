var addListingSetting="off";
const addPostingContainer = document.querySelector('.addPostingContainer');
const addPostingBtn = document.querySelector('.addPostingBtn');

const addListingMenu = () => {
    
    if(addListingSetting=="off"){
        addPostingContainer.style = "height:530px;transition:0.5s ease-in-out;";
        addPostingBtn.style = "transform:rotate(405deg);transition:0.8s ease-in-out;";
        addListingSetting="on";
        setTimeout(appear, 600);
    }else{
        addPostingContainer.style = "height:70px;transition:0.5s ease-in-out;";
        addPostingBtn.style = "transform:rotate(0deg);transition:0.8s ease-in-out;";
        addListingSetting="off";
        setTimeout(reset, 100);
    }
};


const addVehicleStepOne = document.querySelector('.addVehicleStepOne');
const vehicleAdded = document.querySelector('.vehicleAdded');

const submitVehicle = () => {
        addVehicleStepOne.style = "display:Flex; opacity:0; transition:0.5s;";
        vehicleAdded.style = "display:Flex;";
        setTimeout(doneAdding, 600);
};

const doneAdding = () => {
    vehicleAdded.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepOne.style = "display:none;";
    
};

const showAddVehicleStepOne = () => {
    addPostingContainer.style = "height:70px;;transition:0.5s ease-in-out;";
    addPostingBtn.style = "transform:rotate(0deg);transition:0.8s ease-in-out;";
    addListingSetting="off";
    vehicleAdded.style = "display:Flex; opacity:0; transition:0.5s;";
    setTimeout(reset, 500);
    
}

const reset = () => {
    addVehicleStepOne.style = "display:Flex; opacity:0; transition:0.5s;";
    vehicleAdded.style = "display:none;";
}

const appear = () => {
    addVehicleStepOne.style = "display:Flex; opacity:1; transition:0.5s;";
    vehicleAdded.style = "display:none;";
}