var gVehicle = null;
var uid = '';
var myExt = 'jpg';
var toogle = 'off';


function LoadVendor() {
    var html = '';
    html = html + '<div class="banner"></div>';
    html = html + '<div class="userInfo">';
    html = html + '	<div class="userImage">';
    html = html + '		<i class="fas fa-user fa-4x"></i>';
    html = html + '	</div>';
    html = html + '	<h3 class="userName">' + gUser.name + '</h3>';
    html = html + '	<p class="userActiveListingCount"><span></span>&nbsp Active Listing</p>';
    html = html + '</div>';

    $("#VendorHeader").empty();
    $("#VendorHeader").append(html);

}


function MakeNewVehicle() {
    var vin = $("#vinNum").val();
    var dealerId = 'dfb56be7-15ef-11eb-83a2-e86a647a411d';
    NewVehicle(vin, dealerId).then(function (vehicle) {
        // alert(JSON.stringify(vehicle));
        gVehicle = vehicle;
        LoadVehicleInfo(vehicle);
        AddVehicleStep();
    });
}


function LoadVehicleInfo(results) {
    var html = '';
    html = html + ' <section class="vinInfo">';
    html = html + ' <ul class="vinInfoList">';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Year</p>';
    html = html + '         <p>' + results.year + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Make</p>';
    html = html + '         <p>' + results.make + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Model</p>';
    html = html + '         <p>' + results.model + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Color</p>';
    html = html + '         <p>' + results.colorName + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Body Type</p>';
    html = html + '         <p>' + results.bodyType + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Engine</p>';
    html = html + '         <p>' + results.engineName + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>DriveTrain</p>';
    html = html + '         <p>' + results.driveType + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Transmission</p>';
    html = html + '         <p>' + results.transmissionName + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Fuel Type</p>';
    html = html + '         <p>' + results.fuelType + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + '     <li class="vinInfoListItems">';
    html = html + '         <p>Trim</p>';
    html = html + '         <p>' + results.trim + '</p>';
    html = html + '         <i class="fas fa-times"></i>';
    html = html + '     </li>';
    html = html + ' </ul>';
    html = html + '        <button type="button" class="nextBtn" onclick="AddVehicleStep()">NEXT</button>';
    html = html + ' </section>';

    $("#addVehicleStepTwo").empty();
    $("#addVehicleStepTwo").append(html);
}

