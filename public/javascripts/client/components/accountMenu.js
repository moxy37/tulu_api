

function LoadMyAccountMenu() {
	var html = '';		
	html=html+'<ul class="accountMenuList">';
	html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/profile">';
    html=html+'            <i class="far fa-user fa-2x accountMenuIcon"></i>';
    html=html+'            Profile';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/">';
    html=html+'            <i class="fas fa-columns fa-2x accountMenuIcon"></i>';
    html=html+'            Dashboard';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/schedule">';
    html=html+'            <i class="far fa-calendar-alt fa-2x accountMenuIcon"></i>';
    html=html+'            Schedule';
    html=html+'        </a>';
    html=html+'    </li>';
    html=html+'    <li class="accountMenuListItems">';
    html=html+'        <a href="/">';
    html=html+'            <i class="fas fa-phone fa-2x accountMenuIcon"></i>';
    html=html+'            Contact Us';
    html=html+'        </a>';
    html=html+'    </li>';
	html=html+'</ul>';	
	
	$("#MyAccountMenu").empty();	
	$("#MyAccountMenu").append(html);

}
LoadMyAccountMenu()
