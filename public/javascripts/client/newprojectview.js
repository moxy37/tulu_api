var gProject = null;
var gCompanyIds = [];
const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g;
const lngRegex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g;
const isValid = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
var gRequest = null;
var editMode = 'project';
var truckTypes = null;
var materials = null;
var companyOperators = null;
var readOnly = true;

var currentLocationName = '';
var currentLocationLat = 51;
var currentLocationLong = -114;
var currentLocationAddress = '';

var isNewLoc = false;

var marker = null;

function PageLoadFunction() {
    $(function () { $("#startDate").datepicker().datepicker("setDate", new Date()); });

    LoadCompanyOperators().then(function (list) {
        companyOperators = new Object();
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var text = list[i]['User']['Name'];
            if (text === 'dummy') { text = 'Leave Open'; }
            html += '<option value="' + list[i]['id'] + '">' + text + '</option>';
            companyOperators[list[i]['id']] = list[i];
        }
        $("#operatorSelect").empty();
        $("#operatorSelect").append(html);
        $("#RequestNameContainer").hide();
        $("#LocationTypeContainer").hide();
    });

    $("select#truckTypeSelect").select2();

    if (projectId === '' || projectId === undefined) {
        MakeNewProject().then(function (results) {
            $("#ProjectTitlePage").empty();
            $("#ProjectTitlePage").append('CREATE NEW PROJECT');
            isNewLoc = true;
            gProject = results;
            if (gUser.companyId === results['Company']['id']) { readOnly = false; }
            for (var i = 0; i < results['Companies'].length; i++) { gCompanyIds.push(results['Companies'][i]['id']); }
            DisplayProject(results, 'Section1', 'projectName');
        });
    } else {
        GetProject(projectId).then(function (results) {
            $("#ProjectTitlePage").empty();
            $("#ProjectTitlePage").append('EDIT PROJECT');
            gProject = results;
            if (gUser.companyId === results['Company']['id']) { readOnly = false; }
            for (var i = 0; i < results['Companies'].length; i++) { gCompanyIds.push(results['Companies'][i]['id']); }
            DisplayProject(results, 'Section1', 'projectName');
        });
    }

    mymap.on('click', function (e) {
        if (!readOnly) {
            $("#latitude").val(e.latlng.lat);
            $("#longitude").val(e.latlng.lng);
            geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
                if (error) {
                    return;
                }
                var text = result.address.Match_addr;
                console.log(text);
                $("#locationAddress").val(text);
                if (editMode === 'request') {
                    gRequest['Location']['Name'] = $("#locationName").val();
                    gRequest['Location']['Address'] = $("#locationAddress").val();
                    gRequest['Location']['Location Type'] = $("#locationType option:selected").val();
                    gRequest['Location']['Latitude'] = $("#latitude").val();
                    gRequest['Location']['Longitude'] = $("#longitude").val();
                } else if (editMode === 'project') {
                    gProject['Location']['Name'] = $("#locationName").val();
                    gProject['Location']['Address'] = $("#locationAddress").val();
                    gProject['Location']['Location Type'] = $("#locationType option:selected").val();
                    gProject['Location']['Latitude'] = $("#latitude").val();
                    gProject['Location']['Longitude'] = $("#longitude").val();
                }
                TestChangeLat();
                // L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
            });


            // $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng, function (data) {
            //     var text = data.address.road + ', ' + data.address.city + ' ' + data.address.state + ', ' + data.address.postcode;
            //     $("#locationAddress").val(text);
            //     if (editMode === 'request') {
            //         gRequest['Location']['Name'] = $("#locationName").val();
            //         gRequest['Location']['Address'] = $("#locationAddress").val();
            //         gRequest['Location']['Location Type'] = $("#locationType option:selected").val();
            //         gRequest['Location']['Latitude'] = $("#latitude").val();
            //         gRequest['Location']['Longitude'] = $("#longitude").val();
            //     } else if (editMode === 'project') {
            //         gProject['Location']['Name'] = $("#locationName").val();
            //         gProject['Location']['Address'] = $("#locationAddress").val();
            //         gProject['Location']['Location Type'] = $("#locationType option:selected").val();
            //         gProject['Location']['Latitude'] = $("#latitude").val();
            //         gProject['Location']['Longitude'] = $("#longitude").val();
            //     }

            // });

        }
    });
}