function LoadAddPosting() {
    var html = '';
    html = html + '<div class="addPostingBtn"  onclick="AddListingMenu()">';
    html = html + '    <i class="fas fa-plus"></i>';
    html = html + '</div>';
    html = html + '<div class="addVehicleContainer">';
    html = html + '    <div  class="addVehicleForm addVehicleStepOne">';
    html = html + '        <label for="vinNum">VIN # :</label>';
    html = html + '        <div class="inputContainer">';
    html = html + '            <input type="text" id="vinNum" class="vinNum" name="vinNum" value=""><br>';
    html = html + '            <i class="fas fa-camera" onclick="barCodeScanner();"></i>';
    html = html + '        </div>';
    html = html + '        ';
    html = html + '        <button type="button" class="nextBtn" onclick="MakeNewVehicle()">ENTER VIN</button>';
    html = html + '    </div>';
    html = html + '    <div  class="addVehicleForm addVehicleStepTwo" id="addVehicleStepTwo">';
    html = html + '';
    html = html + '    </div>';
    html = html + '    <div class="addVehicleForm addVehicleStepThree" id="addVehicleStepThree">';
    html = html + '			<div class="checkBoxContainer">';
    html = html + '			    <input type="checkbox" name="wholeSalePriceCheckbox" onchange="wholeSalePriceChecked()" />';
    html = html + '			    <label for="wholeSalePriceCheckbox">Add wholesale price</label>';
    html = html + '			</div>';
    html = html + '			<div id="wholeSalePriceContainer" class="hide">';
    html = html + '			    <p>$</p>';
    html = html + '			    <input type="text" id="wholeSalePrice"value="">';
    html = html + '			</div>';
    html = html + '			<div id="maxPriceContainer" class="maxPriceContainer">';
    html = html + '			    <label for="maxPrice">Max Price:</label>';
    html = html + '             <div class="inputContainer">';
    html = html + '                 <i class="fas fa-dollar-sign"></i>';
    html = html + '			        <input type="number" name="maxPrice" class="maxPrice">';
    html = html + '			    </div>';
    html = html + '			</div>';
    html = html + '			<div id="minPriceContainer" class="minPriceContainer">';
    html = html + '			    <label for="maxPrice">Min Price:</label>';
    html = html + '             <div class="inputContainer">';
    html = html + '                 <i class="fas fa-dollar-sign"></i>';
    html = html + '			        <input type="number" name="minPrice" class="minPrice">';
    html = html + '			    </div>';
    html = html + '			</div>';
    html = html + '        <button type="button" class="doneBtn" onclick="AddVehicleStep()">NEXT</button>';
    html = html + '    </div>';
    html = html + '    <div class="addVehicleForm addVehicleStepFour" id="addVehicleStepFour">';
    html = html + '    <div class="carDetails">';
    html = html + '    <p>Car Details :</p>';
    html = html + '    <div class="frontBumper">';
    html = html + '        <p>Front Bumper</p>';
    html = html + '        <i class="fas fa-angle-down" onclick="showFrontBumperContainer()"></i>';
    html = html + '    </div>';
    html = html + '    <div class="detailsContainer frontBumperContainerHide" id="frontBumperContainer">';
    html = html + '        <div class="imageContainer">';
    html = html + '            <div class="addImage">';
    html = html + '                <i class="fas fa-plus"></i>';
    html = html + '            </div>';
    html = html + '        </div>';
    html = html + '        <textarea name="" id="" cols="30" rows="10" style="resize: none;"></textarea>';
    html = html + '    </div>';
    html = html + '    <div class="rearBumper">';
    html = html + '        <p>Rear Bumper</p>';
    html = html + '        <i class="fas fa-angle-down" onclick="showRearBumperContainer()"></i>';
    html = html + '    </div>';
    html = html + '    <div class="detailsContainer rearBumperContainerHide" id="rearBumperContainer">';
    html = html + '        <div class="imageContainer">';
    html = html + '            <div class="addImage">';
    html = html + '                <i class="fas fa-plus"></i>';
    html = html + '            </div>';
    html = html + '        </div>';
    html = html + '        <textarea name="" id="" cols="30" rows="10" style="resize: none;"></textarea>';
    html = html + '    </div>';
    html = html + '    <div class="hood">';
    html = html + '        <p>Hood</p>';
    html = html + '        <i class="fas fa-angle-down" onclick="showHoodContainer()"></i>';
    html = html + '    </div>';
    html = html + '    <div class="detailsContainer hoodContainerHide" id="hoodContainer">';
    html = html + '        <div class="imageContainer">';
    html = html + '            <div class="addImage">';
    html = html + '                <i class="fas fa-plus"></i>';
    html = html + '            </div>';
    html = html + '        </div>';
    html = html + '        <textarea name="" id="" cols="30" rows="10" style="resize: none;"></textarea>';
    html = html + '    </div>';
    html = html + '    <div class="sideSkirt">';
    html = html + '        <p>SideSkirt</p>';
    html = html + '        <i class="fas fa-angle-down" onclick="showSideSkirtContainer()"></i>';
    html = html + '    </div>';
    html = html + '    <div class="detailsContainer sideSkirtContainerHide" id="sideSkirtContainer">';
    html = html + '        <div class="imageContainer">';
    html = html + '            <div class="addImage">';
    html = html + '                <i class="fas fa-plus"></i>';
    html = html + '            </div>';
    html = html + '        </div>';
    html = html + '        <textarea name="" id="" cols="30" rows="10" style="resize: none;"></textarea>';
    html = html + '    </div>';
    html = html + '    <div class="quarterPanel">';
    html = html + '        <p>Quarter Panel</p>';
    html = html + '        <i class="fas fa-angle-down" onclick="showQuarterPanelContainer()"></i>';
    html = html + '    </div>';
    html = html + '    <div class="detailsContainer quarterPanelContainerHide" id="quarterPanelContainer">';
    html = html + '        <div class="imageContainer">';
    html = html + '            <div class="addImage">';
    html = html + '                <i class="fas fa-plus"></i>';
    html = html + '            </div>';
    html = html + '        </div>';
    html = html + '        <textarea name="" id="" cols="30" rows="10" style="resize: none;"></textarea>';
    html = html + '    </div>';
    html = html + '    <button type="button" class="doneBtn" onclick="AddVehicleStep()">NEXT</button>';
    html = html + '</div>';
    html = html + '</div>';
    html = html + '    <div  class="addVehicleForm addVehicleStepFive">';
    html = html + '        <label for="carDescription">Addition Description :</label>';
    html = html + '        <div class="inputContainer">';
    html = html + '            <textarea type="text" id="carDescription" class="carDescription" name="carDescription"></textarea>';
    html = html + '        </div>';
    html = html + '        <div id="imageContainer">';
    html = html + '        </div>';
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
    html = html + '';
    html = html + '        <button type="button" class="submitBtn" onclick="SaveNewVehicle()">SUBMIT</button>';
    html = html + '    </div>';

    html = html + '    <div class="addVehicleForm vehicleAdded">';
    html = html + '    <div id="imageContainer">';
    html = html + '    </div>';
    html = html + '        <h3>Vehicle Added <i class="fas fa-check"></i></h3>';
    html = html + '        <button type="button" class="doneBtn" onclick="AddVehicleStep()">DONE</button>';
    html = html + '    </div>';
    html = html + '</div>';

    $("#AddPostingContainer").empty();
    $("#AddPostingContainer").append(html);
}


