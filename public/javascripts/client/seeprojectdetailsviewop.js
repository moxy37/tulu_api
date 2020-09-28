var thisProject = false;
var reqId = '';
var marker = null;
var pickUpLat = 0;
var pickUpLng = 0;
var dropOffLat = 0;
var dropOffLng = 0;
var gRequest = null;
var gCurrentLog = null;

function PageLoadFunction() {
    alert("Loading page");
    console.log(gUser);
    var projId = sessionStorage.getItem("projId");
    reqId = sessionStorage.getItem("reqId");
    if (reqId === undefined) {
        reqId = '';
    } else {
        sessionStorage.removeItem("reqId");
    }
    sessionStorage.removeItem("projId");
    GetDoc(projId).then(function (project) {
        console.log(project);
        thisProject = project;
        var requests;
        if (project.Company.Name) {
            $("#companyName span").text(project.Company.Name);
        }
        if (project.Date) {
            $("#date span").text(project.Date);
        }
        if (project.Name) {
            $("#projectName span").text(project.Name);
        }
        if (project["Project Type"]) {
            $("#projectType span").text(project["Project Type"]);
        }
        if (project.Notes) {
            $("#projectNotes span").text(project.Notes);
        }
        if (project['Location']['Address']) {
            $("#projectStartAddress span").text(project['Location']['Address']);
        }
        $(".requestContainer").empty();
        if (requests = project.Requests) {
            for (const key in requests) {
                $(".requestContainer").append(showRequest(requests[key]));
            }
        }
        var lat = project['Location']['Latitude'];
        var lng = project['Location']['Longitude'];
        pickUpLat = lat;
        pickUpLng = lng;
        SetLatLong(lat, lng, 'Pick Up Location');
        $("#ClockOutButton").hide();
    });
    // DynamicFooter();
}

function ShowPickUpLocation() {
    SetLatLong(pickUpLat, pickUpLng, 'Pick Up Location');
}
function ShowDropOffLocation() {
    SetLatLong(dropOffLat, dropOffLng, 'Drop Off Location');
}
function SetLatLong(lat, lng, name) {
    mymap.setView([lat, lng], 13);
    if (marker !== null) { mymap.removeLayer(marker); }
    marker = L.marker([lat, lng]).addTo(mymap);
    $("#locationTitle").empty();
    $("#locationTitle").append(name);
}

function ShowTravelLogs(logs) {
    $("#TravelLogDiv").empty();
    var html = '<table><tr><th>Start</th><th>End</th><th>Date</th><th>Notes</th></tr>';
    for (var i = 0; i < logs.length; i++) {
        html += '<tr><td>' + logs[i]['Start'] + '</td><td>' + logs[i]['End'] + '</td><td>' + logs[i]['Date'] + '</td><td>' + logs[i]['Notes'] + '</td></tr>';
    }
    html += '</table>';
    $("#TravelLogDiv").append(html);
}

function ClockIn() {
    NewLog().then(function (log) {
        var d = new Date();
        log['Date'] = new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
        log['Start'] = d.toLocaleTimeString().split(" ")[0];
        log['End'] = '';
        var temp = gRequest['Travel Logs'].length + 1;
        log['Notes'] = 'Trip ' + temp;
        gCurrentLog = log;
        $("#ClockInButton").hide();
        $("#ClockOutButton").show();
    });
}

function ClockOut() {
    var d = new Date();
    gCurrentLog['End'] = d.toLocaleTimeString().split(" ")[0];
    gRequest['Travel Logs'].push(gCurrentLog);
    SaveDoc(gRequest).then(function (result) {
        gCurrentLog = null;
        gRequest = result;
        $("#ClockInButton").show();
        $("#ClockOutButton").hide();
        ShowTravelLogs(result['Travel Logs']);
    });
}

async function NewLog() {
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.label = "Travel Log";
    const result = await $.ajax({
        type: "PUT",
        url: "/api/document/new/packed",
        data: obj,
        cache: false,
        dataType: "json",
        //contentType: "application/x-www-form-urlencoded",
        success: function (results) { },
        error: function (results) {
            console.log(results.statusText);
        },
    });
    return result;
}

function showRequest(request) {
    if (!request) return;
    if (reqId === '' || reqId === request.id) {
        gRequest = request;
        // $("#projectStartTime span").empty();
        $("#projectStartTime span").text(request.Start);
        $("#projectDropOffAddress span").text(request['Location']['Address']);
        $("#projectMaterial span").text(request['Material']['Name']);
        $("#pageTitle").text('PROJECT : ' + request['Material']['Name']);
        dropOffLat = request['Location']['Latitude'];
        dropOffLng = request['Location']['Longitude'];
        var html = '';
        var list = request['Truck Types'];
        for (var i = 0; i < list.length; i++) {
            if (i > 0) { html += ', '; }
            html += list[i]['Name'];
        }
        $("#projectTruckTypes span").text(html);
        ShowTravelLogs(request['Travel Logs']);
        return;
    } else {
        return;
    }
}