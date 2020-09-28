var gFd = new Object();
var gDd = new Object();
var gFdList = new Object();

function LoadAllDocDefs() {
    $.ajax({
        type: "GET",
        url: "/api/definition/document/list/" + tokenId,
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table><tr><td><select id="DocDefSelect" onchange="ShowDocDefId();">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].id + '">' + results[i].label + '</option>';
                // html += '<input type="button" class="btn" value="' + results[i].label + '" onclick="LoadDocDef(\'' + results[i].id + '\');"  />';
                // html += '</td><td>';
                // html += '<input type="button" class="btn btn-primary" value="Make New ' + results[i].label + '" onclick="MakeNewDocument(\'' + results[i].id + '\');" /></td>';
                // html += '<td>' + results[i].id + '</td></tr>';
            }
            html += '</select></td><td><input type="button" class="btn" value="Load" onclick="LoadDocDef();"  /></td><td>';
            html += '<input type="button" class="btn btn-primary" value="Make new Doc Def" onclick="MakeNewDocDef();" /></td><td>';
            html += '<div id="DocDefIdDiv"></div></td></tr>';
            html += '</table>';
            $("#DocDefList").empty();
            $("#DocDefList").append(html);
        },
        error: function (results) { }
    });
}

function LoadDocDef() {
    var id = $("#DocDefSelect option:selected").val();
    var obj = new Object();
    obj.id = id;
    obj.tokenId = tokenId;
    $("#DocDefIdDiv").empty();
    $("#DocDefIdDiv").append(id);
    $.ajax({
        type: "PUT",
        url: "/api/definition/document/get",
        cache: false,
        data: obj,
        dataType: "json",
        success: function (results) {
            gDd = ShowDocDefHTML(results);
        },
        error: function (results) { }
    });
}

function MakeNewDocDef() {
    $.ajax({
        type: "GET",
        url: "/api/definition/document/new",
        cache: false,
        dataType: "json",
        success: function (results) {
            gDd = ShowDocDefHTML(results);
        },
        error: function (results) { }
    });
}

function RemoveFieldDef(i) {
    var dd = UpdateDocDef(gDd);
    dd.fieldDefinitions.splice(i, 1);
    gDd = ShowDocDefHTML(dd);
}

function ShowDocDefHTML(dd) {
    //dd.fieldDefIdList = [];
    var html = '<table><tr><td>Label:</td><td> <input type="text" id="DdLabel" value="' + dd.label + '" /></td>';
    var tempText = '';
    if (dd.isCached === true) {
        tempText = ' checked';
    }
    html += '<td><input type="checkbox" id="DdIsCached"' + tempText + ' />Cached</td>';
    html += '<td><input type="text" id="DdCustomToString" value="' + dd.customToString + '" /></td>';
    html += '<td><input type="button" class="btn" value="Add Field to Definition" onclick="AddToDocDef();" /></td>';
    html += '<td><input type="button" class="btn btn-primary" value="Save Doc Definition" onclick="SaveDocDef();" /></td></tr></table>';
    html += '<table id="DocDefFieldTable"><tr><th>Doc Def</th><th>Sequence</th><th></th><th></th></tr>';
    var idList = '';
    for (var i = 0; i < dd.fieldDefinitions.length; i++) {
        html += '<tr><td>' + dd.fieldDefinitions[i].label + '</td><td>' + i + '</td><td><input type="button" class="btn" value="Remove" onclick="RemoveFieldDef(\'' + i + '\')" /></td><td>' + dd.fieldDefinitions[i].id + '</td></tr>';
        if (i > 0) { idList += ';'; }
        idList += dd.fieldDefinitions[i].id;
        //dd.fieldDefIdList.push(dd.fieldDefinitions[i].id);
    }
    html += '</table>';

    html += '<input type="hidden" id="FdIdList" value="' + idList + '" />';
    $("#Results").empty();
    $("#Results").append(html);
    return dd;
}

function AddToDocDef() {
    var dd = UpdateDocDef(gDd);
    var id = $("#FieldDefinitionSelect option:selected").val();
    dd.fieldDefinitions.push(gFdList[id]);
    gDd = ShowDocDefHTML(dd);
}

