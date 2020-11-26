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
const addVehicleStepSeven = document.querySelector('.addVehicleStepSeven');
const addVehicleStepEight = document.querySelector('.addVehicleStepEight');
const addVehicleStepNine = document.querySelector('.addVehicleStepNine');
const vehicleAdded = document.querySelector('.vehicleAdded');
var addVehicleStepCount = 1;

const goToStepOne = () => {
    const addVehicleStepTwo = document.querySelector('.addVehicleStepTwo');
    addVehicleStepTwo.style = "display:Flex; opacity:0; transition:0.5s;";
    setTimeout(ShowAddVehicleStepOne, 600);
}

const ShowAddVehicleStepOne = () => {
    const addVehicleStepOne = document.querySelector('.addVehicleStepOne');
    const addVehicleStepTwo = document.querySelector('.addVehicleStepTwo');
    addVehicleStepOne.style = "display:Flex; opacity:0;";
    addVehicleStepTwo.style = "display:none;";
    document.querySelector('#vinNum').value = "";
    setTimeout(FadeVehicleStepOne, 10);
    addVehicleStepCount = 1;
}
const FadeVehicleStepOne = () => {
    const addVehicleStepOne = document.querySelector('.addVehicleStepOne');
    addVehicleStepOne.style = "opacity:1; transition:0.5s;";
}


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
        const addVehicleStepSeven = document.querySelector('.addVehicleStepSeven');
        addVehicleStepSix.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepSeven.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepSeven, 600);
    }
    else if(addVehicleStepCount == 7){
        const addVehicleStepSeven = document.querySelector('.addVehicleStepSeven');
        const addVehicleStepEight = document.querySelector('.addVehicleStepEight');
        addVehicleStepSeven.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepEight.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepEight, 600);
    }
    else if(addVehicleStepCount == 8){
        const addVehicleStepEight = document.querySelector('.addVehicleStepEight');
        const addVehicleStepNine = document.querySelector('.addVehicleStepNine');
        addVehicleStepEight.style = "display:Flex; opacity:0; transition:0.5s;";
        addVehicleStepNine.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(ShowAddVehicleStepNine, 600);
    }
    else if(addVehicleStepCount == 9){
        const addVehicleStepNine = document.querySelector('.addVehicleStepNine');
        const vehicleAdded = document.querySelector('.vehicleAdded');
        addVehicleStepNine.style = "display:Flex; opacity:0; transition:0.5s;";
        vehicleAdded.style = "display:Flex;";
        addVehicleStepCount++;
        setTimeout(AddedSuccessful, 600);
    }
    else if(addVehicleStepCount == 10){
        const vehicleAdded = document.querySelector('.vehicleAdded');
        vehicleAdded.style = "display:Flex; opacity:0; transition:0.5s;";
        setTimeout(AddingDone, 600);
    }
};

const AfterReferralFee = () => {
    const referralFee = document.querySelector('.referralFee');
    const vehicleAdded = document.querySelector('.vehicleAdded');
    referralFee.style = "display:Flex; opacity:0; transition:0.5s;";
    vehicleAdded.style = "display:Flex;";
    addVehicleStepCount++;
    
    setTimeout(AddingSuccess, 600);
}

const AddingSuccess = () => {
    const vehicleAdded = document.querySelector('.vehicleAdded');
    const referralFee = document.querySelector('.referralFee');
    vehicleAdded.style = "display:Flex; opacity:1; transition:0.5s;";
    referralFee.style = "display:none;";
}

const EnterRetailPrice = () => {
    const addVehicleStepNine = document.querySelector('.addVehicleStepNine');
    const RetailPrice = document.querySelector('.RetailPrice');
    addVehicleStepNine.style = "display:Flex; opacity:0; transition:0.5s;";
    RetailPrice.style = "display:Flex; opacity:0;";
    setTimeout(ShowRetailPrice, 600);
}

function calculate(){
    var minPrice = Number($("#minPrice").val());
    var maxPrice = Number($("#maxPrice").val());
    var referralFee = (maxPrice - minPrice) * 0.25;

    var html = "$ "+ referralFee;

    $(".calculatedReferralFee").empty;
    $(".calculatedReferralFee").append(html);
}



const ShowRetailPrice = () => {
    const RetailPrice = document.querySelector('.RetailPrice');
    const addVehicleStepNine = document.querySelector('.addVehicleStepNine');
    RetailPrice.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepNine.style = "display:none;";
}

const referralFee = () => {
    const RetailPrice = document.querySelector('.RetailPrice');
    const referralFee = document.querySelector('.referralFee');
    RetailPrice.style = "display:Flex; opacity:0; transition:0.5s;";
    referralFee.style = "display:Flex;";
    setTimeout(ShowReferralFee, 600);
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

const ShowAddVehicleStepSeven = () => {
    const addVehicleStepSeven = document.querySelector('.addVehicleStepSeven');
    const addVehicleStepSix = document.querySelector('.addVehicleStepSix');
    addVehicleStepSeven.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepSix.style = "display:none;";
}

const ShowAddVehicleStepEight = () => {
    const addVehicleStepEight = document.querySelector('.addVehicleStepEight');
    const addVehicleStepSeven = document.querySelector('.addVehicleStepSeven');
    addVehicleStepEight.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepSeven.style = "display:none;";
}

const ShowAddVehicleStepNine = () => {
    const addVehicleStepNine = document.querySelector('.addVehicleStepNine');
    const addVehicleStepEight = document.querySelector('.addVehicleStepEight');
    addVehicleStepNine.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepEight.style = "display:none;";
}



const ShowReferralFee = () => {
    const referralFee = document.querySelector('.referralFee');
    const RetailPrice = document.querySelector('.RetailPrice');
    referralFee.style = "display:Flex; opacity:1; transition:0.5s;";
    RetailPrice.style = "display:none;";
    calculate();
}

const AddedSuccessful = () => {
    const vehicleAdded = document.querySelector('.vehicleAdded');
    const addVehicleStepNine = document.querySelector('.addVehicleStepNine');
    vehicleAdded.style = "display:Flex; opacity:1; transition:0.5s;";
    addVehicleStepNine.style = "display:none;";
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

const addCarDocumentsImage = () =>{
        const fileBtn = document.querySelector(`#carDocuments-photos-input`);
        fileBtn.click();
}

const uploadCarDocumentsImage = () =>{
    const uploadBtn = document.querySelector(`#uploadCarDocumentsBtn`);
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