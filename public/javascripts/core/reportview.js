var gRootNode = new Object();
var cNode = new Object();
var cFilter = new Object();
var cFd = new Object();

function AddFilterToNode(node, nodeId, filter) {
    if (node.id === nodeId) {
        var newFilter = true;
        for (var i = 0; i < node.filters.length; i++) {
            if (node.filters[i].id === filter.id) {
                newFilter = false;
                node.filters[i] = filter;
            }
        }
        if (newFilter === true) { node.filters.push(filter); }
        return node;
    } else {
        if (node.rightNode !== undefined && node.rightNode !== null) {
            node.rightNode = AddFilterToNode(node.rightNode, nodeId, filter);
        }
        if (node.leftNode !== undefined && node.leftNode !== null) {
            node.leftNode = AddFilterToNode(node.leftNode, nodeId, filter);
        }
        return node;
    }
}

function AddChildNode(tree, parentId, node, leftNode = true) {
    if (tree.id === parentId) {
        if (leftNode === true) {
            tree.leftNode = node;
        } else {
            tree.rightNode = node;
        }
        return tree;
    } else {
        if (tree.rightNode !== undefined && tree.rightNode !== null) {
            tree.rightNode = AddChildNode(tree.rightNode, parentId, node, leftNode);
        }
        if (tree.leftNode !== undefined && tree.leftNode !== null) {
            tree.leftNode = AddChildNode(tree.leftNode, parentId, node, leftNode);
        }
        return tree;
    }
}

function GetNode(id) {
    $(".node-containers").hide();
    $("#NodeContainer_" + id).show();
}

function UpdateNodeTree(tree, node) {
    if (tree.id === node.id) {
        tree = node;
        return node;
    } else {
        if (tree.rightNode !== undefined && tree.rightNode !== null) {
            tree.rightNode = UpdateNodeTree(tree.rightNode, node);
        }
        if (tree.leftNode !== undefined && tree.leftNode !== null) {
            tree.leftNode = UpdateNodeTree(tree.leftNode, node);
        }
        return tree;
    }
}

function ShowNodeHTML(node, parentId = '') {
    var html = '<div class="node-containers" id="NodeContainer_' + node.id + '">';
    if (parentId !== '') {
        html += '<input type="button" class="btn" value="Show Parent Node" onclick="GetNode(\'' + parentId + '\');" /><br/>';
    }
    html += 'Or Filter: <select id="OrSelect_' + node.id + '">';
    if (node.orQuery === false) {
        html += '<option value="0" selected="selected">No</option>';
        html += '<option value="1">Yes</option>';
    } else {
        html += '<option value="0">No</option>';
        html += '<option value="1" selected="selected">Yes</option>';
    }
    html += '</select><br/>';
    html += '<table><tr><th>Type</th><th></th><th></th></tr>';
    for (var i = 0; i < node.filters.length; i++) {
        html += '<tr><td>' + node.filters[i].conditionType + '</td><td><input type="button" class="btn" value="Edit" onclick="GetFilter(\'' + node.filters[i].id + '\',\'' + node.id + '\');" /></td>';
        html += '<td><input type="button" class="btn" value="Delete" onclick="DeleteFilter(\'' + node.filters[i].id + '\',\'' + node.id + '\');" /></td></tr>';
    }
    html += '</table><input type="button" class="btn" value="Make New Filter" onclick="MakeNewFilter(\'' + node.id + '\');" /><br/>';

    if (node.rightNode !== undefined && node.rightNode !== null) {
        html += '<input type="button" class="btn" value="Show Right Node" onclick="GetNode(\'' + node.rightNode.id + '\');" />';
    } else {
        html += '<input type="button" class="btn btn-primary" value="Make New Right Node" onclick="MakeNewNode(\'' + node.id + '\',false);" />';
    }
    if (node.leftNode !== undefined && node.leftNode !== null) {
        html += '<input type="button" class="btn" value="Show Left Node" onclick="GetNode(\'' + node.leftNode.id + '\');" />';
    } else {
        html += '<input type="button" class="btn btn-primary" value="Make New Left Node" onclick="MakeNewNode(\'' + node.id + '\',true);" />';
    }
    html += '</div>';


    if (node.rightNode !== undefined && node.rightNode !== null) {
        html += ShowNodeHTML(node.rightNode, node.id);
    }
    if (node.leftNode !== undefined && node.leftNode !== null) {
        html += ShowNodeHTML(node.leftNode, node.id);
    }
    return html;

}

