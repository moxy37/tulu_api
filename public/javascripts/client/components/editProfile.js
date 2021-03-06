function LoadProfile() {
	var html = '';
	html=html+'<div class="banner">';
    html=html+'</div>';
    html=html+'<div class="userInfo">';
    html=html+'    <div class="userImage" id="userImage" onclick="$(`#photos-input`).click()">';
    html=html+'        <i class="fas fa-user fa-4x" id="userIcon"></i>';
    html=html+'        <i class="fas fa-plus"></i>';
    html=html+'    </div>';
    html = html + '<form id="upload-photos" method="post" action="/api/file/upload" enctype="multipart/form-data">';
    html = html + '		<div class="form-group" style="display:none;">';
    html = html + '			<label for="photos-input">Load Image</label>';
    html = html + '			<input id="photos-input" type="file" name="photos[]" onchange="uploadImage()" multiple="multiple" accept="image/*" capture />';
    html = html + '		<input class="btn btn-default" id="uploadBtn" style="display:none;" type="submit" name="Photo Uploads" value="Upload" />';
    html = html + '		</div>';
    html = html + '<div id="thumbnailContainer">';
    html = html + '	</div>';
    html = html + '		<input type="hidden" name="csrf_token" value="just_a_text_field" />';
    html = html + '     <button type="button" class="addImageBtn" onclick="addImage()">ADD PHOTOS</button>';
    html = html + '	</form>';
    html=html+'    <div action="" class="editForm">';
    html=html+'        <label for="email">Email:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="email" class="email" name="email" value="email"><br>';
    html=html+'        </div>';
    html=html+'        <label for="password">New Password:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="password" id="password" class="password" name="password">';
    html=html+'        </div>  ';
    html=html+'        <label for="confirmPassword">Confirm Password:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="password" id="confirmPassword" class="confirmPassword" name="confirmPassword">';
    html=html+'        </div>';
    html=html+'        <label for="name">Name:</label>';
    html=html+'        <div class="inputContainer">';
    html=html+'            <input type="text" id="name" class="name" name="name"><br>';
    html=html+'        </div>';
    html=html+'        <label for="address">Address:</label>';
    html=html+'        <div class="addressContainer" id="addressContainer">';
    html=html+'            <p class="address"></p>';
    html=html+'            <i class="fas fa-times"></i>';
    html=html+'        </div>';
    html=html+'        <div class="addAddress">';
    html=html+'            <label for="street">Street:</label>';
    html=html+'           <div class="inputContainer">';
    html=html+'               <input type="text" id="street" class="street" name="street"><br>';
    html=html+'           </div>';
    html=html+'           <label for="city">City:</label>';
    html=html+'           <div class="inputContainer">';
    html=html+'               <input type="text" id="city" class="city" name="city"><br>';
    html=html+'           </div>';
    html=html+'           <label for="province">Province:</label>';
    html=html+'           <div class="inputContainer">';
    html=html+'               <input type="text" id="province" class="province" name="province"><br>';
    html=html+'           </div>';
    html=html+'           <label for="postalCode">Postal Code:</label>';
    html=html+'           <div class="inputContainer">';
    html=html+'               <input type="text" id="postalCode" class="postalCode" name="postalCode"><br>';
    html=html+'           </div>';
    html=html+'           <button class="saveEditBtn" onclick="AddNewAddress()">';
    html=html+'               Add Address';
    html=html+'           </button>';
    // html=html+'               <i class="fas fa-plus" onclick="AddNewAddress()"></i>';
    html=html+'        </div>';
    html=html+'        <label for="phone">Phone Number:</label>';
    html=html+'        <div class="phoneContainer" id="phoneContainer">';
    html=html+'            <p class="phoneNumber"></p>';
    html=html+'            <i class="fas fa-times"></i>';
    html=html+'        </div>';
    html=html+'        <div class="addPhone">';
    html=html+'            <label for="phone">Add Phone Number:</label>';
    html=html+'           <div class="inputContainer">';
    html=html+'               <input type="text" id="phone" class="phone" name="phone"><br>';
    html=html+'           </div>';
    html=html+'           <button class="saveEditBtn" onclick="AddNewPhone()">';
    html=html+'               Add Phone';
    html=html+'           </button>';
    html=html+'        </div>';
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
    html=html+'        <button class="saveEditBtn" onclick="SaveChanges()">';
    html=html+'            Save Changes';
    html=html+'        </button>';
    html=html+'        <button class="cancelEditBtn" onclick="cancelChanges()">';
    html=html+'            Cancel';
    html=html+'        </button>';
    html=html+'    </div>';
    html=html+'    ';
    html=html+'    ';
    html=html+'</div>';

	$("#Header").empty();
	$("#Header").append(html);

}
LoadProfile();


