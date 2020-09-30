function LoadRegistration() {
	var html = '';
	html=html+'<div class="stepOneRegistration">';
    html=html+'    <form action="" class="registerForm">';
    html=html+'        <label for="email">Email:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="email" class="email" name="email"><br>';
    html=html+'        </div>';
    html=html+'        <label for="password">Password:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="password" id="password" class="password" name="password">';
    html=html+'        </div>  ';
    html=html+'        <label for="confirmPassword">Confirm Password:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="password" id="confirmPassword" class="confirmPassword" name="confirmPassword">';
    html=html+'        </div>';
    html=html+'        <button type="button" class="nextBtn stepOneBtn" onclick="registrationStep()">CONTINUE</button>';
    html=html+'    </form>';
    html=html+'</div>';
    html=html+'<div class="stepTwoRegistration">';
    html=html+'    <form action="" class="registerForm">';
    html=html+'        <label for="fname">First Name:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="fname" class="fname" name="fname"><br>';
    html=html+'        </div>';
    html=html+'        <label for="lname">Last Name:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="lname" class="lname" name="lname"><br>';
    html=html+'        </div>';
    html=html+'        <label for="postalCode">Postal Code:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="postalCode" class="postalCode" name="postalCode"><br>';
    html=html+'        </div>';
    html=html+'        <label for="phone">Phone Number:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="phone" class="phone" name="phone"><br>';
    html=html+'        </div>';
    html=html+'        <button type="button" class="nextBtn stepTwoBtn" onclick="registrationStep()">NEXT</button>';
    html=html+'        <button type="button" class="backBtn stepTwoBackBtn" onclick="registrationStepBack()">BACK</button>';
    html=html+'    </form>';
    html=html+'</div>';
    html=html+'<div class="stepThreeRegistration">';
    html=html+'    <form action="" class="registerForm">';
    html=html+'        <label for="ig">Instagram:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="ig" class="ig" name="ig"><br>';
    html=html+'        </div>';
    html=html+'        <label for="fb">Facebook:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="fb" class="fb" name="fb"><br>';
    html=html+'        </div>';
    html=html+'        <label for="linkedIn">LinkedIn:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="linkedIn" class="linkedIn" name="linkedIn"><br>';
    html=html+'        </div>';
    html=html+'        <label for="bio">Bio:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <textarea type="text" id="bio" class="bio" name="bio"></textarea>';
    html=html+'        </div>';
    html=html+'        <a href="/profile">';
    html=html+'            <button type="button" class="registerBtn stepThreeBtn" onclick="registrationStep()">COMPLETE</button>';
    html=html+'        </a>';
    html=html+'            <button type="button" class="backBtn stepThreeBackBtn" onclick="registrationStepBack()">BACK</button>';
    html=html+'    </form>';
    html=html+'</div>';
  
	$("#registerContainer").empty();
	$("#registerContainer").append(html);
}

LoadRegistration()

function LoadStepCircles() {
	var html = '';
	html=html+'<div class="stepOne"></div>';
    html=html+'    <div class="stepTwo"></div>';
    html=html+'<div class="stepThree"></div>';
  
	$("#Steps").empty();
	$("#Steps").append(html);
}

LoadStepCircles()