function TestChangeLat() {
    var lat = $("#latitude").val();
    var long = $("#longitude").val();
    mymap.setView([lat, long], 13);
    if (marker !== null) { mymap.removeLayer(marker); }
    marker = L.marker([lat, long]).addTo(mymap);
}

async function GetProject(id) {
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.id = id;
    const result = await $.ajax({
        type: "PUT",
        url: "/api/document/get/packed",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) { },
        error: function (results) { console.log(results.statusText); }
    });
    return result;
}

function LoadTypes() {
    gProject['Project Type'] = $("#projectType option:selected").val();
    GetDocs('Truck Type', 'Project Type', gProject['Project Type']).then(function (results) {
        truckTypes = new Object();
        var html3 = '';
        for (var i = 0; i < results.length; i++) {
            truckTypes[results[i]['id']] = results[i];
            html3 += '<option value="' + results[i]['id'] + '">' + results[i]['Name'] + '</option>';
        }
        $("#truckTypeSelect").empty();
        $("#truckTypeSelect").append(html3);
        //ChangeSectionView(sec, foc);
    });
    GetDocs('Material', 'Project Type', gProject['Project Type']).then(function (rr) {
        materials = new Object();
        var html2 = '';
        for (var i = 0; i < rr.length; i++) {
            materials[rr[i]['id']] = rr[i];
            html2 += '<option value="' + rr[i]['id'] + '">' + rr[i]['Name'] + '</option>';
        }
        $("#materialSelect").empty();
        $("#materialSelect").append(html2);
    });
}

async function LoadCompanyOperators() {
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.addDummy = 'true';
    const result = await $.ajax({
        type: "PUT",
        url: "/api/company/operators/list",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) { },
        error: function (results) { console.log(results.statusText); }
    });
    return result;
}

async function MakeNewRequest() {
    var obj = new Object();
    obj.tokenId = tokenId;
    const result = await $.ajax({
        type: "PUT",
        url: "/api/company/request/new",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) { },
        error: function (results) { console.log(results.statusText); }
    });
    return result;
}

async function MakeNewProject() {
    var obj = new Object();
    obj.tokenId = tokenId;
    var pType = sessionStorage.getItem("projectType");
    if (pType !== undefined) {
        obj.projectType = pType;
        sessionStorage.removeItem("projectType");
    }
    var pId = sessionStorage.getItem("projectId");
    if (pId !== undefined) {
        obj.projectId = pId;
        sessionStorage.removeItem("projectId");
    }
    const result = await $.ajax({
        type: "PUT",
        url: "/api/company/project/new",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) { },
        error: function (results) { console.log(results.statusText); }
    });
    return result;
}

function CancelLocationEdit(sec, foc) {
    if (editMode === 'request') {
        gRequest['Location']['Name'] = currentLocationName;
        gRequest['Location']['Address'] = currentLocationAddress;
        // gRequest['Location']['Location Type'] = $("#locationType option:selected").val();
        gRequest['Location']['Latitude'] = currentLocationLat;
        gRequest['Location']['Longitude'] = currentLocationLong;
        gRequest['Location']['Location Type'] = 'Drop Off';
    } else if (editMode === 'project') {
        gProject['Location']['Name'] = currentLocationName;
        gProject['Location']['Address'] = currentLocationAddress;

        gProject['Location']['Location Type'] = 'Pick Up';
        gProject['Location']['Latitude'] = currentLocationLat;
        gProject['Location']['Longitude'] = currentLocationLong;
    }
    ChangeSectionView(sec, foc);
}

