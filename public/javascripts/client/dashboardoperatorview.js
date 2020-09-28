var currentProjects = false;
var upcomingProjects = false;

function PageLoadFunction() {
    GetProjects().then(function (projects) {
        console.log(projects);
        $("#upcoming-projects").empty();
        for (const key in projects) {
            console.log(projects[key]);
            $("#upcoming-projects").append(showProject(projects[key]));
        }
    });
    DynamicFooter();
    $(".clock-in").click(function () {
        if ($('.clock-in').hasClass('in')) {
            $('.clock-in').removeClass('in').addClass('out').text("Clock In");
        }
        else {
            $('.clock-in').removeClass('out').addClass('in').text("Clock Out");
        }
    });
}

function showProject(project) {
    if (!project) return;
    var html = `<section class="projectInfoContainer">
            <div class= "projectInfo">
                <p><b>` + project.projectName + `</b></p>
                <p><b>Type : </b><span>` + project.requestName + `</span></p>
                <p><b>Date : </b><span>` + project.date + `</span></p>
            </div>
            <div class="seeIconContainer">
                <a onclick="viewProjectDetails(\'` + project.projectId + `\',\'` + project.requestId + `\');"><i class="far fa-eye fa-lg"></i></a>
            </div>
        </section>`;
    return html;
}

function viewProjectDetails(projId, reqId) {
    // console.log("this");
    // console.log(projId);
    sessionStorage.setItem("projId", projId);
    sessionStorage.setItem("reqId", reqId);
    LocationChange('seeProjectDetailsOp');
    return false;
}

async function GetProjects() {
    var obj = new Object();
    obj.tokenId = tokenId;
    //obj.isPacked = "true";
    const result = await $.ajax({
        type: "PUT",
        url: "/api/company/operator/requests/list",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) { },
        error: function (results) {
            console.log(results.statusText);
        },
    });
    return result;
}

function Punchin() {
    console.log($(this));
    // var obj = new Object();
    // obj.tokenId = tokenId;
    // obj.label = "Travel Log";
    // obj.start = "test";
    // obj.end = "test2";
    // obj.date = "test";
    // obj.notes = "foo";
    // const result = $.ajax({
    //     type: "PUT",
    //     url: "/api/document/new/packed",
    //     data: obj,
    //     cache: false,
    //     dataType: "json",
    //     contentType: "application/x-www-form-urlencoded",
    //     success: function (results) {
    //         console.log(results);
    //     },
    //     error: function (results) {
    //         console.log(results.statusText);
    //     },
    // });
}