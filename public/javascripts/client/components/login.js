function LoadLogin() {
	var html = '';
	html=html+'<form action="" class="loginForm">';
    html=html+'    <label for="email">Email:</label>';
    html=html+'    <div class="inputContainer">';
    html=html+'        <input type="text" id="email" class="email" name="email"><br>';
    html=html+'    </div>';
    html=html+'    ';
    html=html+'        <label for="password">Password:</label>';
    html=html+'    <div class="inputContainer">';
    html=html+'        <input type="password" id="password" class="password" name="password">';
    html=html+'    </div>  ';
    html=html+'    <a href="/profile">';
    html=html+'        <button type="button" class="loginBtn">LOG IN</button>';
    html=html+'    </a>';
    html=html+'    <a href="/register">';
    html=html+'        <button type="button" class="registerBtn">REGISTER</button>';
    html=html+'    </a>';
    html=html+'</form>';
  
	$("#LoginContainer").empty();
	$("#LoginContainer").append(html);
}

LoadLogin()
