var gWorkflow = new Object();

function MakeNewFieldValue(dataType, value) {
    var obj = new Object();
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    obj.id = s.join("");
    obj.isNew = true;
    obj.fieldDataType = dataType;
    obj.fieldId = '';
    switch (dataType) {
        case 0:
            obj.value = value;
            break;
        case 1:
            obj.value = parseInt(value);
            break;
        case 2:
            obj.value = parseFloat(value);
            break;
        case 3:
            obj.value = new Date(value);
            break;
        case 4:
            obj.value = false;
            if (value === "true" || value === "1") {
                obj.value = true;
            }
            break;
        default:
            obj.value = value;
            obj.fieldDataType = 0;
            break;
    }

    gWorkflow.data.push(obj);
    return ShowWorkflowHTML(gWorkflow);
}

function MakeNewWorkflow() {
    $.ajax({
        type: "GET",
        url: "/api/workflow/new",
        cache: false,
        dataType: "json",
        success: function(results) {
            gWorkflow = ShowWorkflowHTML(results);
            $("#WorkflowData").show();
        },
        error: function(results) {}
    });
}

function ShowWorkflowHTML(workflow) {
    $("#labelText").val(workflow.label);
    $("#stepTypeSelect").val(workflow.stepType.toString());
    if (workflow.stepType === 1) {
        $("#subActionSelectDiv").hide();
        $("#subConditionalSelect").val(workflow.subType);
        $("#subConditionalSelectDiv").show();
    } else if (workflow.stepType === 2) {
        $("#subActionSelect").val(workflow.subType);
        $("#subActionSelectDiv").show();
        $("#subConditionalSelectDiv").hide();
    } else {
        $("#subActionSelectDiv").hide();
        $("#subConditionalSelectDiv").hide();
    }
    $("#successIdText").val(workflow.successId);
    $("#failureIdText").val(workflow.failureId);
    var html = '';
    for (var i = 0; i < workflow.data.length; i++) {
        html += '<tr id="Row_' + i + '"><td>' + workflow.data[i].value + '</td><td><input type="button" class="btn" value="Remove" onclick="RemoveFromData(' + i + ');" /></td></tr>';
    }
    $("#dataTable tbody").empty();
    $("#dataTable tbody").append(html);

    return workflow;
}

function RemoveFromData(i) {
    gWorkflow.data.splice(i, 1);
    gWorkflow = ShowWorkflowHTML(gWorkflow);
}

function AddNewData() {
    var value = $("#newDataEntry").val();
    var dataType = parseInt($("#FdType option:selected").val());
    gWorkflow = MakeNewFieldValue(dataType, value);
}

function GetWorkflowById(id) {
    $.ajax({
        type: "GET",
        url: "/api/workflow/get/" + id,
        cache: false,
        dataType: "json",
        success: function(results) {
            gWorkflow = ShowWorkflowHTML(results);
            $("#WorkflowData").show();
        },
        error: function(results) {}
    });
}

function GetAllWorkflows() {
    //get_all_workflows
    $.ajax({
        type: "GET",
        url: "/api/workflow/list",
        cache: false,
        dataType: "json",
        success: function(results) {
            var selectHtml = '';
            var html = '<table><tr><th>id</th><th>Label</th><th>Step</th><th>Sub-Step</th><th>Success Id</th><th>Failure Id</th><th></th></tr>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].id + '</td><td>' + results[i].label + '</td><td>' + results[i].stepType + '</td><td>' + results[i].subType + '</td><td>' + results[i].successId + '</td><td>' + results[i].failureId + '</td>';
                html += '<td><input type="button" class="btn" value="Load" onclick="GetWorkflowById(\'' + results[i].id + '\');" /></td></tr>';
                selectHtml += '<option value="' + results[i].id + '">' + results[i].label + '</option>';
            }
            html += '</table>';
            html += '<br /><input type="button" class="btn btn-primary" value="Make New Workflow" onclick="MakeNewWorkflow();" />';
            $("#WorkflowList").empty();
            $("#successIdText").empty();
            $("#successIdText").append(selectHtml);
            $("#failureIdText").empty();
            $("#failureIdText").append(selectHtml);
            $("#WorkflowList").append(html);
            $("#WorkflowData").hide();
        },
        error: function(results) {}
    });
}

function SaveWorkflow() {
    var workflow = UpdateWorkflow(gWorkflow);
    var text = JSON.stringify(workflow);
    var obj = new Object();
    obj.workflow = text;
    $.ajax({
        type: "POST",
        url: "/api/workflow/save",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function(results) {
            gWorkflow = ShowWorkflowHTML(results);
            GetAllWorkflows();
        },
        error: function(results) {
            alert("Error Saving Workflow");
            location.reload(true);
        }
    });
}

function UpdateWorkflow(workflow) {
    workflow.label = $("#labelText").val();
    workflow.stepType = parseInt($("#stepTypeSelect option:selected").val());
    if (workflow.stepType === 1) {
        workflow.subType = parseInt($("#subConditionalSelect option:selected").val());
    } else if (workflow.stepType === 2) {
        workflow.subType = parseInt($("#subActionSelectDiv option:selected").val());
    } else {
        workflow.subType = 0;
    }
    workflow.successId = $("#successIdText option:selected").val();
    workflow.failureId = $("#failureIdText option:selected").val();
    return workflow;
}

function ChangeSubType() {
    var stepType = parseInt($("#stepTypeSelect option:selected").val());
    if (stepType === 1) {
        $("#subActionSelectDiv").hide();
        $("#subConditionalSelectDiv").show();
    } else if (stepType === 2) {
        $("#subActionSelectDiv").show();
        $("#subConditionalSelectDiv").hide();
    } else {
        $("#subActionSelectDiv").hide();
        $("#subConditionalSelectDiv").hide();
    }
}

function LoadAllDocDefs() {
    $.ajax({
        type: "GET",
        url: "/api/definition/document/list",
        cache: false,
        dataType: "json",
        success: function(results) {
            var html = '<select id="DocDefSelect" onchange="UpdateDocumentList();">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].id + '">' + results[i].label + '</option>';
            }
            html += '</select>';
            html += '<div id="DocDefIdDiv"></div><br /><div id="DocListDiv"></div>';
            $("#DocDefList").empty();
            $("#DocDefList").append(html);
        },
        error: function(results) {}
    });
}

function UpdateDocumentList() {
    var id = $("#DocDefSelect option:selected").val();
    $.ajax({
        type: "GET",
        url: "/api/document/listbydocdefid/" + id,
        cache: false,
        dataType: "json",
        success: function(results) {
            var html = '<table><tr><td><select id="DocSelect">';
            results.forEach(function(result) {
                html += '<option value="' + result.id + '">' + result.toString + '</option>';
            });
            for (var i = 0; i < results.length; i++) {

                // html += '<input type="button" class="btn" value="Load ' + results[i].toString + '" onclick="GetDocumentByDocumentId(\'' + results[i].id + '\');"  />';

            }
            html += '</select></td><td><input type="button" class="btn btn-primary" value="Add To Data" onclick="SelectDocumentToData();"  /></td>';
            html += '</tr></table>';
            $("#DocumentList").empty();
            $("#DocumentList").append(html);
        },
        error: function(results) {}
    });
}

function SelectDocumentToData() {
    var id = $("#DocSelect option:selected").val();
    $("#newDataEntry").val(id);
}

function PageLoadFunction() {
    $("#Workflow").addClass('active');
    GetAllWorkflows();
    LoadAllDocDefs();

}