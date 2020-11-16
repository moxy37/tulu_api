var addListingSetting="off";


const AddListingMenu = () => {
    const addPostingContainer = document.querySelector('.addPostingContainer');
    const addPostingBtn = document.querySelector('.addPostingBtn');
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
const addVehicleStepFour = document.querySelector('.addVehicleStepFour');
const addVehicleStepFive = document.querySelector('.addVehicleStepFive');
const vehicleAdded = document.querySelector('.vehicleAdded');
var addVehicleStepCount = 1;
const AddVehicleStep = () => {
    if(addVehicleStepCount == 1){
        const addVehicleStepOne = document.querySelector('.addVehicleStepOne');
        const addVehicleStepTwo = document.querySelector('.addVehicleStepTwo');
        addVehicleStepOne.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepTwo.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepTwo, 600);
    }else if(addVehicleStepCount == 2){
        const addVehicleStepTwo = document.querySelector('.addVehicleStepTwo');
        const addVehicleStepThree = document.querySelector('.addVehicleStepThree');
        addVehicleStepTwo.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepThree.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepThree, 600);
    }else if(addVehicleStepCount == 3){
        const addVehicleStepThree = document.querySelector('.addVehicleStepThree');
        const addVehicleStepFour = document.querySelector('.addVehicleStepFour');
        addVehicleStepThree.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepFour.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepFour, 600);
    }
    else if(addVehicleStepCount == 4){
        const addVehicleStepFour = document.querySelector('.addVehicleStepFour');
        const addVehicleStepFive = document.querySelector('.addVehicleStepFive');
        addVehicleStepFour.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepFive.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepFive, 600);
    }
    else if(addVehicleStepCount == 5){
        const addVehicleStepFive = document.querySelector('.addVehicleStepFive');
        const vehicleAdded = document.querySelector('.vehicleAdded');
        addVehicleStepFive.style = "display:Flex; opacity:0; transition:0.5s;";
        vehicleAdded.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(AddedSuccessful, 600);
    }
    else if(addVehicleStepCount == 6){
        const vehicleAdded = document.querySelector('.vehicleAdded');
        vehicleAdded.style = "display:Flex; opacity:0; transition:0.5s;";
        setTimeout(AddingDone, 600);
    }
};

const ShowAddVehicleStepOne = () => {
    const addVehicleStepOne = document.querySelector('.addVehicleStepOne');
    const vehicleAdded = document.querySelector('.vehicleAdded');
    addVehicleStepOne.style = "display:Flex; opacity:1; transition:0.5s;";
    vehicleAdded.style = "display:none;";
}

const AddingDone = () => {
    const addPostingContainer = document.querySelector('.addPostingContainer');
    const addPostingBtn = document.querySelector('.addPostingBtn');
    addPostingContainer.style = "height:10vh;transition:0.5s ease-in-out;";
    addPostingBtn.style = "transform:rotate(0deg);transition:0.8s ease-in-out;";
    addListingSetting="off";
    addVehicleStepCount=1;
    setTimeout(ShowAddVehicleStepOne, 600);
    setTimeout(ResetForms, 600);
}


const ResetForms = () => {
    document.querySelector('#vinNum').value = "";
    document.querySelector('#wholeSalePrice').value = "";
    document.querySelector('#carDescription').value = "";
    document.querySelector('#photos-input').value = "";
    $("#thumbnailContainer").empty();
}

const ShowAddVehicleStepTwo = () => {
    const addVehicleStepOne = document.querySelector('.addVehicleStepOne');
    const addVehicleStepTwo = document.querySelector('.addVehicleStepTwo');
    addVehicleStepTwo.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepOne.style = "display:none";
}

const ShowAddVehicleStepThree = () => {
    const addVehicleStepThree = document.querySelector('.addVehicleStepThree');
    const addVehicleStepTwo = document.querySelector('.addVehicleStepTwo');
    addVehicleStepThree.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepTwo.style = "display:none;";
}

const ShowAddVehicleStepFour = () => {
    const addVehicleStepFour = document.querySelector('.addVehicleStepFour');
    const addVehicleStepThree = document.querySelector('.addVehicleStepThree');
    addVehicleStepFour.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepThree.style = "display:none;";
}

const ShowAddVehicleStepFive = () => {
    const addVehicleStepFive = document.querySelector('.addVehicleStepFive');
    const addVehicleStepFour = document.querySelector('.addVehicleStepFour');
    addVehicleStepFive.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepFour.style = "display:none;";
}

const AddedSuccessful = () => {
    const vehicleAdded = document.querySelector('.vehicleAdded');
    const addVehicleStepFive = document.querySelector('.addVehicleStepFour');
    vehicleAdded.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepFive.style = "display:none;";
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
    const fileBtn = document.querySelector(`#photos-input`);
    fileBtn.click();
}


const uploadImage = () =>{
    const uploadBtn = document.querySelector(`#uploadBtn`);
    uploadBtn.click();
}

function showFrontBumperContainer(){
    resetContainers();
    document.querySelector("#frontBumperContainer").classList = "detailsContainer frontBumperContainerShow";
}

function showRearBumperContainer(){
    resetContainers();
    document.querySelector("#rearBumperContainer").classList = "detailsContainer rearBumperContainerShow";
}

function showSideSkirtContainer(){
    resetContainers();
    document.querySelector("#sideSkirtContainer").classList = "detailsContainer sideSkirtContainerShow";
}

function showHoodContainer(){
    resetContainers();
    document.querySelector("#hoodContainer").classList = "detailsContainer hoodContainerShow";
}

function showQuarterPanelContainer(){
    resetContainers();
    document.querySelector("#quarterPanelContainer").classList = "detailsContainer quarterPanelContainerShow";
}

function resetContainers(){
    document.querySelector("#frontBumperContainer").classList = "detailsContainer frontBumperContainerHide";
    document.querySelector("#rearBumperContainer").classList = "detailsContainer rearBumperContainerHide";
    document.querySelector("#sideSkirtContainer").classList = "detailsContainer sideSkirtContainerHide";
    document.querySelector("#hoodContainer").classList = "detailsContainer hoodContainerHide";
    document.querySelector("#quarterPanelContainer").classList = "detailsContainer quarterPanelContainerHide";
}