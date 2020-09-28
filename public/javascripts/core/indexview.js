function LoadAllDocDefs() {
    $.ajax({
        type: "GET",
        url: "/api/definition/document/list",
        cache: false,
        dataType: "json",
        success: function(results) {
            var html = '<select id="DocDefSelect" onchange="LoadDocumentsByDocDefId();">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].id + '">' + results[i].label + '</option>';
            }
            html += '</select><input type="button" class="btn" value="New" onclick="IndexMakeNewDocument();" />';
            html += '<input type="button" class="btn" value="Test Report" onclick="TestReportList();" />';
            html += '<div id="DocDefIdDiv"></div><br /><div id="DocListDiv"></div>';
            $("#DocDefList").empty();
            $("#DocDefList").append(html);
        },
        error: function(results) {}
    });
}

function TestReportList() {
    var id = $("#DocDefSelect option:selected").val();
    $.ajax({
        type: "GET",
        url: "/api/definition/docdef/field/list/" + id,
        cache: false,
        dataType: "json",
        success: function(results) {
            var html = '<select id="ReportFieldDefinitionListSelect">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].ids + '">' + results[i].labels + '</option>';
            }
            html += '</select>';
            $("#Results").empty();
            $("#Results").append(html);
        },
        error: function(results) {}
    });
}

function IndexMakeNewDocument() {
    var id = $("#DocDefSelect option:selected").val();
    MakeNewDocument(id);
}


function LoadDocumentsByDocDefId() {
    //documents_by_doc_def_id
    var id = $("#DocDefSelect option:selected").val();
    $("#DocDefIdDiv").empty();
    $("#DocDefIdDiv").append(id);
    $("#Results").empty();
    gDoc = new Object();
    gDocStack = new Array();
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
            html += '</select></td><td><input type="button" class="btn btn-primary" value="Load" onclick="LoadDocumentForPage();"  /></td>';
            html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteDocumentForPage();" /></td></tr></table>';
            $("#DocListDiv").empty();
            $("#DocListDiv").append(html);
        },
        error: function(results) {}
    });
}

function LoadDocumentForPage() {
    var id = $("#DocSelect option:selected").val();
    GetDocumentByDocumentId(id);
}

function DeleteDocumentForPage() {
    var id = $("#DocSelect option:selected").val();
    $.ajax({
        type: "GET",
        url: "/api/document/delete/" + id,
        cache: false,
        dataType: "json",
        success: function(results) {
            alert("Doc deleted");
        },
        error: function(results) {}
    });
}

function OrderTest() {
    var id = 1;
    $.ajax({
        type: "GET",
        url: "/api/order/new/" + id,
        cache: false,
        dataType: "json",
        success: function(results) {

            $("#TestResults").empty();
            $("#TestResults").append(JSON.stringify(results));


        },
        error: function(results) {
            alert("Fail");
            $("#TestResults").empty();
            $("#TestResults").append(JSON.stringify(results));
        }
    });
}

function PageLoadFunction() {
    // $("#Results").hide();
    // $("#ActionDiv").hide();
    $("#Home").addClass('active');
    LoadAllDocDefs();
}

