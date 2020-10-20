var registrationStepCount=1;


const registrationStep = () => {
    const stepOneRegistration = document.querySelector('.stepOneRegistration');
    const stepTwoRegistration = document.querySelector('.stepTwoRegistration');
    const stepThreeRegistration = document.querySelector('.stepThreeRegistration');
    const stepTwo = document.querySelector('.stepTwo');
    const stepThree = document.querySelector('.stepThree');

    const stepFour = document.querySelector('.stepFour');
    const stepFourRegistration = document.querySelector('.stepFourRegistration');
    const stepFive = document.querySelector('.stepFive');
    const stepFiveRegistration = document.querySelector('.stepFiveRegistration');
    const stepSix = document.querySelector('.stepSix');
    const stepSixRegistration = document.querySelector('.stepSixRegistration');
    
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
    }else if(registrationStepCount==4){
        stepFourRegistration.style = "transform: translateX(-100vw);transition:0.5s ease-out;";
        stepFiveRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepReset();
        stepFive.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount++;
    }else if(registrationStepCount==5){
        stepFiveRegistration.style = "transform: translateX(-100vw);transition:0.5s ease-out;";
        stepSixRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepReset();
        stepSix.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount++;
    }else if(registrationStepCount==6){
        stepSixRegistration.style = "transform: translateX(-100vw);transition:0.5s ease-out;";
        // stepSixRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepOneRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepReset();
        // stepSix.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount==1;
    }
};

const registrationStepBack = () => {
    const stepOneRegistration = document.querySelector('.stepOneRegistration');
const stepTwoRegistration = document.querySelector('.stepTwoRegistration');
const stepThreeRegistration = document.querySelector('.stepThreeRegistration');
const stepFourRegistration = document.querySelector('.stepFourRegistration');
const stepFiveRegistration = document.querySelector('.stepFiveRegistration');
const stepSixRegistration = document.querySelector('.stepSixRegistration');

const stepOne = document.querySelector('.stepOne');
const stepTwo = document.querySelector('.stepTwo');
const stepThree = document.querySelector('.stepThree');
const stepFour = document.querySelector('.stepFour');
const stepFive = document.querySelector('.stepFive');
const stepSix = document.querySelector('.stepSix');
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
    }else if(registrationStepCount==5){
        stepFourRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepFiveRegistration.style = "transform: translateX(100vw);transition:0.5s ease-out;";
        stepReset();
        stepFour.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount--;
    }else if(registrationStepCount==6){
        stepFiveRegistration.style = "transform: translateX(0vw);transition:0.5s ease-out;";
        stepSixRegistration.style = "transform: translateX(100vw);transition:0.5s ease-out;";
        stepReset();
        stepFive.style="background:#79C6AC;transition:0.5s;";
        registrationStepCount--;
    }
};

const stepReset = () => {

const stepOne = document.querySelector('.stepOne');
const stepTwo = document.querySelector('.stepTwo');
const stepThree = document.querySelector('.stepThree');
const stepFour = document.querySelector('.stepFour');
const stepFive = document.querySelector('.stepFive');
    stepOne.style = "background:#ffffff00; transition:0.5s;";
    stepTwo.style = "background:#ffffff00; transition:0.5s;";
    stepThree.style = "background:#ffffff00; transition:0.5s;";
    stepFour.style = "background:#ffffff00; transition:0.5s;";
    stepFive.style = "background:#ffffff00; transition:0.5s;";
}