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
    NewVehicle(vin, gDealer.id).then(function (vehicle) {
        // alert(JSON.stringify(vehicle));
        gVehicle = vehicle;
        LoadVehicleInfo(vehicle);
        DisplayVehicleInitialInfo(vehicle);
        AddVehicleStep();
    });
}


function DisplayVehicleInitialInfo(results) {
    var html = '';
    html = html + ' <h3 class="initialInfo">'+results.year +'&nbsp'+ results.make +'&nbsp'+ results.model +'&nbsp'+ results.trim+'</h3>';
    html = html + ' <button type="button" class="nextBtn" onclick="AddVehicleStep()">CONTINUE WITH THIS VEHICLE?</button>';
    html = html + ' <button type="button" class="nextBtn" onclick="goToStepOne()">ENTER ANOTHER VIN</button>';

    $("#addVehicleStepTwo").empty();
    $("#addVehicleStepTwo").append(html);
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

    $("#addVehicleStepThree").empty();
    $("#addVehicleStepThree").append(html);
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
    html = html + '    <div  class="addVehicleForm addVehicleStepThree" id="addVehicleStepThree">';
    html = html + '';
    html = html + '    </div>';


    html = html + '    <div class="addVehicleForm addVehicleStepFour" id="addVehicleStepFour">';
    html = html + '        <label for="mileage">Enter Car`s Mileage :</label>';
    html = html + '        <div class="inputContainer">';
    html = html + '            <input type="text" id="mileage" class="mileage" name="mileage" value="">';
    html = html + '        </div>';
    html = html + '         <button type="button" class="doneBtn" onclick="AddVehicleStep()">NEXT</button>';
    
    html = html + '     </div>';
    
    html = html + '    <div class="addVehicleForm addVehicleStepFive" id="addVehicleStepFive">';

    html = html + '    <div class="carDetails">';
    html = html + '         <p>Car Details :</p>';
    html = html + '         <div class="frontBumper">';
    html = html + '             <p>Front Bumper</p>';
    html = html + '             <i class="fas fa-angle-down" onclick="showFrontBumperContainer()"></i>';
    html = html + '         </div>';
    html = html + '         <div class="detailsContainer frontBumperContainerHide" id="frontBumperContainer">';
    html = html + '             <label>';
    html = html + '                 Front Bumper Details:';
    html = html + '             </label>';
    html = html + '             <input type="textarea" class="description" id="frontBumperDescription"/>';
    html = html + '             <div class="imageContainer" id="frontBumperImageContainer">';
    html = html + '                 <div class="addImage" onclick="addFrontBumperImage()">';
    html = html + '                     <i class="fas fa-plus"></i>';
    html = html + '                 </div>';
    html = html + '             </div>';
    
    html = html + '<form id="upload-frontBumper-photos" method="post" action="/api/file/upload" enctype="multipart/form-data">';
    html = html + '		<div class="form-group" style="display:none;">';
    html = html + '			<label for="frontBumper-photos-input">Load Image</label>';
    html = html + '			<input id="frontBumper-photos-input" type="file" name="photos[]" onchange="SubmitFrontBumperImage()" multiple="multiple" accept="image/*" capture />';
    html = html + '		<input class="btn btn-default" id="uploadFrontBumperBtn" style="display:none;" type="testsubmit" name="Photo Uploads" value="Upload" />';
    html = html + '		</div>';
    html = html + '		<input type="hidden" name="csrf_token" value="just_a_text_field" />';
    html = html + '	</form>';
    
    html = html + '         </div>';
    html = html + '         <div class="rearBumper">';
    html = html + '             <p>Rear Bumper</p>';
    html = html + '             <i class="fas fa-angle-down" onclick="showRearBumperContainer()"></i>';
    html = html + '         </div>';
    html = html + '         <div class="detailsContainer rearBumperContainerHide" id="rearBumperContainer">';
    html = html + '             <label>';
    html = html + '                 Rear Bumper Details:';
    html = html + '             </label>';
    html = html + '             <input type="textarea" class="description" id="rearBumperDescription"/>';
    html = html + '             <div class="imageContainer" id="rearBumperImageContainer">';
    html = html + '                 <div class="addImage" onclick="addRearBumperImage()">';
    html = html + '                     <i class="fas fa-plus"></i>';
    html = html + '                 </div>';
    html = html + '             </div>';
    
    html = html + '<form id="upload-rearBumper-photos" method="post" action="/api/file/upload" enctype="multipart/form-data">';
    html = html + '		<div class="form-group" style="display:none;">';
    html = html + '			<label for="rearBumper-photos-input">Load Image</label>';
    html = html + '			<input id="rearBumper-photos-input" type="file" name="photos[]" onchange="SubmitRearBumperImage()" multiple="multiple" accept="image/*" capture />';
    html = html + '		<input class="btn btn-default" id="uploadRearBumperBtn" style="display:none;" type="testsubmit" name="Photo Uploads" value="Upload" />';
    html = html + '		</div>';
    html = html + '		<input type="hidden" name="csrf_token" value="just_a_text_field" />';
    html = html + '	</form>';

    html = html + '         </div>';
    html = html + '         <div class="hood">';
    html = html + '             <p>Hood</p>';
    html = html + '             <i class="fas fa-angle-down" onclick="showHoodContainer()"></i>';
    html = html + '         </div>';
    html = html + '         <div class="detailsContainer hoodContainerHide" id="hoodContainer">';
    html = html + '             <label>';
    html = html + '                 Hood Details:';
    html = html + '             </label>';
    html = html + '             <input type="textarea" class="description" id="hoodDescription"/>';
    html = html + '             <div class="imageContainer" id="hoodImageContainer">';
    html = html + '                 <div class="addImage" onclick="addHoodImage()">';
    html = html + '                     <i class="fas fa-plus"></i>';
    html = html + '                 </div>';
    html = html + '             </div>';
    
    html = html + '<form id="upload-hood-photos" method="post" action="/api/file/upload" enctype="multipart/form-data">';
    html = html + '		<div class="form-group" style="display:none;">';
    html = html + '			<label for="hood-photos-input">Load Image</label>';
    html = html + '			<input id="hood-photos-input" type="file" name="photos[]" onchange="SubmitHoodImage()" multiple="multiple" accept="image/*" capture />';
    html = html + '		<input class="btn btn-default" id="uploadhoodBtn" style="display:none;" type="testsubmit" name="Photo Uploads" value="Upload" />';
    html = html + '		</div>';
    html = html + '		<input type="hidden" name="csrf_token" value="just_a_text_field" />';
    html = html + '	</form>';
    html = html + '         </div>';
    html = html + '         <div class="sideSkirt">';
    html = html + '             <p>SideSkirt</p>';
    html = html + '             <i class="fas fa-angle-down" onclick="showSideSkirtContainer()"></i>';
    html = html + '         </div>';
    html = html + '         <div class="detailsContainer sideSkirtContainerHide" id="sideSkirtContainer">';
    html = html + '             <label>';
    html = html + '                 Side Skirt Details:';
    html = html + '             </label>';
    html = html + '             <input type="textarea" class="description" id="sideSkirtDescription"/>';
    html = html + '             <div class="imageContainer" id="sideSkirtImageContainer">';
    html = html + '                 <div class="addImage" onclick="addSideSkirtImage()">';
    html = html + '                     <i class="fas fa-plus"></i>';
    html = html + '                 </div>';
    html = html + '             </div>';
    
    html = html + '<form id="upload-sideSkirt-photos" method="post" action="/api/file/upload" enctype="multipart/form-data">';
    html = html + '		<div class="form-group" style="display:none;">';
    html = html + '			<label for="sideSkirt-photos-input">Load Image</label>';
    html = html + '			<input id="sideSkirt-photos-input" type="file" name="photos[]" onchange="SubmitSideSkirtImage()" multiple="multiple" accept="image/*" capture />';
    html = html + '		<input class="btn btn-default" id="uploadsideSkirtBtn" style="display:none;" type="testsubmit" name="Photo Uploads" value="Upload" />';
    html = html + '		</div>';
    html = html + '		<input type="hidden" name="csrf_token" value="just_a_text_field" />';
    html = html + '	</form>';
    html = html + '         </div>';
    html = html + '         <div class="quarterPanel">';
    html = html + '             <p>Quarter Panel</p>';
    html = html + '             <i class="fas fa-angle-down" onclick="showQuarterPanelContainer()"></i>';
    html = html + '         </div>';
    html = html + '         <div class="detailsContainer quarterPanelContainerHide" id="quarterPanelContainer">';
    html = html + '             <label>';
    html = html + '                 Quarter Panel Details:';
    html = html + '             </label>';
    html = html + '             <input type="textarea" class="description" id="quarterPanelDescription"/>';
    html = html + '             <div class="imageContainer" id="quarterPanelImageContainer">';
    html = html + '                 <div class="addImage" onclick="addQuarterPanelImage()">';
    html = html + '                     <i class="fas fa-plus"></i>';
    html = html + '                 </div>';
    html = html + '             </div>';
    
    html = html + '<form id="upload-quarterPanel-photos" method="post" action="/api/file/upload" enctype="multipart/form-data">';
    html = html + '		<div class="form-group" style="display:none;">';
    html = html + '			<label for="quarterPanel-photos-input">Load Image</label>';
    html = html + '			<input id="quarterPanel-photos-input" type="file" name="photos[]" onchange="SubmitQuarterPanelImage()" multiple="multiple" accept="image/*" capture />';
    html = html + '		<input class="btn btn-default" id="uploadquarterPanelBtn" style="display:none;" type="testsubmit" name="Photo Uploads" value="Upload" />';
    html = html + '		</div>';
    html = html + '		<input type="hidden" name="csrf_token" value="just_a_text_field" />';
    html = html + '	</form>';

    html = html + '         </div>';
    html = html + '         <button type="button" class="doneBtn" onclick="AddVehicleStep()">NEXT</button>';
    html = html + '     </div>';
    
    html = html + '    </div>';
    
    html = html + '    <div class="addVehicleForm addVehicleStepSix" id="addVehicleStepSix">';

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
    html = html + '    <div  class="addVehicleForm addVehicleStepSeven" id="addVehicleStepSeven">';
    
    html = html + '             <label>';
    html = html + '                 Upload Pictures of your Car Documents:';
    html = html + '             </label>';
    html = html + '             <div class="imageContainer" id="carDocumentsImageContainer">';
    
    html = html + '             </div>';
    html = html + '             <button class="doneBtn" onclick="addCarDocumentsImage()">UPLOAD CAR DOCUMENTS</button>';
    
    html = html + '<form id="upload-carDocuments-photos" method="post" action="/api/file/upload" enctype="multipart/form-data">';
    html = html + '		<div class="form-group" style="display:none;">';
    html = html + '			<label for="carDocuments-photos-input">Load Image</label>';
    html = html + '			<input id="carDocuments-photos-input" type="file" name="photos[]" onchange="SubmitCarDocumentsImage()" multiple="multiple" accept="image/*" capture />';
    html = html + '		<input class="btn btn-default" id="uploadcarDocumentsBtn" style="display:none;" type="testsubmit" name="Photo Uploads" value="Upload" />';
    html = html + '		</div>';
    html = html + '		<input type="hidden" name="csrf_token" value="just_a_text_field" />';
    html = html + '	</form>';




    html = html + '        <button type="button" class="doneBtn" onclick="AddVehicleStep()">NEXT</button>';
    html = html + '    </div>';
    
    html = html + '    <div  class="addVehicleForm addVehicleStepEight" id="addVehicleStepEight">';
    html = html + '        <button type="button" class="doneBtn" onclick="AddVehicleStep()">CONTINUE</button>';
    html = html + '    </div>';


    html = html + '    <div  class="addVehicleForm addVehicleStepNine" id="addVehicleStepNine">';
    html = html + '        <button type="button" class="doneBtn" onclick="EnterRetailPrice()">ENTER RETAIL PRICE</button>';
    html = html + '        <button type="button" class="doneBtn" onclick="AddVehicleStep()">EXIT & SAVE</button>';
    html = html + '    </div>';

html = html + '    <div class="addVehicleForm RetailPrice">';
html = html + '         <div id="maxPriceContainer" class="maxPriceContainer">';
html = html + '             <label for="maxPrice">Max Price:</label>';
html = html + '             <div class="inputContainer">';
html = html + '                 <i class="fas fa-dollar-sign"></i>';
html = html + '                 <input type="number" name="maxPrice" class="maxPrice" id="maxPrice">';
html = html + '             </div>';
html = html + '         </div>';
html = html + '         <div id="minPriceContainer" class="minPriceContainer">';
html = html + '             <label for="minPrice">Min Price:</label>';
html = html + '             <div class="inputContainer">';
html = html + '                 <i class="fas fa-dollar-sign"></i>';
html = html + '                 <input type="number" name="minPrice" class="minPrice" id="minPrice">';
html = html + '             </div>';
html = html + '         </div>';
html = html + '         <button type="button" class="doneBtn" onclick="referralFee()">DONE</button>';
html = html + '     </div>';
html = html + '     <div class="addVehicleForm referralFee">';
html = html + '         <div id="referralFeeContainer" class="referralFeeContainer">';
html = html + '             <label for="referralFee">Enter Referral Fee:</label>';
html = html + '             <div class="inputContainer">';
html = html + '                 <i class="fas fa-dollar-sign"></i>';
html = html + '                 <input type="number" name="minPrice" class="minPrice" id="minPrice">';
html = html + '             </div>';
html = html + '         </div>';
html = html + '         <button type="button" class="doneBtn" onclick="AfterReferralFee()">DONE</button>';
html = html + '     </div>';
html = html + '     <div class="addVehicleForm vehicleAdded">';
html = html + '         <div id="imageContainer">';
html = html + '         </div>';
html = html + '         <h3>Vehicle Added <i class="fas fa-check"></i></h3>';
html = html + '         <button type="button" class="doneBtn" onclick="AddVehicleStep()">DONE</button>';
html = html + '     </div>';

    $("#AddPostingContainer").empty();
    $("#AddPostingContainer").append(html);

    
}

