var registrationStepCount=1;
const stepOneRegistration = document.querySelector('.stepOneRegistration');
const stepTwoRegistration = document.querySelector('.stepTwoRegistration');
const stepThreeRegistration = document.querySelector('.stepThreeRegistration');
const stepOneBtn = document.querySelector('.stepOneBtn');
const stepTwoBtn = document.querySelector('.stepTwoBtn');
const stepTwoBackBtn = document.querySelector('.stepTwoBackBtn');
const stepThreeBtn = document.querySelector('.stepThreeBtn');
const stepThreeBackBtn = document.querySelector('.stepThreeBackBtn');
const stepOne = document.querySelector('.stepOne');
const stepTwo = document.querySelector('.stepTwo');
const stepThree = document.querySelector('.stepThree');

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
    }
};

const stepReset = () => {
    stepOne.style = "background:#ffffff00; transition:0.5s;";
    stepTwo.style = "background:#ffffff00; transition:0.5s;";
    stepThree.style = "background:#ffffff00; transition:0.5s;";
}