function LoadLocationSelect(opt) {
    if (marker !== null) { mymap.removeLayer(marker); }
    editMode = opt;
    $("#LocationButtons").empty();
    var html = '<button class="button" type="button" onclick="CancelLocationEdit(\'Section1\', \'projectName\');"><i class="fas fa-chevron-left"></i> Project Details</button><button class="button secondary" type="button" onclick="DashboardRedirect();">Cancel</button><button class="button" type="button" onclick="ChangeSectionView(\'Section3\', \'\');">Fleet Selection <i class="fas fa-chevron-right"></i></button>';
    var loc = gProject['Location'];
    loc['Location Type'] = 'Pick Up';
    if (editMode === 'request') {
        html = '<button class="button" type="button" onclick="CancelLocationEdit(\'Section5\', \'requestName\');"><i class="fas fa-chevron-left"></i> Request Info</button><button class="button secondary" type="button" onclick="DashboardRedirect();">Cancel</button><button class="button primary" type="button" onclick="SaveRequest();">Save Request</button>';
        gRequest['Location']['Location Type']= 'Drop Off';
        loc = gRequest['Location'];
    }
    currentLocationName = loc['Name'];
    currentLocationAddress = loc['Address'];
    currentLocationLong = loc['Longitude'];
    currentLocationLat = loc['Latitude'];
    $("#LocationButtons").append(html);
    $("#locationName").val(loc['Location Type'] + ' Location');
    $("#locationAddress").val(loc['Address']);
    $("#locationType").val(loc['Location Type']);
    $("#latitude").val(loc['Latitude']);
    $("#longitude").val(loc['Longitude']);
    if (isNewLoc && !readOnly) {
        navigator.geolocation.getCurrentPosition(function (location) {
            var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            $("#latitude").val(location.coords.latitude);
            $("#longitude").val(location.coords.longitude);
            mymap.setView([location.coords.latitude, location.coords.longitude], 13);
            marker = L.marker(latlng).addTo(mymap);
            var lat = parseFloat($("#latitude").val());
            var long = parseFloat($("#longitude").val());
            // $("#longitude").val(e.latlng.lng);
            $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + long, function (data) {
                var text = data.address.road + ', ' + data.address.city + ' ' + data.address.state + ', ' + data.address.postcode;
                $("#locationAddress").val(text);
                if (editMode === 'request') {
                    gRequest['Location']['Name'] = $("#locationName").val();
                    gRequest['Location']['Address'] = $("#locationAddress").val();
                    gRequest['Location']['Location Type'] = $("#locationType option:selected").val();
                    gRequest['Location']['Latitude'] = $("#latitude").val();
                    gRequest['Location']['Longitude'] = $("#longitude").val();
                } else if (editMode === 'project') {
                    gProject['Location']['Name'] = $("#locationName").val();
                    gProject['Location']['Address'] = $("#locationAddress").val();
                    gProject['Location']['Location Type'] = $("#locationType option:selected").val();
                    gProject['Location']['Latitude'] = $("#latitude").val();
                    gProject['Location']['Longitude'] = $("#longitude").val();
                }
                $("#locationName").focus();
            });
        });
    } else {
        mymap.setView([loc['Latitude'], loc['Longitude']], 13);
        marker = L.marker([loc['Latitude'], loc['Longitude']]).addTo(mymap);
        $("#locationName").focus();
    }
    ChangeSectionView('Section2', 'locationName');
}

function UpdateProject(project) {
    project['Name'] = $("#projectName").val();
    project['Notes'] = '';
    project['Project Type'] = $("#projectType option:selected").val();
    project['Project Status'] = $("#projectStatus option:selected").val();
    project['Date'] = $("#startDate").val();
    return project;
}

function LoadAllRequests() {
    var html = '<h2>Requests</h2>';
    for (var i = 0; i < gProject['Requests'].length; i++) {
        var r = gProject['Requests'][i];
        if (i > 0) { html += '<br/>'; }
        html += '<input type="button" class="button secondary-button" value="Edit ' + r['Name'] + ' Request" onclick="LoadRequest(\'' + r['id'] + '\');" />';
    }
    html += '<input type="button" class="button" value="New Request" onclick="NewRequest();" /><br/>';
    html += '<div class="back-next-cancel triple"><button class="button" type="button" onclick="ChangeSectionView(\'Section3\', \'\');"><i class="fas fa-chevron-left"></i> Fleet Selection</button><button class="button secondary" type="button" onclick="DashboardRedirect();">Cancel</button><button class="button primary" type="button" onclick="StartSavingProject();">Save Project</button></div>';
    $("#Section4").empty();
    $("#Section4").append(html);
    ChangeSectionView('Section4', '');
}
function UpdateRequestName() {
    var id = $("#materialSelect option:selected").val();
    gRequest['Material'] = materials[id];
    gRequest['Name'] = gRequest['Material']['Name'];
    $("#requestName").val(gRequest['Name']);
}

function SaveRequest() {
    gRequest['Start'] = $("#requestStart").val();
    var id = $("#materialSelect option:selected").val();
    gRequest['Material'] = materials[id];
    gRequest['Name'] = gRequest['Material']['Name'];
    id = $("#operatorSelect option:selected").val();
    gRequest['Operator'] = companyOperators[id];
    var ids = $("#truckTypeSelect").val();
    gRequest['Truck Types'] = [];
    for (var i = 0; i < ids.length; i++) { gRequest['Truck Types'].push(truckTypes[ids[i]]); }
    gRequest['Location']['Name'] = $("#locationName").val();
    var addToList = true;
    for (var i = 0; i < gProject['Requests'].length; i++) {
        if (gRequest['id'] === gProject['Requests'][i]['id']) {
            gProject['Requests'][i] = gRequest;
            addToList = false;
        }
    }
    if (addToList === true) { gProject['Requests'].push(gRequest); }
    gRequest = null;
    LoadAllRequests();
}

