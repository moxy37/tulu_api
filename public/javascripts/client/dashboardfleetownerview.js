function PageLoadFunction() {
    console.log(gUser)
    GetDocs('Project', 'Project Status', 'Open', 'false').then(function (projects) {
        console.log(JSON.stringify(projects));
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
    var name = '';// project['Name'];
    var t = '';// project['Project Type'];
    var status = '';// project['Project Status'];
    var reqs = 0;
    var display = false;
    for (var i = 0; i < project.fields.length; i++) {
        if (project.fields[i].fieldDefinition.label === 'Name') {
            name = project.fields[i].value.value;
        } else if (project.fields[i].fieldDefinition.label === 'Project Type') {
            t = project.fields[i].value.value;
        } else if (project.fields[i].fieldDefinition.label === 'Project Status') {
            status = project.fields[i].value.value;
        } else if (project.fields[i].fieldDefinition.label === 'Requests') {
            reqs = project.fields[i].value.entities.length;
        } else if (project.fields[i].fieldDefinition.label === 'Companies') {
            for (var j = 0; j < project.fields[i].value.entities.length; j++) {
                if (project.fields[i].value.entities[j].id === gUser.companyId) {
                    display = true;
                }
            }
        }
    }
    if (display) {
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
    }
    return html;
}

function viewProjectDetails(projId) {
    sessionStorage.setItem("projId", projId);
    LocationChange('seeMoreProject');
    return false;
}