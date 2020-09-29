const body = document.querySelector("body");
const logo = document.querySelector(".logo");
const button = document.querySelector("button");

function startUp(){
    body.style = "background:#1A2A33; transition:1.2s;";
    logo.style = "opacity:1;transform:scale(1.03);filter: drop-shadow(0 0 10px #ffffff); transition:1.5s;";
    button.style = "opacity:1;  transition:1.5s;";
    setTimeout(breathingLight, 1000);
}

function breathingLight() {
    logo.style = "opacity:0.98;transform:scale(1); filter: drop-shadow(0 0 8px #ffffff); transition:1.5s;";
    setTimeout(startUp, 1000);
}