function wholeSalePriceChecked() {
    const priceInput = document.querySelector('#wholeSalePriceContainer');
    if (toogle == 'off') {
        priceInput.className = "show";
        toogle = 'on';
    } else {
        priceInput.className = "hide";
        toogle = 'off';
    }
}


function SaveNewVehicle() {
    // var dealerId = 'dfb56be7-15ef-11eb-83a2-e86a647a411d';
    gVehicle.notes = $("#carDescription").val();
    gVehicle.wholeSalePrice = $("#wholeSalePrice").val();
    gVehicle.image = gVehicle.links[0].url;
    SaveVehicle(gVehicle, dealerId).then(function (vehicle) {
        AddVehicleStep();
        PopulateVehicle();
    });
}

function LoadMyAccountMenu() {
    var html = '';
    html = html + '<ul class="accountMenuList">';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a onclick="LocationChange(\'vendor\');">';
    html = html + '            <i class="far fa-user fa-2x accountMenuIcon"></i>';
    html = html + '            Profile';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a href="/">';
    html = html + '            <i class="fas fa-columns fa-2x accountMenuIcon"></i>';
    html = html + '            Dashboard';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a onclick="LocationChange(\'schedule\');">';
    html = html + '            <i class="far fa-calendar-alt fa-2x accountMenuIcon"></i>';
    html = html + '            Schedule';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '    <li class="accountMenuListItems">';
    html = html + '        <a href="/contactUs">';
    html = html + '            <i class="fas fa-phone fa-2x accountMenuIcon"></i>';
    html = html + '            Contact Us';
    html = html + '        </a>';
    html = html + '    </li>';
    html = html + '</ul>';

    $("#MyAccountMenu").empty();
    $("#MyAccountMenu").append(html);

    $('#upload-photos').on('submit', function (event) {
        event.preventDefault();
        var files = $('#photos-input').get(0).files;
        var formData = new FormData();
        if (files.length === 0) { return false; }
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var temp = String(file.name).split('.');
            myExt = temp.slice(-1)[0];
            uid = CreateUUID();
            formData.append('photos[]', file, file.name);
        }
        UploadFiles(formData);
    });
}


