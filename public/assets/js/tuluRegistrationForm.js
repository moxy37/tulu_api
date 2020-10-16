var registrationStepCount=1;
const stepOneRegistration = document.querySelector('.stepOneRegistration');
const stepTwoRegistration = document.querySelector('.stepTwoRegistration');
const stepThreeRegistration = document.querySelector('.stepThreeRegistration');
const stepFourRegistration = document.querySelector('.stepFourRegistration');
const stepOneBtn = document.querySelector('.stepOneBtn');
const stepTwoBtn = document.querySelector('.stepTwoBtn');
const stepThreeBtn = document.querySelector('.stepThreeBtn');
const stepFourBtn = document.querySelector('.stepFourBtn');
const stepTwoBackBtn = document.querySelector('.stepTwoBackBtn');
const stepThreeBackBtn = document.querySelector('.stepThreeBackBtn');
const stepFourBackBtn = document.querySelector('.stepFourBackBtn');
const stepOne = document.querySelector('.stepOne');
const stepTwo = document.querySelector('.stepTwo');
const stepThree = document.querySelector('.stepThree');
const stepFour = document.querySelector('.stepFour');

const registrationStep = () => {
    
    if(registrationStepCount==1){
        stepOneRegistration.style = "transform: translateX(-100vw);transition:0.5s ease-out;";
        stepTwoRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepReset();
        stepTwo.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount++;
    }else if(registrationStepCount==2){
        stepTwoRegistration.style = "transform: translateX(-100vw);transition:0.5s ease-out;";
        stepThreeRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepReset();
        stepThree.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount++;
    }else if(registrationStepCount==3){
        stepThreeRegistration.style = "transform: translateX(-100vw);transition:0.5s ease-out;";
        stepFourRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepReset();
        stepFour.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount++;
    }
};

const registrationStepBack = () => {
    if(registrationStepCount==2){
        stepOneRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepTwoRegistration.style = "transform: translateX(100vw);transition:0.5s ease-out;";
        stepReset();
        stepOne.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount--;
    }else if(registrationStepCount==3){
        stepTwoRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepThreeRegistration.style = "transform: translateX(100vw);transition:0.5s ease-out;";
        stepReset();
        stepTwo.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount--;
    }else if(registrationStepCount==4){
        stepThreeRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepFourRegistration.style = "transform: translateX(100vw);transition:0.5s ease-out;";
        stepReset();
        stepThree.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount--;
    }
};

const stepReset = () => {
    stepOne.style = "background:#ffffff00; transition:0.5s;";
    stepTwo.style = "background:#ffffff00; transition:0.5s;";
    stepThree.style = "background:#ffffff00; transition:0.5s;";
    stepFour.style = "background:#ffffff00; transition:0.5s;";
}