var toggleSetting="off";


const listingSettings = () => {
    const listingSettingsContainer = document.querySelector('.listingSettingsContainer');
    if(toggleSetting=="off"){
        listingSettingsContainer.style = "bottom:0vh; opacity:1;transition:0.5s ease-out;";
        toggleSetting="on";
    }else{
        listingSettingsContainer.style = "bottom:-100vh; opacity:0;transition:0.5s ease-in;";
        toggleSetting="off";
    }

    // When Click Outside the Filter Settings 
    var except = document.querySelector('.listingSettingsList');
    listingSettingsContainer.addEventListener("click", function () {
        listingSettingsContainer.style = "bottom:-100vh; opacity:0;transition:0.5s ease-in;";
        toggleSetting="off";
    }, false);
    except.addEventListener("click", function (ev) {
        ev.stopPropagation(); 
    }, false);

};