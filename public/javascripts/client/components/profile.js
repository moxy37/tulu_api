function LoadProfile() {
	var html = '';
	
    html=html+'<div class="banner">';
    html=html+'</div>';
    html=html+'<div class="userInfo">';
    html=html+'    <div class="userImage">';
    html=html+'        <i class="fas fa-user fa-4x"></i>';
    html=html+'    </div>';
    html=html+'    <h3 class="userName">';
    html=html+'        John Doe';
    html=html+'    </h3>';
    html=html+'    <p class="userBio">';
    html=html+'        Sabhihin mo sa ating mga kababayan na hindi na kakamit ang kalayaan sa pag-aaruga sa kanilang mga mahal sa buhay. Kailangan nila mag bayad ng Dugo at pawis. Kailangan nilang tumalon sa kawalan.<br/>';
    html=html+'        -Heneral Luna';
    html=html+'    </p>';
    html=html+'    <ul class="socialMediaAccounts">';
    html=html+'        <li>';
    html=html+'            <a href="/">';
    html=html+'                <i class="fab fa-facebook fa-2x"></i>';
    html=html+'            </a>';
    html=html+'        </li>';
    html=html+'        <li>';
    html=html+'            <a href="/">';
    html=html+'                <i class="fab fa-instagram fa-2x"></i>';
    html=html+'            </a>';
    html=html+'        </li>';
    html=html+'        <li>';
    html=html+'            <a href="/">';
    html=html+'                <i class="fab fa-linkedin-in fa-2x"></i>';
    html=html+'            </a>';
    html=html+'        </li>';
    html=html+'    </ul>';
    html=html+'    <a onclic="goToEditProfile()">';
    html=html+'        <button class="editProfileBtn">';
    html=html+'            Edit Profile';
    html=html+'        </button>';
    html=html+'    </a>';
    html=html+'</div>';

	$("#Header").empty();
	$("#Header").append(html);

}


function LoadMyAccountMenu() {
	var html = '';
	
    html=html+'<ul class="accountMenuList">';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a onclick="goToProfile()">';
    html=html+'            <i class="far fa-user fa-2x accountMenuIcon"></i>';
    html=html+'            Profile';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a onclick="goToMessages()">';
    html=html+'            <i class="far fa-envelope fa-2x accountMenuIcon"></i>';
    html=html+'            Messages';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a onclick="goToShop()">';
    html=html+'            <i class="fas fa-car fa-2x accountMenuIcon"></i>';
    html=html+'            Vehicles';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/">';
    html=html+'            <i class="far fa-calendar-alt fa-2x accountMenuIcon"></i>';
    html=html+'            Appointments';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a onclick="goToInfluencer()">';
    html=html+'            <i class="far fa-handshake fa-2x accountMenuIcon"></i>';
    html=html+'            My Influencer';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/">';
    html=html+'            <i class="far fa-credit-card fa-2x accountMenuIcon"></i>';
    html=html+'            Coupons';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'</ul>';

	$("#MyAccountMenu").empty();
	$("#MyAccountMenu").append(html);

}

function goToEditProfile(){
    LocationChange('editProfile');
}

function goToInfluencer(){
    LocationChange('influencer');
}

function goToMessages(){
    LocationChange('messages');
}

function goToShop(){
    LocationChange('shop');
}

function goToProfile(){
    LocationChange('profile');
}