function UpdateDocDef(dd) {
    dd.label = $("#DdLabel").val();
    dd.fieldDefIdList = $("#FdIdList").val();
    dd.isCached = $('#DdIsCached').prop('checked');
    dd.customToString = $("#DdCustomToString").val();
    return dd;
}

function SaveDocDef() {
    var dd = UpdateDocDef(gDd);
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.dd = dd;
    $.ajax({
        type: "POST",
        url: "/api/definition/document/save",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            var data = results;
            gDd = data;
            location.reload(true);
            return data;
        },
        error: function (results) {
            alert("Error Saving Doc Def");
            location.reload(true);
        }
    });
}

function LoadAllFieldDefs() {
    $.ajax({
        type: "GET",
        url: "/api/definition/field/list",
        cache: false,
        dataType: "json",
        success: function (results) {
            gFdList = new Object();
            var html = '<table><tr><td><select id="FieldDefinitionSelect">';
            for (var i = 0; i < results.length; i++) {
                gFdList[results[i].id] = results[i];
                html += '<option value="' + results[i].id + '">' + results[i].label + '</option>';
            }
            html += '</select></td><td>';
            // html += '<input type="text" value="0" id="FdIndex" />';
            html += '<input type="button" class="btn" value="Load Field Definition" onclick="GetFieldDefinition();" /></td><td>';
            html += '<input type="button" class="btn btn-primary" value="Make New Field Def" onclick="MakeNewFieldDef();" /></td></tr></table>';
            $("#ResultList").empty();
            $("#ResultList").append(html);
        },
        error: function (results) { }
    });
}

function GetFieldDefinition() {
    var id = $("#FieldDefinitionSelect option:selected").val();
    $.ajax({
        type: "GET",
        url: "/api/definition/field/get/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            gFd = ShowFieldDefHTML(results);
        },
        error: function (results) { }
    });
}

function MakeNewFieldDef() {
    $.ajax({
        type: "GET",
        url: "/api/definition/field/new",
        cache: false,
        dataType: "json",
        success: function (results) {
            gFd = ShowFieldDefHTML(results);
        },
        error: function (results) { }
    });
}

function SaveFieldDef() {
    var fd = UpdateFieldDef(gFd);
    var text = JSON.stringify(fd);
    var obj = new Object();
    obj.text = text;
    obj.tokenId = tokenId;
    $.ajax({
        type: "POST",
        url: "/api/definition/field/save",
        data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function (results) {
            location.reload(true);
            // gFd = ShowFieldDefHTML(results);
        },
        error: function (results) {
            alert("Error Saving Field Def");
            location.reload(true);
        }
    });
}