function GetFilter(filterId, nodeId) {
    var node = FindNode(gRootNode, nodeId);
    for (var i = 0; i < node.filters.length; i++) {
        if (node.filters[i].id === filterId) {
            cFilter = ShowFilterHTML(node.filters[i], nodeId);
        }
    }
}

function FindNode(node, nodeId) {
    if (node.id === nodeId) {
        return node;
    } else {
        if (node.leftNode !== null && node.leftNode !== undefined) {
            FindNode(node.leftNode, nodeId);
        }
        if (node.rightNode !== null && node.rightNode !== undefined) {
            FindNode(node.rightNode, nodeId);
        }
    }
}

function MakeNewFilter(nodeId) {
    var filter = MakeNewReportFilter();
    cFilter = ShowFilterHTML(filter, nodeId);
}

function ShowFilterHTML(filter, nodeId) {
    var html = '';
    var ids = '';
    for (var i = 0; i < filter.fieldDefinitionList.length; i++) {
        if (i > 0) { ids += ':'; }
        ids += filter.fieldDefinitionList[i];
    }
    $("#ReportFieldDefinitionListSelect").val(ids);
    $("#FieldDataTypeSelect").val(filter.fieldDataType);
    $("#ConditionTypeSelect").val(filter.conditionType);
    switch (filter.conditionType) {
        case 1:
            if (cFd.fieldDataType === 6 || cFd.fieldDataType === 8 || cFd.fieldDataType === 9) {
                html += '<select id="ReportFilterValueSelect">';
                for (var i = 0; i < cFd.listOfValues.length; i++) {
                    var tempText = '';
                    if (filter.values.length > 0) {
                        if (cFd.listOfValues[i].value === filter.values[0]) {
                            tempText = ' selected="selected" ';
                        }
                    }
                    html += '<option value="' + cFd.listOfValues[i].value + '"' + tempText + '>' + cFd.listOfValues[i].value + '</option>';
                }
                html += '</select><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
            } else {
                html += '<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            }
            break;
        case 2:
            var datePickerText = '';
            if (cFd.fieldDataType === 3) {
                datePickerText = ' ';
            }
            var tempVal = '';
            var tempVal2 = '';
            if (filter.values.length > 1) {
                tempVal = filter.values[0];
                tempVal2 = filter.values[1];
            }
            html += 'Between <input type="text" value="' + tempVal + '" id="ReportFilterValue_0" /> And <input type="text" value="' + tempVal2 + '" id="ReportFilterValue_1" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            break;
        case 3:
            var tempVal = '';
            if (filter.values.length > 0) {
                tempVal = filter.values[0];
            }
            html += 'Greater Than <input type="text" value="' + tempVal + '"  id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            break;
        case 4:
            var tempVal = '';
            if (filter.values.length > 0) {
                tempVal = filter.values[0];
            }
            html += 'Greater Than Or Equal To<input type="text"  value="' + tempVal + '" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            break;
        case 5:
            var tempVal = '';
            if (filter.values.length > 0) {
                tempVal = filter.values[0];
            }
            html += 'Less Than <input type="text"  value="' + tempVal + '" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            break;
        case 6:
            var tempVal = '';
            if (filter.values.length > 0) {
                tempVal = filter.values[0];
            }
            html += 'Less Than Or Equal To<input type="text"  value="' + tempVal + '" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            break;
            // case 7:
            //     html += '<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Add To List" onclick="AddToFilterList();" />';
            //     break;
        case 8:
            var tempVal = '';
            if (filter.values.length > 0) {
                tempVal = filter.values[0];
            }
            html += 'Not Equal To<input type="text"  value="' + tempVal + '" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            break;
            // case 9: break;
        case 10:
            html += 'Like<input type="text"  value="' + tempVal + '" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue(\'' + nodeId + '\');" />';
            break;
            // case 11: break;
            // case 12: break;
    }
    $("#FilterData").empty();
    $("#FilterData").append(html);
    $("#FilterEditor").show();
    $(".node-containers").hide();
    $("#RootNodeContainer").hide();
    return filter;
}

function MakeNewRootNode() {
    var node = MakeNewReportNode();
    gRootNode = node;
    var html = ShowNodeHTML(node);
    $("#RootNodeContainer").hide();
    $("#NodeContainer").empty();
    $("#NodeContainer").append(html);
    $(".node-containers").hide();
    $("#NodeContainer_" + node.id).show();
    $("#FilterEditor").hide();
}

function MakeNewNode(parentId, leftOrRight) {
    var node = MakeNewReportNode();


    gRootNode = AddChildNode(gRootNode, parentId, node, leftOrRight);
    $("#NodeContainer").empty();
    var html = ShowNodeHTML(gRootNode);
    $("#NodeContainer").append(html);
    $("#RootNodeContainer").hide();
    $(".node-containers").hide();
    $("#NodeContainer_" + node.id).show();
    $("#FilterEditor").hide();
}

function UpdateFilterValue(nodeId) {
    var filter = UpdateFilter(cFilter);
    gRootNode = AddFilterToNode(gRootNode, nodeId, filter);
    var html = ShowNodeHTML(gRootNode);
    $("#RootNodeContainer").hide();
    $("#FilterEditor").hide();
    $("#NodeContainer").empty();
    $("#NodeContainer").show();
    $("#NodeContainer").append(html);
    $(".node-containers").hide();
    $("#NodeContainer_" + nodeId).show();
}

function UpdateFilter(filter) {
    var val = $("#ReportFilterValueSelect option:selected").val();
    if (val === undefined) {
        val = $("#ReportFilterValue_0").val();
    }
    var values = [];
    values.push(val);
    val = $("#ReportFilterValue_1").val();
    if (val !== undefined) {
        values.push(val);
    }
    val = $("#ReportFieldDefinitionListSelect option:selected").val();
    filter.fieldDefinitionList = val.split(':');
    filter.values = values;
    filter.conditionType = parseInt($("#ConditionTypeSelect option:selected").val());
    filter.fieldDataType = parseInt($("#FieldDataTypeSelect option:selected").val());
    return filter;
}

function AddToFilterList() {
    var val = $("#ReportFilterValue_0").val();
}

function ChangeConditionType() {

    var ids = $("#ReportFieldDefinitionListSelect option:selected").val();
    var temp = ids.split(':');
    var id = temp[temp.length - 1];
    $.ajax({
        type: "GET",
        url: "/api/definition/field/get/" + id,
        cache: false,
        dataType: "json",
        success: function(result) {
            cFd = result;
            $("#FieldDataTypeSelect").val(cFd.fieldDataType);
            var type = parseInt($("#ConditionTypeSelect option:selected").val());
            var html = '';
            switch (type) {
                case 1:
                    if (cFd.fieldDataType === 6 || cFd.fieldDataType === 8 || cFd.fieldDataType === 9) {
                        html += '<select id="ReportFilterValueSelect">';
                        for (var i = 0; i < cFd.listOfValues.length; i++) {
                            html += '<option value="' + cFd.listOfValues[i].value + '">' + cFd.listOfValues[i].value + '</option>';
                        }
                        html += '</select><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    } else {
                        html += '<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    }
                    break;
                case 2:
                    var datePickerText = '';
                    if (cFd.fieldDataType === 3) {
                        datePickerText = ' ';
                    }
                    html += 'Between <input type="text" id="ReportFilterValue_0" /> And <input type="text" id="ReportFilterValue_1" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    break;
                case 3:
                    html += 'Greater Than <input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    break;
                case 4:
                    html += 'Greater Than Or Equal To<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    break;
                case 5:
                    html += 'Less Than <input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    break;
                case 6:
                    html += 'Less Than Or Equal To<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    break;
                    // case 7:
                    //     html += '<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Add To List" onclick="AddToFilterList();" />';
                    //     break;
                case 8:
                    html += 'Not Equal To<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    break;
                    // case 9: break;
                case 10:
                    html += 'Like<input type="text" value="" id="ReportFilterValue_0" /><input type="button" class="btn" value="Select" onclick="UpdateFilterValue();" />';
                    break;
                    // case 11: break;
                    // case 12: break;
                default:
                    break;
            }
            $("#FilterData").empty();
            $("#FilterData").append(html);
        },
        error: function(results) {}
    });


}

function LoadAllDocDefs() {
    $.ajax({
        type: "GET",
        url: "/api/definition/document/list",
        cache: false,
        dataType: "json",
        success: function(results) {
            var html = '<select id="DocDefSelect" onchange="TestReportList();">';
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

function TestReportList() {
    var id = $("#DocDefSelect option:selected").val();
    $.ajax({
        type: "GET",
        url: "/api/definition/docdef/field/list/" + id,
        cache: false,
        dataType: "json",
        success: function(results) {
            var html = '<select id="ReportFieldDefinitionListSelect" onchange="ChangeFieldSelect();">';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].ids + '">' + results[i].labels + '</option>';
            }
            html += '</select>';
            $("#FieldSelectDiv").empty();
            $("#FieldSelectDiv").append(html);
            $("#RootNodeButton").show();
        },
        error: function(results) {}
    });
}

function ChangeFieldSelect() {
    var ids = $("#ReportFieldDefinitionListSelect option:selected").val();
    var temp = ids.split(':');
    var id = temp[temp.length - 1];
    $.ajax({
        type: "GET",
        url: "/api/definition/field/get/" + id,
        cache: false,
        dataType: "json",
        success: function(result) {
            gFd = result;
            $("#FieldDataTypeSelect").val(gFd.fieldDataType);
        },
        error: function(results) {}
    });
}
//FieldDataTypeSelect

function RunReport() {
    var obj = new Object();
    obj.text = JSON.stringify(gRootNode);
    $.ajax({
        type: "POST",
        url: '/api/report/run',
        data: obj,
        contentType: "application/x-www-form-urlencoded",

        dataType: "json",
        success: function(results) {

            var html = '<table>';
            for (var i = 0; i < results.length; i++) {
                html += '<tr><td>' + results[i].toString + '</td></tr>';
            }
            html += '</table>';
            $("#Messages").empty();
            $("#Messages").append(html);
            $("#Messages").show();
        },
        error: function(results) {}
    });
}

function MakeNewReportFilter() {
    var obj = new Object();
    obj.id = createUUID();
    obj.fieldDefinitionList = [];
    obj.values = [];
    obj.fieldDataType = 0;
    obj.conditionType = 1;
    obj.isNew = true;
    return obj;
}

function MakeNewReportNode() {
    var obj = new Object();
    obj.id = createUUID();
    obj.leftNode = null;
    obj.rightNode = null;
    obj.orQuery = false;
    obj.docDefId = $("#DocDefSelect option:selected").val();
    if (obj.docDefId === undefined) { obj.docDefId = ''; }
    obj.isNew = true;
    obj.filters = [];
    return obj;
}
// LoadAllDocDefs();

function PageLoadFunction() {
    // $("#Results").hide();
    // $("#ActionDiv").hide();
    $("#Reports").addClass('active');
    LoadAllDocDefs();

}