function ViewListing() {
    //get vin number of car selected then go to carview then populate
}

function LoadListingSettings() {
    var html = '';
    html = html + '<ul class="listingSettingsList">';
    html = html + '    <li class="settingsListItem" onClick="ViewListing()">';
    html = html + '        <i class="far fa-clipboard"></i>';
    html = html + '        <p>';
    html = html + '            View Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-trash-alt"></i>';
    html = html + '        <p>';
    html = html + '            Delete Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-edit"></i>';
    html = html + '        <p>';
    html = html + '            Edit Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-check-circle"></i>';
    html = html + '        <p>';
    html = html + '            Mark Sold';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="fas fa-chart-line"></i>';
    html = html + '        <p>';
    html = html + '            Boost Lisitng';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '    <li class="settingsListItem">';
    html = html + '        <i class="far fa-share-square"></i>';
    html = html + '        <p>';
    html = html + '            Share Listing';
    html = html + '        </p>';
    html = html + '    </li>';
    html = html + '</ul>';

    $("#ListingSettingsContainer").empty();
    $("#ListingSettingsContainer").append(html);
}


function loadScanner(){

    var selectedDeviceId;
		var codeReader;
		function barcode() {
			codeReader = new ZXing.BrowserMultiFormatReader();
			codeReader.listVideoInputDevices().then(function (videoInputDevices) {
				selectedDeviceId = videoInputDevices[0].deviceId;
				var html = '';
				videoInputDevices.forEach(function (element) {
					html += '<option value="' + element.deviceId + '">' + element.label + '</option>';
				});
				$("#sourceSelect").empty();
				$("#sourceSelect").append(html);
				$("#sourceSelect").change(function () { selectedDeviceId = $("#sourceSelect option:selected").val(); });
				$('#sourceSelectPanel').show();

				$('#startButton').click(function () {
					$("#result").val('');
					codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', function (result, err) {
						if (result) {
							console.log(result);
							if ($("#result").val() !== result.text) { 
								$("#result").val(result.text);
							 }
						}else{
							console.log("Still looking");
						}
					});
					console.log(`Started continous decode from camera with id ${selectedDeviceId}`);
				})

				$('#resetButton').click(function () {
					codeReader.reset();
					$("#result").val('');
				});

			}).catch(function (err) { console.error(err) });
		}barcode();
}

function barCodeScanner(){
    document.querySelector('#barCodeScannerContainer').style = "display:flex;";
    document.querySelector('.buttonContainer #startButton').click();
    document.querySelector('.buttonContainer #startButton').click();
    const width = document.querySelector('#barCodeScannerContainer main').offsetWidth +50;
    const height = document.querySelector('#barCodeScannerContainer main').offsetHeight +50;
    document.querySelector('#video').style = "height:"+height+"px;width:"+width+"px;";
}

function capture(){
    alert($('#result').val());
    document.querySelector('#vinNum').value =  $('#result').val();
    document.querySelector('#barCodeScannerContainer').style = "display:none;";
}

function UploadFiles(formData) {
    $.ajax({
        headers: {
            'vin': gVehicle.vin,
            'dealerid': gVehicle.dealerId,
            'tokenid': tokenId,
            'uuid': uid,
            'myext': myExt
        },
        url: '/api/file/upload',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
            return xhr;
        }
    }).done(function (o) {
        o.sequence = gVehicle.links.length;
        gVehicle.links.push(o);
        var html = '';
        for (var i = 0; i < gVehicle.links.length; i++) {
            html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
        }
        $("#thumbnailContainer").empty();
        $("#thumbnailContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}
