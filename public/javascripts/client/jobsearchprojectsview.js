function PageLoadFunction() {
    var companyId = sessionStorage.getItem("companyId");
    sessionStorage.removeItem("companyId");
    GetDocs('Project', 'Company', companyId).then(function (projects) {
        if (projects[0] && projects[0].Company.Name) {
            $("header h1").text(projects[0].Company.Name);
        }
        $("i.fa-spinner").remove();
        for (const key in projects) {
            $("main").prepend(showProject(projects[key]));
        }
    });
    DynamicFooter();
}

function showProject(project) {
    if (!project) return;
    var html = `<section class="projectInfoContainer">
            <div class= "projectInfo">
                <p>` + project["Name"] + `</p>
                <p>Type : <span>` + project["Project Type"] + `</span></p>
                <p>Request : <span>` + project["Requests"].length + `</span></p>
            </div>
            <div class="seeIconContainer">
                <a class="viewProjectDetails" onclick="viewProjectDetails(\'` + project["id"] + `\');"><i class="far fa-eye fa-lg"></i></a>
            </div>
        </section>`;
    return html;
}

function viewProjectDetails(projId) {
    console.log("this");
    console.log(projId);
    sessionStorage.setItem("projId", projId);
    LocationChange('seeMoreProject');
    return false;
}