function SubmitFrontBumperImage() {
    var files = $('#frontBumper-photos-input').get(0).files;
    var formData = new FormData();
    if (files.length === 0) { return false; }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var temp = String(file.name).split('.');
        myExt = temp.slice(-1)[0];
        uid = CreateUUID();
        formData.append('photos[]', file, file.name);
    }
    console.log(files)
    UploadFrontBumperFiles(formData);
};

function SubmitRearBumperImage() {
    var files = $('#rearBumper-photos-input').get(0).files;
    var formData = new FormData();
    if (files.length === 0) { return false; }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var temp = String(file.name).split('.');
        myExt = temp.slice(-1)[0];
        uid = CreateUUID();
        formData.append('photos[]', file, file.name);
    }
    console.log(files)
    UploadRearBumperFiles(formData);
};

function SubmitHoodImage() {
    var files = $('#hood-photos-input').get(0).files;
    var formData = new FormData();
    if (files.length === 0) { return false; }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var temp = String(file.name).split('.');
        myExt = temp.slice(-1)[0];
        uid = CreateUUID();
        formData.append('photos[]', file, file.name);
    }
    console.log(files)
    UploadHoodFiles(formData);
};

function SubmitSideSkirtImage() {
    var files = $('#sideSkirt-photos-input').get(0).files;
    var formData = new FormData();
    if (files.length === 0) { return false; }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var temp = String(file.name).split('.');
        myExt = temp.slice(-1)[0];
        uid = CreateUUID();
        formData.append('photos[]', file, file.name);
    }
    console.log(files)
    UploadSideSkirtFiles(formData);
};

