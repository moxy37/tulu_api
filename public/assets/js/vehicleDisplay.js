var toggleDisplay="off";
var numberOfCars = document.querySelector(".vehicleList").childElementCount;
const vehicleList = document.querySelector('.vehicleList');
const vehicleListItems = document.querySelector('.vehicleListItems');
const displayBtn = document.querySelector(".gridDisplayBtn");
const vehicleDisplay = () => {
    
    if(toggleDisplay=="off"){
        for(x=1;x<=numberOfCars;x++){
            const carImage = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+')  .carImage');
            carImage.style = "width:150px;  transition:0.5s;"
            
            const carList = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+')');
            carList.style = "width:150px;"

            const carName = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+') .carName');
            carName.style = "font-size:large; transition:0.5s;"

            const moreInfo = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+') .moreInfo');
            moreInfo.style = "width:150px; transition:0.5s;"

            const exploreBtn = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+') a .moreInfo');
            exploreBtn.style = "width:150px; transition:0.5s;"
        }
        displayBtn.style = "transform:rotate(360deg); transition:0.5s;";
        displayBtn.classList.remove("fa-th-large");
        displayBtn.classList.add("fa-list-ul");
        vehicleList.style="flex-direction: row; flex-wrap:wrap; justify-content:space-evenly;"
        toggleDisplay="on";
    }else{
        for(x=1;x<=numberOfCars;x++){
            const carImage = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+')  .carImage');
            carImage.style = "width:300px;transition:0.5s;"

            const carList = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+')');
            carList.style = "width:300px;"

            const carName = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+') .carName');
            carName.style = "font-size:default; transition:0.5s;"

            const moreInfo = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+') .moreInfo');
            moreInfo.style = "width:200px; transition:0.5s;"

            const exploreBtn = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+') a .moreInfo');
            exploreBtn.style = "width:200px; transition:0.5s;"
        }
        displayBtn.style = "transform:rotate(0deg); transition:0.5s;";
        displayBtn.classList.remove("fa-list-ul");
        displayBtn.classList.add("fa-th-large");
        vehicleList.style="flex-direction: column; flex-wrap:no-wrap; justify-content:none;";
        toggleDisplay="off";
    }
};