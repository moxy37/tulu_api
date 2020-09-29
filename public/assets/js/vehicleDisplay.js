var toggleDisplay="off";
var numberOfCars = document.querySelector(".vehicleList").childElementCount;
const vehicleList = document.querySelector('.vehicleList');
const displayBtn = document.querySelector(".gridDisplayBtn");
const vehicleDisplay = () => {
    
    if(toggleDisplay=="off"){
        for(x=1;x<=numberOfCars;x++){
            const carImage = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+')  .carImage');
            carImage.style = "width:150px;  transition:0.5s;"
        }
        displayBtn.style = "transform:rotate(360deg); transition:0.5s;";
        displayBtn.classList.remove("fa-th-large");
        displayBtn.classList.add("fa-list-ul");
        vehicleList.style="flex-direction: row; flex-wrap:wrap; justify-content:space-around;"
        toggleDisplay="on";
    }else{
        for(x=1;x<=numberOfCars;x++){
            const carImage = document.querySelector('.vehicleList .vehicleListItems:nth-child('+x+')  .carImage');
            carImage.style = "width:300px;transition:0.5s;"
        }
        displayBtn.style = "transform:rotate(0deg); transition:0.5s;";
        displayBtn.classList.remove("fa-list-ul");
        displayBtn.classList.add("fa-th-large");
        vehicleList.style="flex-direction: column; flex-wrap:no-wrap; justify-content:none;";
        toggleDisplay="off";
    }
};