function SubmitQuarterPanelImage() {
    var files = $('#quarterPanel-photos-input').get(0).files;
    var formData = new FormData();
    if (files.length === 0) { return false; }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var temp = String(file.name).split('.');
        myExt = temp.slice(-1)[0];
        uid = CreateUUID();
        formData.append('photos[]', file, file.name);
    }
    console.log(files)
    UploadQuarterPanelFiles(formData);
};

function SubmitCarDocumentsImage() {
    var files = $('#carDocuments-photos-input').get(0).files;
    var formData = new FormData();
    if (files.length === 0) { return false; }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var temp = String(file.name).split('.');
        myExt = temp.slice(-1)[0];
        uid = CreateUUID();
        formData.append('photos[]', file, file.name);
    }
    console.log(files)
    UploadCarDocumentsFiles(formData);
};

function UploadFrontBumperFiles(formData) {
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
        o.description = $('#frontBumperDescription').val();
        o.type = "frontBumperDetails";
        console.log($('#frontBumperDescription').val());
        gVehicle.links.push(o);

        var html = '';
        for (var i = 0; i < gVehicle.links.length; i++) {
            if(gVehicle.links[i].type=="frontBumperDetails"){
                html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
            }
        }
        $("#frontBumperImageContainer").empty();
        $("#frontBumperImageContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}

function UploadRearBumperFiles(formData) {
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
        o.description = $('#rearBumperDescription').val();
        o.type = "rearBumperDetails";
        console.log($('#rearBumperDescription').val());
        gVehicle.links.push(o);


        var html = '';
        for (var i = 0; i < gVehicle.links.length; i++) {
            if(gVehicle.links[i].type=="rearBumperDetails"){
                html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
            }
        }
        $("#rearBumperImageContainer").empty();
        $("#rearBumperImageContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}

function UploadHoodFiles(formData) {
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
        o.description = $('#hoodDescription').val();
        o.type = "hoodDetails";
        console.log($('#hoodDescription').val());
        gVehicle.links.push(o);

        var html = '';
        for (var i = 0; i < gVehicle.links.length; i++) {
            if(gVehicle.links[i].type=="hoodDetails"){
                html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
            }
        }
        $("#hoodImageContainer").empty();
        $("#hoodImageContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}

function UploadSideSkirtFiles(formData) {
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
        o.description = $('#sideSkirtDescription').val();
        o.type = "sideSkirtDetails";
        console.log($('#sideSkirtDescription').val());
        gVehicle.links.push(o);

        var html = '';
        for (var i = 0; i < gVehicle.links.length; i++) {
            if(gVehicle.links[i].type=="sideSkirtDetails"){
                html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
            }
        }
        $("#sideSkirtImageContainer").empty();
        $("#sideSkirtImageContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}

function UploadQuarterPanelFiles(formData) {
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
        o.description = $('#quarterPanelDescription').val();
        o.type = "quarterPanelDetails";
        console.log($('#quarterPanelDescription').val());
        gVehicle.links.push(o);

        var html = '';
        for (var i = 0; i < gVehicle.links.length; i++) {
            if(gVehicle.links[i].type=="quarterPanelDetails"){
                html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
            }
        }
        $("#quarterPanelImageContainer").empty();
        $("#quarterPanelImageContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}

function UploadCarDocumentsFiles(formData) {
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
        o.type = "carDocuments";
        gVehicle.links.push(o);

        var html = '';
        for (var i = 0; i < gVehicle.links.length; i++) {
            if(gVehicle.links[i].type=="carDocuments"){
                html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
            }
        }
        $("#carDocumentsImageContainer").empty();
        $("#carDocumentsImageContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}


function SaveNewVehicle() {
    gVehicle.notes = $("#carDescription").val();
    gVehicle.minPrice = $("#minPrice").val();
    gVehicle.maxPrice = $("#maxPrice").val();
    // gVehicle.maxPrice = $("#maxPrice").val();
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

function rearBumperImage(){
     console.log($('#imageInput'));
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


function loadScanner() {

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
                    } else {
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
    } barcode();
}

function barCodeScanner() {
    document.querySelector('#barCodeScannerContainer').style = "display:flex;";
    document.querySelector('.buttonContainer #startButton').click();
    document.querySelector('.buttonContainer #startButton').click();
    const width = document.querySelector('#barCodeScannerContainer main').offsetWidth + 50;
    const height = document.querySelector('#barCodeScannerContainer main').offsetHeight + 50;
    document.querySelector('#video').style = "height:" + height + "px;width:" + width + "px;";
}

function capture() {
    alert($('#result').val());
    document.querySelector('#vinNum').value = $('#result').val();
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
            if(gVehicle.links[i].type== "image"){
                html += '<img  class="thumbNail" src="' + gVehicle.links[i].url + '" />';
            }
        }
        $("#thumbnailContainer").empty();
        $("#thumbnailContainer").append(html);
    }).fail(function (xhr, status) {
        alert(status);
    });
}
