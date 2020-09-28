function PageLoadFunction() {
    // alert(gUser.companyId);
    GetDocs('Project', 'Company', gUser.companyId, "false").then(function (projects) {
        $("i.fa-spinner").remove();
        count = 0;
        for (const key in projects) {
            console.log(projects[key]);
            $(showProject(projects[key])).insertAfter("main h3");
            // count++;
            // if (count > 3) {
            //     break;
            // }
        }
    });
    DynamicFooter();
}

function showProject(project) {
    if (!project) return;
    var name = '';
    var t = '';
    var status = '';
    var reqs = 0;

    for (var i = 0; i < project.fields.length; i++) {
        if (project.fields[i].fieldDefinition.label === 'Name') {
            name = project.fields[i].value.value;
        } else if (project.fields[i].fieldDefinition.label === 'Project Type') {
            t = project.fields[i].value.value;
        } else if (project.fields[i].fieldDefinition.label === 'Project Status') {
            status = project.fields[i].value.value;
        } else if (project.fields[i].fieldDefinition.label === 'Requests') {
            reqs = project.fields[i].value.entities.length;
        }
    }
    var html = `<section class="projectInfoContainer">
            <div class= "projectInfo">
                <p><b>` + name + `</b></p>
                <p>Type : <span>` + t + `</span></p>
                <p>Status : <span>` + status + `</span></p>
                <p>Request : <span>` + reqs + `</span></p>
            </div>
            <div class="seeIconContainer">
                <a onclick="viewProjectDetails(\'` + project.id + `\');"><i class="far fa-eye fa-lg"></i></a>
            </div>
        </section>`;
    return html;
}

function viewProjectDetails(projId) {
    sessionStorage.setItem("projId", projId);
    LocationChange('seeMoreProject');
    return false;
}