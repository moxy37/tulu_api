var operatorsList = false;
var thisProject = false;

function PageLoadFunction() {
    console.log(gUser);
    var projId = sessionStorage.getItem("projId");
    sessionStorage.removeItem("projId");
    GetDocs('Operator').then(function (operators) {
        operatorsList = operators;
    });
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
        $(".requestContainer").empty();
        if (requests = project.Requests) {
            for (const key in requests) {
                $(".requestContainer").append(showRequest(requests[key]));
            }
        }
        $('.requests').click(function () {
            const requestId = $(this).val();
            if ($(this).prop('checked') == true) {
                operatorToAssign = gUser.operator;
                console.log(gUser.operator);
                var requestToUpdate = $.grep(project.Requests, function (obj) { return obj.id === requestId; })[0];
                if (operatorToAssign) {
                    console.log('requestToUpdate');
                    console.log(requestToUpdate);
                    requestToUpdate.Operator = operatorToAssign;
                    console.log(requestToUpdate);
                    SaveDoc(requestToUpdate).then(function (request) {
                        location.reload();
                    });
                }
            }
            else {
                //$(this).parent().removeClass('active');
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
    var html = `<li class="request">
                    <input type="checkbox" class="requests" value="` + request.id + `">
                    <label for="">Start ` + request.Start + `</label>`;
    html += ` - ` + request['Location']['Address'];
    if (request.Operator && request.Operator.User.Name != 'dummy') {
        html += '<br><span class="operator">' + request.Operator.User.Name + '</span>';
        // if (operatorsList) {
        //     html += `<div class="operator-select"><select id="` + request.id + `">
        //                 <option>Select an operator</option>`;
        //     for (const key in operatorsList) {
        //         html += '<option value="' + operatorsList[key].User.id + '">' + operatorsList[key].User.Name + '</option>';
        //     }
        //     html += `</select>
        //                 <div class="operator-select-buttons">
        //                     <button class="button operator-select-ok" type="button">OK</button>
        //                     <button class="button operator-select-cancel" type="button">Cancel</button>
        //                 </div>`;
        // }
    }
    html += '</li>';
    return html;
}