function ShowFieldDefHTML(fd) {
    var html = 'Label: <input type="text" id="FdLabel" value="' + fd.label + '" /><br/>';
    // html += 'Field Data Type: <input type="text" id="FdType" value="' + fd.fieldDataType + '" /><br/>';
    html += 'Field Data Type: <select id="FdType">';
    if (fd.fieldDataType === 0) { html += '<option value="0" selected="selected">String</option>'; } else { html += '<option value="0">String</option>'; }
    if (fd.fieldDataType === 1) { html += '<option value="1" selected="selected">Integer</option>'; } else { html += '<option value="1">Integer</option>'; }
    if (fd.fieldDataType === 2) { html += '<option value="2" selected="selected">Float</option>'; } else { html += '<option value="2">Float</option>'; }
    if (fd.fieldDataType === 3) { html += '<option value="3" selected="selected">Date-Time</option>'; } else { html += '<option value="3">Date-Time</option>'; }
    if (fd.fieldDataType === 4) { html += '<option value="4" selected="selected">Boolean</option>'; } else { html += '<option value="4">Boolean</option>'; }
    // if (fd.fieldDataType === 5) { html += '<option value="5" selected="selected">UUID</option>'; } else { html += '<option value="5">UUID</option>'; }
    if (fd.fieldDataType === 6) { html += '<option value="6" selected="selected">Select-String</option>'; } else { html += '<option value="6">Select-String</option>'; }
    // if (fd.fieldDataType === 7) { html += '<option value="7" selected="selected">File</option>'; } else { html += '<option value="7">File</option>'; }
    if (fd.fieldDataType === 8) { html += '<option value="8" selected="selected">Select-Float</option>'; } else { html += '<option value="8">Select-Float</option>'; }
    if (fd.fieldDataType === 9) { html += '<option value="9" selected="selected">Select-Integer</option>'; } else { html += '<option value="9">Select-Integer</option>'; }
    if (fd.fieldDataType === 10) { html += '<option value="10" selected="selected">Text</option>'; } else { html += '<option value="10">Text</option>'; }
    if (fd.fieldDataType === 17) { html += '<option value="17" selected="selected">Password</option>'; } else { html += '<option value="17">Password</option>'; }
    if (fd.fieldDataType === 18) { html += '<option value="18" selected="selected">Unique String</option>'; } else { html += '<option value="18">Unique String</option>'; }
    if (fd.fieldDataType === 11) { html += '<option value="11" selected="selected">Document-Pointer</option>'; } else { html += '<option value="11">Document-Pointer</option>'; }
    if (fd.fieldDataType === 12) { html += '<option value="12" selected="selected">Document</option>'; } else { html += '<option value="12">Document</option>'; }
    if (fd.fieldDataType === 13) { html += '<option value="13" selected="selected">Pointer-Group</option>'; } else { html += '<option value="13">Pointer-Group</option>'; }
    if (fd.fieldDataType === 14) { html += '<option value="14" selected="selected">Document-Group</option>'; } else { html += '<option value="14">Document-Group</option>'; }

    html += '</select><br/>';
    html += 'Is Tracked: <select id="FdIsTracked">';
    var tempSelect = '<option value="1">Yes</option><option value="0" selected="selected">No</option>';
    if (fd.isTracked !== undefined) {
        if (fd.isTracked === true) {
            tempSelect = '<option value="1" selected="selected">Yes</option><option value="0">No</option>';
        }
    }
    html += tempSelect + '</select><br/>';
    html += 'Default Value: <input type="text" id="FdDefaultValue" value="' + fd.defaultValue + '" /><br/>';

    html += '<div id="ListOfValues"><table id="ListOfValues"><tr><th>Value</th><th>Sequence</th><th></th></tr>';
    if (fd.listOfValues !== undefined) {

        for (var i = 0; i < fd.listOfValues.length; i++) {
            html += '<tr><td>' + fd.listOfValues[i].value + '</td><td>' + i + '</td><td><input type="button" class="btn" value="Remove" onclick="RemoveFromList(\'' + i + '\');" /></td></tr>';
        }
    }
    html += '</table><input type="text" id="NewFieldValue" value="" /><input type="button" class="btn" value="Add To List" onclick="AddToListOfValues();" /><br />';
    html += '<input type="button" class="btn btn-primary" value="Save Field Definition" onclick="SaveFieldDef();" />';
    $("#Results").empty();
    $("#Results").append(html);
    return fd;
}

function RemoveFromList(i) {
    var index = parseInt(i);
    var fd = UpdateFieldDef(gFd);
    fd.listOfValues.splice(index, 1);
    gFd = ShowFieldDefHTML(fd);
}

function NewUUID() {
    //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    var uuid = '',
        ii;
    for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
            case 8:
            case 20:
                uuid += '-';
                uuid += (Math.random() * 16 | 0).toString(16);
                break;
            case 12:
                uuid += '-';
                uuid += '4';
                break;
            case 16:
                uuid += '-';
                uuid += (Math.random() * 4 | 8).toString(16);
                break;
            default:
                uuid += (Math.random() * 16 | 0).toString(16);
        }
    }
    return uuid;
}

