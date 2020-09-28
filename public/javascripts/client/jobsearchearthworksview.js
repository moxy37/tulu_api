function PageLoadFunction() {

    // GetDocs('Company').then(function (companies) {
    //     for (const key in companies) {
    //         GetDocs('Project', 'Company', companies[key].id).then(function (projects) {
    //             companies[key].numProjects = projects.length;
    //             $(showCompany(companies[key])).insertAfter("main .title");
    //         });
    //     }
    // });
    GetCompanies().then(function (companies) {
        console.log(companies);
        for (const key in companies) {
            GetDocs('Project', 'Company', companies[key].id).then(function (projects) {
                companies[key].numProjects = projects.length;
                $(showCompany(companies[key])).insertAfter("main .title");
            });
        }
    });
    DynamicFooter();
}

async function GetCompanies() {
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.isPacked = "true";
    const result = await $.ajax({
        type: "PUT",
        url: "/api/company/owner/requests/list",
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

function showCompany(company) {
    //console.log(project["Requests"]);
    if (!company) return;
    //console.log(company);
    var html = `<div class="companyContainer">
                    <div class="companyInfo">
                        <p class="companyName">` + company["Name"] + `</p>
                    </div>
                    <a class="button" onclick="viewCompanyDetails(\'` + company["id"] + `\');">` + company.numProjects + ` Projects</a>
                </div>`;
    return html;
}

function viewCompanyDetails(companyId) {
    sessionStorage.setItem("companyId", companyId);
    LocationChange('JobSearchProjects');
    return false;
}