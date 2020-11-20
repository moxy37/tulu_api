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
const addVehicleStepSix = document.querySelector('.addVehicleStepSix');
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
        const addVehicleStepSix = document.querySelector('.addVehicleStepSix');
        addVehicleStepFive.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepSix.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepSix, 600);
    }
    else if(addVehicleStepCount == 6){
        const addVehicleStepSix = document.querySelector('.addVehicleStepSix');
        const vehicleAdded = document.querySelector('.vehicleAdded');
        addVehicleStepSix.style = "display:Flex; opacity:0; transition:0.5s;";
        vehicleAdded.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(AddedSuccessful, 600);
    }
    else if(addVehicleStepCount == 7){
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
    document.querySelector('#mileage').value = "";
    document.querySelector('#minPrice').value = "";
    document.querySelector('#maxPrice').value = "";
    // document.querySelector('#wholeSalePrice').value = "";
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

const ShowAddVehicleStepSix = () => {
    const addVehicleStepSix = document.querySelector('.addVehicleStepSix');
    const addVehicleStepFive = document.querySelector('.addVehicleStepFive');
    addVehicleStepSix.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepFive.style = "display:none;";
}

const AddedSuccessful = () => {
    const vehicleAdded = document.querySelector('.vehicleAdded');
    const addVehicleStepSix = document.querySelector('.addVehicleStepSix');
    vehicleAdded.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepSix.style = "display:none;";
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


const addFrontBumperImage = () =>{
    if($('#frontBumperDescription').val()!=""){
        const fileBtn = document.querySelector(`#frontBumper-photos-input`);
        fileBtn.click();
    }else{
        alert('Please Enter Description!')
    }
}

const uploadFrontBumperImage = () =>{
    const uploadBtn = document.querySelector(`#uploadFrontBumperBtn`);
    uploadBtn.click();
}


const addRearBumperImage = () =>{
    if($('#rearBumperDescription').val()!=""){
        const fileBtn = document.querySelector(`#rearBumper-photos-input`);
        fileBtn.click();
    }else{
        alert('Please Enter Description!')
    }
}

const uploadRearBumperImage = () =>{
    const uploadBtn = document.querySelector(`#uploadrearBumperBtn`);
    uploadBtn.click();
}


const addHoodImage = () =>{
    if($('#hoodDescription').val()!=""){
        const fileBtn = document.querySelector(`#hood-photos-input`);
        fileBtn.click();
    }else{
        alert('Please Enter Description!')
    }
}

const uploadHoodImage = () =>{
    const uploadBtn = document.querySelector(`#uploadHoodBtn`);
    uploadBtn.click();
}

const addSideSkirtImage = () =>{
    if($('#sideSkirtDescription').val()!=""){
        const fileBtn = document.querySelector(`#sideSkirt-photos-input`);
        fileBtn.click();
    }else{
        alert('Please Enter Description!')
    }
}

const uploadSideSkirtImage = () =>{
    const uploadBtn = document.querySelector(`#uploadSideSkirtBtn`);
    uploadBtn.click();
}

const addQuarterPanelImage = () =>{
    if($('#quarterPanelDescription').val()!=""){
        const fileBtn = document.querySelector(`#quarterPanel-photos-input`);
        fileBtn.click();
    }else{
        alert('Please Enter Description!')
    }
}

const uploadQuarterPanelImage = () =>{
    const uploadBtn = document.querySelector(`#uploadQuarterPanelBtn`);
    uploadBtn.click();
}


var frontBumperDropDown = 0;
function showFrontBumperContainer(){
    resetContainers();
    if(frontBumperDropDown ==0){
        document.querySelector("#frontBumperContainer").classList = "detailsContainer frontBumperContainerShow";
        document.querySelector(".frontBumper i").style = "transform:rotate(180deg); transition:0.5s;";
        frontBumperDropDown ++;
    }else{
        frontBumperDropDown = 0;
        document.querySelector("#frontBumperContainer").classList = "detailsContainer frontBumperContainerHide";
        document.querySelector(".frontBumper i").style = "transform:rotate(0deg); transition:0.5s;";
    }
}

var rearBumperDropDown = 0;
function showRearBumperContainer(){
    resetContainers();
    if(rearBumperDropDown ==0){
        document.querySelector("#rearBumperContainer").classList = "detailsContainer rearBumperContainerShow";
        document.querySelector(".rearBumper i").style = "transform:rotate(180deg); transition:0.5s;";
        rearBumperDropDown ++;
    }else{
        rearBumperDropDown = 0;
        document.querySelector("#rearBumperContainer").classList = "detailsContainer rearBumperContainerHide";
        document.querySelector(".rearBumper i").style = "transform:rotate(0deg); transition:0.5s;";
    }
}

var sideSkirtDropDown = 0;
function showSideSkirtContainer(){
    resetContainers();
    if(sideSkirtDropDown ==0){
        document.querySelector("#sideSkirtContainer").classList = "detailsContainer sideSkirtContainerShow";
        document.querySelector(".sideSkirt i").style = "transform:rotate(180deg); transition:0.5s;";
        sideSkirtDropDown ++;
    }else{
        sideSkirtDropDown = 0;
        document.querySelector("#sideSkirtContainer").classList = "detailsContainer sideSkirtContainerHide";
        document.querySelector(".sideSkirt i").style = "transform:rotate(0deg); transition:0.5s;";
    }
}

var hoodDropDown = 0;
function showHoodContainer(){
    resetContainers();
    if(hoodDropDown ==0){
        document.querySelector("#hoodContainer").classList = "detailsContainer hoodContainerShow";
        document.querySelector(".hood i").style = "transform:rotate(180deg); transition:0.5s;";
        hoodDropDown ++;
    }else{
        hoodDropDown = 0;
        document.querySelector("#hoodContainer").classList = "detailsContainer hoodContainerHide";
        document.querySelector(".hood i").style = "transform:rotate(0deg); transition:0.5s;";
    }
}

var quarterPanelDropDown = 0;
function showQuarterPanelContainer(){
    resetContainers();
    if(quarterPanelDropDown ==0){
        document.querySelector("#quarterPanelContainer").classList = "detailsContainer quarterPanelContainerShow";
        document.querySelector(".quarterPanel i").style = "transform:rotate(180deg); transition:0.5s;";
        quarterPanelDropDown ++;
    }else{
        quarterPanelDropDown = 0;
        document.querySelector("#quarterPanelContainer").classList = "detailsContainer quarterPanelContainerHide";
        document.querySelector(".quarterPanel i").style = "transform:rotate(0deg); transition:0.5s;";
    }
}

function resetContainers(){
    document.querySelector("#frontBumperContainer").classList = "detailsContainer frontBumperContainerHide";
    document.querySelector("#rearBumperContainer").classList = "detailsContainer rearBumperContainerHide";
    document.querySelector("#sideSkirtContainer").classList = "detailsContainer sideSkirtContainerHide";
    document.querySelector("#hoodContainer").classList = "detailsContainer hoodContainerHide";
    document.querySelector("#quarterPanelContainer").classList = "detailsContainer quarterPanelContainerHide";


    document.querySelector(".frontBumper i").style = "transform:rotate(0deg); transition:0.5s;";
    document.querySelector(".rearBumper i").style = "transform:rotate(0deg); transition:0.5s;";
    document.querySelector(".hood i").style = "transform:rotate(0deg); transition:0.5s;";
    document.querySelector(".sideSkirt i").style = "transform:rotate(0deg); transition:0.5s;";
    document.querySelector(".quarterPanel i").style = "transform:rotate(0deg); transition:0.5s;";

}