function CancelEditRequest() {
    gRequest = null;
    ChangeSectionView('Section4', '');
}

function LoadRequest(id) {
    gRequest = null;
    for (var i = 0; i < gProject['Requests'].length; i++) {
        var r = gProject['Requests'][i];
        if (r['id'] === id) { gRequest = r; }
    }
    DisplayRequest(gRequest);
}

function NewRequest() {
    MakeNewRequest().then(function (results) {
        gRequest = results;
        DisplayRequest(gRequest);
    });
}

function DisplayRequest(r) {
    $("#requestName").val(r['Name']);
    $("#requestStart").val(r['Start']);
    $("#materialSelect").val(r['Material']['id']);
    $("#operatorSelect").val(r['Operator']['id']);
    var list = [];
    for (var i = 0; i < r['Truck Types'].length; i++) { list.push(r['Truck Types'][i]['id']); }
    $("#truckTypeSelect").val(list);
    ChangeSectionView('Section5', 'requestName');
}

function StartSavingProject() {
    $(".DisplaySections").hide();
    $("#SavingGif").show();
    gProject = UpdateProject(gProject);
    SaveProject(gProject);
}

function SaveProject(project) {
    var companies = [];
    for (var i = 0; i < project['Companies'].length; i++) {
        if (gCompanyIds.indexOf(project['Companies'][i]['id']) !== -1) {
            companies.push(project['Companies'][i]);
        }
    }
    project['Companies'] = companies;
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.doc = project;
    $.ajax({
        type: "PUT",
        url: "/api/document/save/packed",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) {
            FinishSaving();
            // if (confirm("Saved")) {
            //     location.href = '/dashboardConstructionOwner?tokenId=' + tokenId;
            // } else {
            //     location.href = '/dashboardConstructionOwner?tokenId=' + tokenId;
            // }
        },
        error: function (results) { console.log(results.statusText); }
    });
}

function LoadEditProjectPage() {
    // var projId = sessionStorage.getItem("projId");
    location.href = '/newProject?tokenId=' + tokenId + '&projectId=' + gProject.id;
}

function DisplayProject(project, sec, foc) {
    if (readOnly) {
        $("input, text").prop("readonly", true);
        $("input, select").prop('disabled', true);

    }
    $("#supervisorName").val(project['User']['Name']);
    $("#projectName").val(project['Name']);
    $("#projectType").empty();
    $("#startDate").val(project['Date']);
    var html = '';
    for (var i = 0; i < project['Project Type-list'].length; i++) {
        var temp = '';
        if (project['Project Type'] === project['Project Type-list'][i]) { temp = ' selected="selected" '; }
        html += '<option value="' + project['Project Type-list'][i] + '"' + temp + '>' + project['Project Type-list'][i] + '</option>';
    }
    $("#projectType").append(html);
    $("#projectStatus").empty();
    html = '';
    for (var i = 0; i < project['Project Status-list'].length; i++) {
        var temp = '';
        if (project['Project Status'] === project['Project Status-list'][i]) { temp = ' selected="selected" '; }
        html += '<option value="' + project['Project Status-list'][i] + '"' + temp + '>' + project['Project Status-list'][i] + '</option>';
    }
    $("#projectStatus").append(html);
    $("#locationName").val(project['Location']['Name']);
    $("#locationAddress").val(project['Location']['Address']);
    $("#latitude").val(project['Location']['Latitude']);
    $("#longitude").val(project['Location']['Longitude']);
    $("#locationType").empty();
    project['Location']['Location Type'] = 'Pick Up';
    html = '';
    for (var i = 0; i < project['Location']['Location Type-list'].length; i++) {
        var temp = '';
        if (project['Location']['Location Type'] === project['Location']['Location Type-list'][i]) { temp = ' selected="selected" '; }
        html += '<option value="' + project['Location']['Location Type-list'][i] + '"' + temp + '>' + project['Location']['Location Type-list'][i] + '</option>';
    }
    $("#locationType").append(html);

    html = BuildMultiselect(project['Companies'], gCompanyIds);
    $("#Section3").prepend(html);
    $('.list-group-item').click(function () {
        if ($(this).hasClass('active')) {
            $(this).children('input').prop("checked", false);
        }
        else {
            $(this).children('input').prop("checked", true);
        }
    });
    $(".DisplaySections").hide();
    LoadTypes();
    ChangeSectionView(sec, foc);
}

