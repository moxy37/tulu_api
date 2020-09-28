var operatorsList = false;
var thisProject = false;


function LoadEditProjectPage() {
    // var projId = sessionStorage.getItem("projId");
    location.href = '/newProject?tokenId=' + tokenId + '&projectId=' + thisProject.id;
}


function PageLoadFunction() {
    var projId = sessionStorage.getItem("projId");
    //sessionStorage.removeItem("projId");
    // GetDocs('Operator').then(function (operators) {
    //     operatorsList = operators;
    // });
    GetOperatorsOfCompany().then(function (operators) {
        console.log(operators);
        operatorsList = operators;
    });
    GetDoc(projId, 'true').then(function (project) {
        //console.log(project.Requests);
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
        if (project.User.Name) {
            $("#projectNotes span").text(project.User.Name);
        }
        if (project.Location.Address) {
            var hhh = 'Pick Up Location: <span >' + project.Location.Address + '<i class="fas fa-map-marker-alt" style="padding-left: 20px;"></i></span>';
            $("#startLocation").empty();
            $("#startLocation").append(hhh);
        }
        $(".requestContainer").empty();
        if (requests = project.Requests) {
            for (const key in requests) {
                $(".requestContainer").append(showRequest(requests[key]));
            }
        }
        $('.requests').click(function () {
            if ($(this).prop('checked') == true) {
                $(this).parent().addClass('active');
            }
            else {
                $(this).parent().removeClass('active');
            }
        });
        $('.operator-select-cancel').on('click', function () {
            var $thisRequest = $(this).parent().parent().parent();
            $thisRequest.removeClass('active');
            $thisRequest.find(".requests").closest('.requests').prop('checked', false);
        });
        $('.operator-select-ok').on('click', function () {

            var requestId = $(this).parent().parent().parent().find(".requests").closest('.requests').val();
            if (requestId) {
                var requestToUpdate = $.grep(project.Requests, function (obj) { return obj.id === requestId; })[0];
                var assignToOperatorID = $(this).parent().parent().find("select").val();
                var assignToOperator = $.grep(operatorsList, function (obj) {
                    return obj.User.id === assignToOperatorID;
                })[0];
                if (assignToOperator) {
                    requestToUpdate.Operator = assignToOperator;
                    SaveDoc(requestToUpdate).then(function (request) {
                        location.reload();
                    });
                }
            }
        });
    });
    DynamicFooter();
}

function showRequest(request) {
    if (!request) return;
    var ttt = '';
    if (request.Location.Address) { ttt = '<span >Drop Off Location: ' + request.Location.Address + '<i class="fas fa-map-marker-alt" style="padding-left: 20px;"></i></span>'; }
    var html = `<li class="request"><input type="checkbox" class="requests" value="` + request.id + `"> <label for="">Start ` + request.Start + ` - ` + request.Material.Name + ` - ` + ttt + `</label>`;
    if (request.Operator) {
        if (request.Operator.User.Name != 'dummy')
            html += '<br><span class="operator">' + request.Operator.User.Name + '</span>';
        if (operatorsList) {
            html += `<div class="operator-select"><select id="` + request.id + `">
                        <option>Select an operator</option>`;
            for (const key in operatorsList) {
                var oName = operatorsList[key].User.Name;
                if (oName === 'dummy') { oName = 'Leave Open'; }
                html += '<option value="' + operatorsList[key].User.id + '">' + oName + '</option>';
            }
            html += `</select>
                        <div class="operator-select-buttons">
                            <button class="button operator-select-ok" type="button">OK</button>
                            <button class="button operator-select-cancel" type="button">Cancel</button>
                        </div>`;
        }
        html += '</li>';
        return html;
    }
}