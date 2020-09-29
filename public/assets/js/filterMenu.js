var toggleFilter="off";
const filterMenu = document.querySelector('.filterSettings');
const filterBtn = document.querySelector('.filterBtn');

const slideFilterMenu = () => {
    
    if(toggleFilter=="off"){
        filterMenu.style = "width:100vw;overflow:hidden;right:0px;transition:0.5s ease-out;";
        toggleFilter="on";
    }else{
        filterMenu.style = "width:0vw;overflow:hidden;right:-430px;transition:0.5s ease-out;";
        toggleFilter="off";
    }

    // When Click Outside the Filter Settings 
    var except = document.querySelector('.filterSettingContainer');
    filterMenu.addEventListener("click", function () {
        filterMenu.style = "width:0vw;overflow:hidden;right:-430px;transition:0.5s ease-out;";
        toggleFilter="off";
    }, false);
    except.addEventListener("click", function (ev) {
        ev.stopPropagation(); 
    }, false);

};