function BuildMultiselect(options, selected) {
    var html = `<div class="panel-group multiselector">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    Select Fleet Companies
                </h4>
            </div>
            <div id="company-select" class="panel-collapse collapse show">`;
    if (readOnly) {
        html += `<div id="CompanyTestSelect" class="list-group">`;
    } else {
        html += `<div id="CompanyTestSelect" class="list-group" role="group" data-toggle="buttons">`;
    }
    for (var i = 0; i < options.length; i++) {
        if (selected.indexOf(options[i]['id']) === -1) {
            html += `<label class="btn btn-light list-group-item">
                        <i class="fas fa-check"></i>
                        <input name="multiSelect" value="` + options[i]['id'] + `" type="checkbox" />` + options[i]['Name'] + `
                    </label>`;
        } else {
            html += `<label class="btn btn-light list-group-item active">
                        <i class="fas fa-check"></i>
                        <input name="multiSelect" value="` + options[i]['id'] + `" type="checkbox" checked="true" />` + options[i]['Name'] + `
                    </label>`;
        }
    }

    html += '</div></div></div></div>';
    return html;
}

/* <section>
    <div class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    Companies
                </h4>
            </div>
            <div id="rarity-select" class="panel-collapse collapse show">
                <div class="list-group" role="group" data-toggle="buttons">
                    <label class="btn btn-light list-group-item">
                        <i class="fas fa-check"></i>
                        <input name="RaritySelect" value="common" type="checkbox">Common
                    </label>
                    <label class="btn btn-light list-group-item">
                        <i class="fas fa-check"></i>
                        <input name="RaritySelect" value="uncommon" type="checkbox">Uncommon
                    </label>
                    <label class="btn btn-light list-group-item">
                        <i class="fas fa-check"></i>
                        <input name="RaritySelect" value="rare" type="checkbox">Rare
                    </label>
                    <label class="btn btn-light list-group-item">
                        <i class="fas fa-check"></i>
                        <input name="RaritySelect" value="mythic" type="checkbox">Mythic
                    </label>
                </div>
            </div>
        </div>
    </div>
</section> */

function FinishSaving() {
    $(".DisplaySections").hide();
    $("#SavingGif").hide();
    $("#Section6").show();
    $("#companyName2 span").text(gProject['Company']['Name']);
    $("#date2 span").text(gProject['Date']);
    $("#projectName2 span").text(gProject.Name);
    $("#projectType2 span").text(gProject["Project Type"]);
    var reqs = new Object();
    for (var i = 0; i < gProject['Requests'].length; i++) {
        var r = gProject['Requests'][i];
        if (reqs[r['Material']['Name']] === undefined) {
            reqs[r['Material']['Name']] = new Object();
            reqs[r['Material']['Name']].times = [];
        }
        reqs[r['Material']['Name']].times.push(r['Start']);
    }
    var arr = Object.keys(reqs);
    var html = '<h1>Job Requests</h1>';
    for (var i = 0; i < arr.length; i++) {
        var k = arr[i];
        html += '<h4>' + k + '</h4>';
        for (var j = 0; j < reqs[k].times.length; j++) {
            if (j > 0) { html += '<br/>'; }
            var t = reqs[k].times[j];
            html += '<i class="fas fa-edit"></i>' + t;
        }
    }
    $("#RequestList").empty();
    $("#RequestList").append(html);
}

function AddToProject(id) {
    if (gCompanyIds.indexOf(id) === -1) {
        gCompanyIds.push(id);
        gProject = UpdateProject(gProject);
        DisplayProject(gProject, 'Section3', '');
    }
}

function RemoveFromProject(id) {
    var index = gCompanyIds.indexOf(id);
    if (index !== -1) {
        gCompanyIds.splice(index, 1);
        gProject = UpdateProject(gProject);
        DisplayProject(gProject, 'Section3', '');
    }
}

function ChangeSectionView(sec, foc) {
    $(".DisplaySections").hide();
    $("#" + sec).show();
    //$("#" + foc).focus();
}