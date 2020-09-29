// MAIN MENU

var toggle="off";
const sideMenu = document.querySelector('.sideMenu');
const menuBtn = document.querySelector('.menuBtn');
const closeMenuBtn = document.querySelector('.closeMenuBtn');

const slideMenu = () => {
    
    if(toggle=="off"){
        sideMenu.style = "top:50px;transition:0.5s ease-out;";
        menuBtn.style = "opacity:0;transform:rotate(180deg); transition:0.5s;";
        closeMenuBtn.style = "opacity:1;transform:rotate(0deg); transition:0.5s;";
        toggle="on";
    }else{
        sideMenu.style = "top:-300px;transition:0.5s ease-in;";
        menuBtn.style = "opacity:1;transform:rotate(0deg); transition:0.5s;";
        closeMenuBtn.style = "opacity:0;transform:rotate(-180deg); transition:0.5s;";
        toggle="off";
    }
};


// SUBMENU DROPDOWN
// Shop
var shopToggle = "off";
const shopSubMenuList = document.querySelector('.shopSubMenuList');
const shopDropMenuBtn = document.querySelector('.shopDropMenuBtn');

const shopSubMenu = () => {
    if(shopToggle=="off"){
        shopSubMenuList.style = "height:80px; padding:10px 0; opacity:1; transition:0.5s ease-out;";
        shopDropMenuBtn.style = "transform:rotateX(180deg); transition:0.5s;";
        shopToggle="on";
    }else{
        shopSubMenuList.style = "height:0px; padding:0px; opacity:0; transition:0.5s ease-out;";
        shopDropMenuBtn.style = "transform:rotateX(0deg); transition:0.5s;";
        shopToggle="off";
    }
};

// Accounts
var accountToggle = "off";
const accountSubMenuList = document.querySelector('.accountSubMenuList');
const accountDropMenuBtn = document.querySelector('.accountDropMenuBtn');

const accountSubMenu = () => {
    if(accountToggle=="off"){
        accountSubMenuList.style = "height:80px; padding:10px 0; opacity:1; transition:0.5s ease-out;";
        accountDropMenuBtn.style = "transform:rotateX(180deg); transition:0.5s;";
        accountToggle="on";
    }else{
        accountSubMenuList.style = "height:0px; padding:0px; opacity:0; transition:0.5s ease-out;";
        accountDropMenuBtn.style = "transform:rotateX(0deg); transition:0.5s;";
        accountToggle="off";
    }
};