function AddToListOfValues() {
    var fd = UpdateFieldDef(gFd);
    // var temp = '';
    // for (var i = 0; i < fd.listOfValues.length; i++) {
    //     if (i > 0) {
    //         temp += ';';
    //     }
    //     temp += fd.listOfValues[i].value;
    // }
    var value = $("#NewFieldValue").val();
    var fv = new Object();
    fv.id = NewUUID();
    fv.fieldId = '';
    fv.fieldDataType = parseInt(fd.fieldDataType);
    fv.isNew = true;
    if (fv.fieldDataType === 6) {
        fv.value = $("#NewFieldValue").val();
    } else if (fv.fieldDataType === 8) {
        fv.value = parseFloat($("#NewFieldValue").val());
    } else if (fv.fieldDataType === 9) {
        fv.value = parseInt($("#NewFieldValue").val());
    }
    if (fd.listOfValues === undefined) {
        fd.listOfValues = new Array();
    }
    fd.listOfValues.push(fv);
    gFd = ShowFieldDefHTML(fd);
}

function UpdateFieldDef(fd) {
    fd.label = $("#FdLabel").val();
    fd.fieldDataType = parseInt($("#FdType option:selected").val());
    fd.defaultValue = $("#FdDefaultValue").val();
    var temp = $("#FdIsTracked option:selected").val();
    if (temp === "1") {
        fd.isTracked = true;
    } else {
        fd.isTracked = false;
    }
    // fd.tempListOfValues = '';
    return fd;
}

function PageLoadFunction() {
    // $("#Results").hide();
    // $("#ActionDiv").hide();
    $("#Defs").addClass('active');
    LoadAllFieldDefs();
    LoadAllDocDefs();

}

function ShowDocDefId() {
    var id = $("#DocDefSelect option:selected").val();
    $("#DocDefIdDiv").empty();
    var h = id + '<input type="button" class="btn" value="Make New" onclick="IndexMakeNewDocument();" />';
    $("#DocDefIdDiv").append(h);
    $("#Results").empty();
    gDoc = new Object();
    gDocStack = new Array();
    var obj = new Object();
    obj.id = id;
    obj.tokenId = tokenId;
    $.ajax({
        type: "PUT",
        url: "/api/document/listbydocdefid",
        data: obj,
        contentType: "application/x-www-form-urlencoded",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<table><tr><td><select id="DocSelect">';
            results.forEach(function (result) {
                html += '<option value="' + result.id + '">' + result.toString + '</option>';
            });
            for (var i = 0; i < results.length; i++) {

                // html += '<input type="button" class="btn" value="Load ' + results[i].toString + '" onclick="GetDocumentByDocumentId(\'' + results[i].id + '\');"  />';

            }
            html += '</select></td><td><input type="button" class="btn btn-primary" value="Load" onclick="LoadDocumentForPage();"  /></td>';
            html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteDocumentForPage();" /></td></tr></table>';
            $("#DocListDiv").empty();
            $("#DocListDiv").append(html);
        },
        error: function (results) { }
    });
}


function LoadDocumentForPage() {
    var id = $("#DocSelect option:selected").val();
    GetDocumentByDocumentId(id);
}


function DeleteDocumentForPage() {
    var id = $("#DocSelect option:selected").val();
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.id = id;
    $.ajax({
        type: "PUT",
        url: "/api/document/delete",
        data: obj,
        cache: false,
        dataType: "json",
        success: function (results) {
            alert("Doc deleted");
        },
        error: function (results) {
            alert("Error");
        }
    });
}

function LocalDeleteCallback() {
    var html = "<h3>Item deleted Deleted</h3>";
    $("#Messages").empty();
    $("#Messages").append(html);
    PageLoadFunction();
}

function LocalLoadCallback() {
    // $("#ListRows").hide();
}

function LocalSaveCallback(result) {
    ClosePopup(function () {
        PageLoadFunction();
        //   $("#ListRows").show();
    });
}

function LocalCloseCallback() {
    // $("#ListRows").show();
    PageLoadFunction();
}

function IndexMakeNewDocument() {
    var id = $("#DocDefSelect option:selected").val();
    MakeNewDocument(id);
}

function TestThis() {
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.userId = gUser.id;
    obj.companyId = gUser.companyId;

    $.ajax({
        type: "PUT",
        url: "/api/company/project/new",
        data: obj,
        contentType: "application/x-www-form-urlencoded",
        cache: false,
        dataType: "json",
        success: function (results) {
            // $("#Messages").append(JSON.stringify(results));
            LoadPopup(results, "Results");
        },
        error: function (results) {
            alert("Error");
        }
    });

    // LoadPopup(doc, divId) 
}