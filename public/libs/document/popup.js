/*
*  The Spartacus Rapid Prototyping Toolbox 
Copyright (C) 2016 Dean Brennan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
* */
var gDoc = new Object();
var gDocStack = new Array();
var gDivId = "Results";

function InitialGetDocumentById(id) {
  GetDocumentByDocumentId(id);
  LocalLoadCallback();
}

function GetDocumentByDocumentId(id) {
  var newDoc = null;
  $("#Messages").empty();
  GetDocumentJSONByDocumentId(id, function (doc) {
    var data = UpdateDocumentToString(doc);
    if (gDocStack.length == 0) {
      gDoc = data;
      $("#" + gDivId).empty();
    }
    LoadPopup(data, gDivId);
    gDocStack.push(data);
    OpenPopup();
    return data;
  });
  OpenPopup();
  return newDoc;
}

function SelectTabToDisplay(id) {
  $(".tab-pane").hide();
  $("#Document_" + id).show();
  $(".doctablist").removeClass("active");
  $("#DocLi_" + id).addClass("active");
}

function LoadPopup(doc, divId) {
  var html = '<div><div class="box" id="Doc_' + doc.id + '">';
  //header
  html +=
    '<div class="box-header"><h2>' +
    doc.toString +
    '</h2><div class="box-icon"><a class="btn-close" href="#" onclick="ClosePopup(LocalCloseCallback);"><i class="fa fa-times"></i></a></div><!--/.box-icon--></div><!--/.box-header-->';
  //main content
  html += '<div class="box-content">';

  //Step 2. Make arrays for the tabs & fields
  var fieldsInDoc = new Array();
  var tabs = new Array();

  for (var i = 0; i < doc.fields.length; i++) {
    switch (doc.fields[i].fieldDefinition.fieldDataType) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 17:
      case 18:
        fieldsInDoc.push(doc.fields[i]);
        break;
      case 13:
      case 14:
        tabs.push(doc.fields[i]);
        break;
    }
  }

  //Step 3. Make the navigation tabs
  html += '<ul class="nav tab-menu nav-tabs" id="myTab">';
  //first tab
  html +=
    '<li class="active doctablist" id="DocLi_' +
    doc.id +
    '"><a onclick="SelectTabToDisplay(\'' +
    doc.id +
    "');\">" +
    doc.documentDefinition.label +
    "</a></li>";
  // html += '<li class="active"><a onclick="SelectTabToDisplay(\''+doc.id+'\');" href="#Document_' + doc.id + '" data-toggle="tab">' + doc.documentDefinition.label + '</a></li>';
  //remaining tabs
  for (var i = 0; i < tabs.length; i++) {
    html +=
      '<li class="doctablist" id="DocLi_' +
      tabs[i].id +
      '"><a onclick="SelectTabToDisplay(\'' +
      tabs[i].id +
      "');\">" +
      tabs[i].fieldDefinition.label +
      "</a></li>";
  }
  html += "</ul>";

  //Step 4. Make the tab panes
  html += '<div class="tab-content" id="myTabContent">';

  //first pane
  html += '<div class="tab-pane active" id="Document_' + doc.id + '">';
  html += '<input type="hidden" class="TabId" value="' + doc.id + '">';
  html += "<h1>" + doc.documentDefinition.label + "</h1>";
  html += '<table class="table"><tbody>';

  for (var i = 0; i < fieldsInDoc.length; i++) {
    html += GetFieldHTML(fieldsInDoc[i]);
  }
  html += "</tbody></table>";
  html += "</div><!--/.tab-pane-->";

  //remaining panes
  for (var i = 0; i < tabs.length; i++) {
    html += '<div class="tab-pane" id="Document_' + tabs[i].id + '">';
    html += '<input type="hidden" class="TabId" value="' + tabs[i].id + '">';
    html += "<h1>" + tabs[i].fieldDefinition.label + "</h1>";
    html += '<table class="table"><tbody>';
    html += GetFieldHTML(tabs[i]);
    html += "</tbody></table>";
    html += "</div><!--/.tab-pane-->";
  }

  html += "</div><!--/.tab-content-->";
  html += '<hr class="clearfix" />';
  html += '<section id="permissions"></section>';

  //Step 4. Make the Save & Close buttons
  html += '<div class="row">';
  html += '<div class="col-sm-6"></div>';
  //Save button
  html +=
    '<div class="col-sm-3"><a class="quick-button"  onclick="SaveDocumentButton(LocalSaveCallback);"><span class="green"><i class="fa fa-save"></i></span><p><strong>Save</strong></p></a></div><!--/.col-sm-2-->';
  //Close button
  html +=
    '<div class="col-sm-3"><a class="quick-button" onclick="ClosePopup(LocalCloseCallback);"><span class="red"><i class="fa fa-times"></i></span><p><strong>Close</strong></p></a></div><!--/.col-sm-2-->';
  html += "</div><!--/.row-->";

  //Step 5. Close 'er up
  html += "</div><!--/.box-content-->";
  html += "</div><!--/.box-->";
  html += "</div><!--/.col-sm-8-->";

  //alert(html);
  //Step 6: Append to the results div
  if (gDocStack.length === 0) {
    $("#" + divId).empty();
  }
  $("#" + divId).append(html);

  // //Step 7: Activate the DateTimePicker
  $(".NeoDateTimePicker").each(function () {
    $(this).datetimepicker({
      // dateFormat: 'yy-mm-dd',
      // timeFormat: 'H:mm:ss.l',
      // showSecond: true,
      // showMillisec: true,
      // millisecText: 'Millisec'
    });
  });
}

function GetFieldHTML(field) {
  var html = "";
  var enabled = "";
  switch (field.fieldDefinition.fieldDataType) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 5:
    case 17:
    case 18:
      html =
        '<tr><div id="FieldContainer_' + field.id + '" class="form-group">';
      var forAttr = ' for="Field_' + field.id + '"';
      html +=
        "<th><label" +
        forAttr +
        ' class="control-label">' +
        field.fieldDefinition.label +
        ":</label></th>";
      var type;
      switch (field.fieldDefinition.fieldDataType) {
        case 3:
          type = "datetime";
          break;
        case 17:
          type = "password";
          break;
        default:
          type = "text";
          break;
      }
      var tempVal = field.value.value;
      if (field.value.value === null) {
        tempVal = "";
      }
      if (field.fieldDefinition.fieldDataType === 3) {
        html +=
          '<td><input type="' +
          type +
          '" id="Field_' +
          field.id +
          '" value="' +
          tempVal +
          '" class="form-control value NeoDateTimePicker" ' +
          enabled +
          " />";
      } else if (field.fieldDefinition.fieldDataType === 18) {
        html +=
          '<td><input type="' +
          type +
          '" id="Field_' +
          field.id +
          '" value="' +
          tempVal +
          '" class="form-control value" ' +
          enabled +
          " onchange=\"EnsureUnique('" +
          field.id +
          "','" +
          field.fieldDefinition.id +
          "');\" />";
      } else {
        html +=
          '<td><input type="' +
          type +
          '" id="Field_' +
          field.id +
          '" value="' +
          tempVal +
          '" class="form-control value" ' +
          enabled +
          " />";
      }
      if (field.fieldDefinition.isTracked === true) {
        html += GetHistoryHTML(field);
        html +=
          '</td><td></td><td><input type="button" value="Show History" class="btn" onclick="ShowFieldHistory(\'' +
          field.id +
          "');\" /></td></div></tr>";
      } else {
        html += "</td><td></td><td></td></div></tr>";
      }
      break;
    case 4:
      html =
        '<tr><div id="FieldContainer_' + field.id + '" class="form-group">';
      html +=
        '<th><label class="control-label">' +
        field.fieldDefinition.label +
        ":</label></th>";
      var checkedFalse = 'checked="checked"';
      var checkedTrue = "";
      if (field.value.value == true) {
        checkedFalse = "";
        checkedTrue = 'checked="checked"';
      }
      html +=
        '<td><label class="radio inline"><input type="radio"  id="Field_' +
        field.id +
        '" name="Field_' +
        field.id +
        '" value="false" ' +
        enabled +
        " " +
        checkedFalse +
        "/> False</label>";
      html +=
        '<label class="radio inline"><input type="radio"  id="Field_' +
        field.id +
        '" name="Field_' +
        field.id +
        '" value="true" ' +
        enabled +
        " " +
        checkedTrue +
        " /> True</label>";
      if (field.fieldDefinition.isTracked === true) {
        html += GetHistoryHTML(field);
        html +=
          '</td><td><input type="button" value="Show History" class="btn" onclick="ShowFieldHistory(\'' +
          field.id +
          "');\" /></td></div></tr>";
      } else {
        html += "</td><td></td></div></tr>";
      }
      break;
    case 6:
    case 8:
    case 9:
      html =
        '<tr><div id="FieldContainer_' + field.id + '" class="form-group">';
      html +=
        '<th><label class="control-label" for="Field_' +
        field.id +
        '">' +
        field.fieldDefinition.label +
        ":</label></th>";
      html +=
        "<td><select " +
        enabled +
        '  class="form-control" id="Field_' +
        field.id +
        '">';
      if (field.fieldDefinition.listOfValues.length != 0) {
        for (var i = 0; i < field.fieldDefinition.listOfValues.length; i++) {
          var selectedText = "";
          if (field.value.id == field.fieldDefinition.listOfValues[i].id) {
            selectedText = 'selected="selected"';
          }
          html +=
            '<option value="' +
            field.fieldDefinition.listOfValues[i].id +
            '" ' +
            selectedText +
            ">" +
            field.fieldDefinition.listOfValues[i].value +
            "</option>";
        }
      } else {
        html += "<option>No Results</option>";
      }
      html += "</select></td><td></td><td></td>";
      html += "</div></tr>";
      break;
    case 7:
      html =
        '<tr><div id="FieldContainer_' + field.id + '" class="form-group">';
      var forAttr = ' for="Field_' + field.id + '"';
      html +=
        "<th><label" +
        forAttr +
        ' class="control-label">' +
        field.fieldDefinition.label +
        ":</label></th>";
      html += "<td><ul>";
      field.history.forEach(function (fv) {
        html +=
          '<li><a href="/uploads/' + fv.value + '">' + fv.value + "</a><li>";
      });
      html += "</ul></td>";
      break;
    case 10:
      html +=
        '<tr><div id="FieldContainer_' + field.id + '" class="form-group">';
      html +=
        '<th><label class="control-label" for="Field_' +
        field.id +
        '">' +
        field.fieldDefinition.label +
        ":</label></th>";
      html +=
        '<td colspan="2"><textarea class="form-control-text" id="Field_' +
        field.id +
        '" ' +
        enabled +
        " >" +
        field.value.value +
        "</textarea>";
      if (field.fieldDefinition.isTracked == true) {
        html += GetHistoryHTML(field);
        html +=
          '</td><td><input type="button" class="btn" value="Show History" onclick="ShowFieldHistory(\'' +
          field.id +
          "');\" /></td></div></tr>";
      } else {
        html += "</td><td></td></div></tr>";
      }
      break;
    case 12:
    case 11:
      html =
        '<tr><div id="FieldContainer_' + field.id + '" class="form-group">';
      html +=
        '<th><label class="control-label" for="Field_' +
        field.id +
        '">' +
        field.fieldDefinition.label +
        ":</label></th>";
      html +=
        '<td><span id="Field_' +
        field.id +
        '" class="form-control value">' +
        field.value.toString +
        "</span></td>";
      if (field.isNew !== true || field.fieldDefinition.fieldDataType === 12) {
        html +=
          '<td><input type="button" class="form-control btn btn-primary" value="View ' +
          field.fieldDefinition.docDefs[0].label +
          '" onclick="LoadDocumentInNewPopupById(\'' +
          field.value.id +
          "');\" /></td>";
      }
      // if (field.fieldDefinition.fieldDataType === 11) {
      html += '<td><input type="button" class="form-control btn btn-primary" value="Change" onclick="LoadChangeGroupsDocumentPopup(\'' + field.id + "');\" /></td>";
      // } else {
      //   html += '<td></td>';
      // }
      html += "</div></tr>";
      break;
    case 13:
    case 14:
      html = "";
      html += '<div id="FieldContainer_' + field.id + '" class="form-group">';
      for (var i = 0; i < field.value.entities.length; i++) {
        var entity = field.value.entities[i];
        var tempText = "true";
        html +=
          '<tr id="GroupsDoc_' +
          field.fieldDefinition.id +
          "_" +
          entity.id +
          '" data-sequence="' +
          entity.sequence +
          '">';
        html +=
          '<td id="TableCell_' + entity.id + '">' + entity.toString + "</td>";
        html +=
          '<td><input id="' +
          entity.id +
          '" type="button" class="form-control btn btn-primary" value="View ' +
          entity.documentDefinition.label +
          '" onclick="LoadDocumentInNewPopupById(\'' +
          entity.id +
          "'," +
          tempText +
          ');" /></td>';
        var textInButton = "Remove";
        if (field.fieldDefinition.fieldDataType == 14) {
          textInButton = "Delete";
        }
        html +=
          '<td><input type="button" class="form-control btn btn-primary" value="' +
          textInButton +
          '" onclick="RemoveEntityFromGroup(\'' +
          entity.id +
          "', '" +
          field.id +
          "');\" /></td>";
        html += "<td></td>";
        html += "</tr></div>";
      }

      if (field.fieldDefinition.fieldDataType == 14) {
        html += "<tr>";
        html +=
          '<th><label class="AddNewDocumentToList">Add New Document</label></th>';
        html +=
          '<td><select class="form-control" id="AddDocumentToGroup_' +
          field.id +
          '">';
        if (
          field.fieldDefinition.docDefs != undefined &&
          field.fieldDefinition.docDefs.length > 0
        ) {
          for (var i = 0; i < field.fieldDefinition.docDefs.length; i++) {
            var tempName = field.fieldDefinition.docDefs[i].label;
            html +=
              '<option value="' +
              field.fieldDefinition.docDefs[i].id +
              '">' +
              tempName +
              "</option>";
          }
        } else {
          html += "<option>No Results</option>";
        }
        html += "</select></td>";
        html +=
          '<td><input type="button" class="form-control btn btn-primary" value="Add New" onclick="AddNewDocumentTypeToDocumentList(\'' +
          field.id +
          "');\" /></td><td></td>";
      } else {
        html +=
          '<td colspan="3"><input type="button" class="form-control btn btn-primary" value="Add More Items" onclick="LoadChangeGroupsDocumentPopup(\'' +
          field.id +
          "');\" /></td>";
      }
      html += "</tr>";
      break;
    default:
      break;
  }
  return html;
}

function EnsureUnique(fieldId, fieldDefinitionId) {
  var val = $("#Field_" + fieldId).val();
  var tempObj = new Object();
  tempObj.fieldId = fieldId;
  tempObj.fieldDefinitionId = fieldDefinitionId;
  tempObj.value = val;
  var obj = new Object();
  obj.tokenId = tokenId;
  obj.text = JSON.stringify(tempObj);
  $.ajax({
    type: "POST",
    url: "/api/ensure/unique",
    data: obj,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    success: function (result) {
      // alert(JSON.stringify(result));
      if (result.value === false) {
        $("#Messages").empty();
        $("#Messages").append("<h3>Not Unique Key</h3>");
        $("#Field_" + result.id).focus();
      } else {
        $("#Messages").empty();
      }
    },
    error: function (results) {
      $("#Messages").empty();
      $("#Messages").append("<h3>Not Unique Key</h3>");
      $("#Field_" + result.id).focus();
    },
  });
}

function UpdateHiddenField(selectId, hiddenId) {
  $("#" + hiddenId).val($("#" + selectId + " option:selected").val());
}

function LoadFieldDocumentInNewPopupById(hiddenId) {
  LoadDocumentInNewPopupById($("#" + hiddenId).val());
}

function GetFieldByFieldId(doc, fieldId) {
  for (var i = 0; i < doc.fields.length; i++) {
    if (doc.fields[i].id === fieldId) {
      gDoc = doc;
      return doc.fields[i];
    } else {
      if (
        doc.fields[i].fieldDefinition.fieldDataType === 11 ||
        doc.fields[i].fieldDefinition.fieldDataType === 12 ||
        doc.fields[i].fieldDefinition.fieldDataType === 15 ||
        doc.fields[i].fieldDefinition.fieldDataType === 19
      ) {
        var val = GetFieldByFieldId(doc.fields[i].value, fieldId);
        if (val != undefined || val != null) {
          gDoc = doc;
          return val;
        }
      } else if (
        doc.fields[i].fieldDefinition.fieldDataType === 14 ||
        doc.fields[i].fieldDefinition.fieldDataType === 13 ||
        doc.fields[i].fieldDefinition.fieldDataType === 16
      ) {
        for (var j = 0; j < doc.fields[i].value.entities.length; j++) {
          var val = GetFieldByFieldId(doc.fields[i].value.entities[j], fieldId);
          if (val != undefined || val != null) {
            gDoc = doc;
            return val;
          }
        }
      }
    }
  }
  return null;
}

function AddNewDocumentTypeToDocumentList(fieldId) {
  var docDefId = $("#AddDocumentToGroup_" + fieldId + " option:selected").val();
  MakeNewDocumentJSONByDocumentDefinitionId(docDefId, function (doc) {
    var data = doc;
    field = GetFieldByFieldId(gDoc, fieldId);
    field.value.entities.push(data);
    if (gDocStack.length == 0) {
      gDoc = data;
    }
    LoadPopup(data, gDivId);
    gDocStack.push(data);
    OpenPopup();
  });
}

function GetDocumentJSONByDocumentId(docId, callback) {
  var jqxhr = $.ajax({
    type: "GET",
    url: "/api/document/get/" + docId + "/" + tokenId,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  });
  jqxhr.done(callback);
}

function MakeNewDocumentJSONByDocumentDefinitionId(docDefId, callback) {
  var obj = new Object();
  obj.docDefId = docDefId;
  // obj.id = id;
  obj.tokenId = tokenId;
  var jqxhr = $.ajax({
    type: "PUT",
    url: "/api/document/new",
    cache: false,
    data: obj,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
  });
  jqxhr.done(callback);
}

function LoadChangeGroupsDocumentPopup(fieldId) {
  var field = GetFieldByFieldId(gDoc, fieldId);
  var groupsId = field.value.id;
  var temp = field.fieldDefinition.docDefs[0].id + ";" + groupsId;
  var obj = new Object();
  obj.s = temp;
  obj.tokenId = tokenId;
  $.ajax({
    type: "PUT",
    url: "/api/docdef/search",
    contentType: "application/x-www-form-urlencoded",
    // contentType: "application/json; charset=utf-8",
    data: obj,
    cache: false,
    dataType: "json",
    success: function (data) {
      for (var i = 0; i < gDocStack.length; i++) {
        $("#Doc_" + gDocStack[i].id).hide();
      }
      var html = "";
      //box opening & header
      html +=
        '<div id="fvContainerSelectorDiv" class="box col-sm-8"><div class="box-header">';
      html += "<h2>Select a (document)</h2>";
      html += '</div><!--/.box-header--><div class="box-content">';

      //main content
      html += '<table class="table">';
      html += "<tr><td>";
      html += '<div class="controls"><div class="input-group">';
      html +=
        '<input type="text" id="ContainerSearchText" class="form-control" placeholder="Search for a document" />';
      html +=
        '<span class="input-group-btn"><button class="btn" type="button" onclick="SearchContainers(\'' +
        field.fieldDefinition.docDefs[0].id +
        "', '" +
        field.value.id +
        "');\">Go!</button></span>";
      html += "</div><!--/.input-group--></div><!--/.controls-->";
      html += '<div class="ContainerSearchResults">';
      html += '<select id="ContainerSearchSelect" multiple="multiple">';
      // html += '<select id="ContainerSearchSelect">';
      var arrayList = data;
      for (var i = 0; i < arrayList.length; i++) {
        html +=
          '<option value="' +
          arrayList[i].id +
          '">' +
          arrayList[i].toString +
          "</option>";
      }
      html += "</select></div><!--/.ContainerSearchResults-->";
      html += "</td></tr>";
      html += '<select id="ContainerDocDefIds">';
      if (
        field.fieldDefinition.docDefs !== undefined &&
        field.fieldDefinition.docDefs !== null &&
        field.fieldDefinition.docDefs.length > 0
      ) {
        for (var i = 0; i < field.fieldDefinition.docDefs.length; i++) {
          html +=
            '<option value="' +
            field.fieldDefinition.docDefs[i].id +
            '">' +
            field.fieldDefinition.docDefs[i].label +
            "</option>";
        }
      } else {
        html +=
          '<option value="' +
          field.fieldDefinition.defaultValue +
          '">Default</option>';
      }

      html += "</select>";
      html += "<tr><td>";
      html += "</td></tr></table>";
      html += '<div class="row">';
      html += '<div class="col-sm-8"></div>';
      //Save button
      html +=
        '<div class="col-sm-2"><a class="quick-button"  onclick="UpdateContainerSelectField(\'' +
        field.id +
        '\');"><span class="green"><i class="fa fa-save"></i></span><p><strong>Save</strong></p></a></div><!--/.col-sm-2-->';
      //Close button
      html +=
        '<div class="col-sm-2"><a class="quick-button" onclick="CloseContainerSelectPopup();"><span class="red"><i class="fa fa-times"></i></span><p><strong>Cancel</strong></p></a></div><!--/.col-sm-2-->';
      html += "</div><!--/.row-->";
      //close up the box
      html += "</div><!--/.box-content--></div><!--/.box-->";
      $("#" + gDivId).append(html);
    },
    error: function (data) { },
  });
}

function SwapField(doc, field) {
  for (var i = 0; i < doc.fields.length; i++) {
    if (doc.fields[i].id == field.id) {
      doc.fields[i] = field;
      break;
    } else if (
      doc.fields[i].fieldDefinition.fieldDataType === 11 ||
      doc.fields[i].fieldDefinition.fieldDataType === 12
    ) {
      doc.fields[i].value = SwapField(doc.fields[i].value, field);
    } else if (
      doc.fields[i].fieldDefinition.fieldDataType === 13 ||
      doc.fields[i].fieldDefinition.fieldDataType === 14
    ) {
      for (var j = 0; j < doc.fields[i].value.entities.length; j++) {
        doc.fields[i].value.entities[j] = SwapField(
          doc.fields[i].value.entities[j],
          field
        );
      }
    }
  }
  return doc;
}

function UpdateContainerSelectField(fieldId) {
  var docId = $("#ContainerSearchSelect option:selected").val();
  GetDocumentJSONByDocumentId(docId, function (doc) {
    var data = doc;
    var field = GetFieldByFieldId(gDoc, fieldId);
    if (
      field.fieldDefinition.fieldDataType === 11 ||
      field.fieldDefinition.fieldDataType === 12
    ) {
      field.value = data;
    } else {
      field.value.entities.push(data);
    }
    for (var i = 0; i < gDocStack.length; i++) {
      gDocStack[i] = SwapField(gDocStack[i], field);
    }
    gDoc = SwapField(gDoc, field);
    RefreshGlobalDocumentStack();
    $("#fvContainerSelectorDiv").remove();
    OpenPopup();
  });
}

function CloseContainerSelectPopup() {
  $("#fvContainerSelectorDiv").remove();
  OpenPopup();
}

function SearchContainers(docDefId, groupsId) {
  var searchString = $("#ContainerSearchText").val();
  var temp = docDefId + ";" + groupsId + ";" + searchString;
  var obj = new Object();
  obj.s = temp;
  obj.tokenId = tokenId;
  $.ajax({
    type: "PUT",
    url: "/api/docdef/search",
    contentType: "application/json; charset=utf-8",
    data: obj,
    cache: false,
    dataType: "json",
    success: function (data) {
      var html = "";
      $("#ContainerSearchSelect").empty();
      var arrayList = data;
      for (var i = 0; i < arrayList.length; i++) {
        html +=
          '<option value="' +
          arrayList[i].id +
          '">' +
          arrayList[i].toString +
          "</option>";
      }
      $("#ContainerSearchSelect").append(html);
    },
    error: function (data) { },
  });
}

function RemoveEntityFromGroup(entityId, fieldId) {
  var currentDoc = gDocStack.pop();
  if (currentDoc === undefined || currentDoc === null) {
    currentDoc = gDoc;
  }
  var field = GetFieldByFieldId(currentDoc, fieldId);
  var newEntities = new Array();
  for (var i = 0; i < field.value.entities.length; i++) {
    if (field.value.entities[i].id !== entityId) {
      newEntities.push(field.value.entities[i]);
    }
  }
  field.value.entities = newEntities;
  gDocStack.push(currentDoc);
  RefreshGlobalDocumentStack();
}

function LoadDocumentInNewPopupById(docId) {
  var doc = GetDocumentFromDocumentByDocumentId(gDoc, docId);
  if (doc !== undefined && doc !== null) {
    LoadPopup(doc, gDivId);
    if (gDocStack.length == 0) {
      gDoc = doc;
    }
    gDocStack.push(doc);
    OpenPopup();
  } else {
    GetDocumentJSONByDocumentId(docId, function (doc2) {
      var data = doc2;
      LoadPopup(data, gDivId);
      if (gDocStack.length == 0) {
        gDoc = data;
      }
      gDocStack.push(data);
      OpenPopup();
    });
  }
}

function OpenPopup() {
  var index = gDocStack.length - 1;
  for (var i = 0; i < gDocStack.length; i++) {
    $("#Doc_" + gDocStack[i].id).hide();
  }
  if (index >= 0) {
    $("#Doc_" + gDocStack[index].id).show();
  }
}

function ClosePopup(callback) {
  RefreshGlobalDocumentStack();
  var tempDoc = gDocStack.pop();
  $("#Doc_" + tempDoc.id).remove();
  var index = gDocStack.length - 1;
  if (index < 0) {
    callback();
  } else {
    OpenPopup();
  }
}

function RefreshGlobalDocumentStack() {
  for (var i = 0; i < gDocStack.length; i++) {
    gDocStack[i] = GetDocumentUpdatesFromDocumentField(gDocStack[i]);
  }
  gDoc = GetDocumentUpdatesFromDocumentField(gDoc);
  gDoc = UpdateDocumentToString(gDoc);
  for (var i = 0; i < gDocStack.length; i++) {
    $("#Doc_" + gDocStack[i].id).remove();
    gDocStack[i] = UpdateDocumentToString(gDocStack[i]);
    LoadPopup(gDocStack[i], gDivId);
  }
}

function GetDocumentUpdatesFromDocumentField(doc) {
  for (var i = 0; i < doc.fields.length; i++) {
    doc.fields[i] = GetFieldUpdatesFromField(doc.fields[i]);
  }
  return doc;
}

function UpdateDocumentToString(doc) {
  doc.toString = GetDocumentToString(doc);
  for (var i = 0; i < doc.fields.length; i++) {
    switch (doc.fields[i].fieldDefinition.fieldDataType) {
      case 11:
      case 12:
      case 15:
      case 19:
        doc.fields[i].value = UpdateDocumentToString(doc.fields[i].value);
        break;
      case 13:
      case 14:
      case 16:
        for (var j = 0; j < doc.fields[i].value.entities.length; j++) {
          doc.fields[i].value.entities[j] = UpdateDocumentToString(
            doc.fields[i].value.entities[j]
          );
        }
        break;
    }
  }
  return doc;
}

function GetFieldByFieldDefinitionLabel(doc, label) {
  for (var i = 0; i < doc.fields.length; i++) {
    if (doc.fields[i].fieldDefinition.label === label) {
      return doc.fields[i];
    } else {
      if (
        doc.fields[i].fieldDefinition.fieldDataType === 11 ||
        doc.fields[i].fieldDefinition.fieldDataType === 12
      ) {
        var val = GetFieldByFieldDefinitionLabel(doc.fields[i].value, label);
        if (val !== undefined || val !== null) {
          return val;
        }
      } else if (
        doc.fields[i].fieldDefinition.fieldDataType === 14 ||
        doc.fields[i].fieldDefinition.fieldDataType === 13
      ) {
        for (var j = 0; j < doc.fields[i].value.entities.length; j++) {
          var val = GetFieldByFieldDefinitionLabel(
            doc.fields[i].value.entities[j],
            label
          );
          if (val !== undefined || val !== null) {
            return val;
          }
        }
      }
    }
  }
}

function GetFieldByFieldDefinitionId(doc, fieldDefinitionId) {
  for (var i = 0; i < doc.fields.length; i++) {
    if (doc.fields[i].fieldDefinition.id === fieldDefinitionId) {
      return doc.fields[i];
    } else {
      if (
        doc.fields[i].fieldDefinition.fieldDataType === 11 ||
        doc.fields[i].fieldDefinition.fieldDataType === 12
      ) {
        var val = GetFieldByFieldDefinitionId(
          doc.fields[i].value,
          fieldDefinitionId
        );
        if (val !== undefined || val !== null) {
          return val;
        }
      } else if (
        doc.fields[i].fieldDefinition.fieldDataType === 14 ||
        doc.fields[i].fieldDefinition.fieldDataType === 13
      ) {
        for (var j = 0; j < doc.fields[i].value.entities.length; j++) {
          var val = GetFieldByFieldDefinitionId(
            doc.fields[i].value.entities[j],
            fieldDefinitionId
          );
          if (val !== undefined || val !== null) {
            return val;
          }
        }
      }
    }
  }
}

function GetDocumentToString(doc) {
  var text = "";
  if (doc.fields !== undefined) {
    if (
      doc.documentDefinition !== undefined &&
      doc.documentDefinition.customToString !== undefined &&
      doc.documentDefinition.customToString !== ""
    ) {
      var newList = doc.documentDefinition.customToString.split(";");
      if (newList.length == 0) {
        text += GetFieldToString(doc.fields[0]);
      } else {
        newList.forEach(function (id) {
          var tempText = "";
          for (var i = 0; i < doc.fields.length; i++) {
            if (doc.fields[i].fieldDefinition.id === id) {
              tempText = GetFieldToString(doc.fields[i]);
            }
          }
          if (tempText === "") {
            tempText = id;
          }
          text += tempText;
        });
      }
    } else {
      text += GetFieldToString(doc.fields[0]);
    }
  } else {
    text += doc.name;
  }
  return text;
}

function GetFieldToString(field) {
  var text = "";
  switch (field.fieldDefinition.fieldDataType) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 18:
      text += field.value.value;
      break;
    case 11:
    case 12:
      text += GetDocumentToString(field.value);
      break;
    case 13:
    case 14:
      text += field.fieldDefinition.label;
      break;
  }
  return text;
}

function GetFieldUpdatesFromField(field) {
  var caseNum = field.fieldDefinition.fieldDataType;
  var tempValue = "";
  switch (caseNum) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 10:
    case 17:
    case 18:
      tempValue = $("#Field_" + field.id).val();
      if (caseNum == 4) {
        tempValue = $("#Field_" + field.id + ":checked").val();
      }
      if (tempValue !== undefined) {
        if (caseNum == 1) {
          tempValue = parseInt(tempValue);
        } else if (caseNum == 2) {
          tempValue = parseFloat(tempValue);
        } else if (caseNum == 4) {
          var boolValue = true;
          if (tempValue == "false") {
            boolValue = false;
          }
          tempValue = boolValue;
        }
        if (field.fieldDefinition.isTracked === true) {
          if (field.value.value !== tempValue) {
            //We need to make a new field here
            field.value.id = createUUID();
            field.value.isNew = true;
            field.value.timestamp = new Date();
            field.history.unshift(field.value);
          }
        }
        field.value.value = tempValue;
      }
      break;
    case 6:
    case 8:
    case 9:
      var valueId = $("#Field_" + field.id + " option:selected").val();
      if (valueId !== undefined && valueId !== null) {
        var val = $("#Field_" + field.id + " option:selected").text();
        field.value.id = valueId;
        field.value.value = val;
      }
      break;
    case 11:
    case 12:
      field.value = GetDocumentUpdatesFromDocumentField(field.value);
      break;
    case 13:
      break;
    case 14:
      for (var i = 0; i < field.value.entities.length; i++) {
        field.value.entities[i] = field.value.entities[i];
      }
      break;
    case 7:
      break;
    default:
      break;
  }
  return field;
}

function GetDocumentFromDocumentByDocumentId(doc, docId) {
  if (doc.id == docId) {
    return doc;
  } else {
    for (var i = 0; i < doc.fields.length; i++) {
      if (
        doc.fields[i].fieldDefinition.fieldDataType === 11 ||
        doc.fields[i].fieldDefinition.fieldDataType === 12 ||
        doc.fields[i].fieldDefinition.fieldDataType === 15 ||
        doc.fields[i].fieldDefinition.fieldDataType === 19
      ) {
        if (doc.fields[i].value.id == docId) {
          return doc.fields[i].value;
        } else {
          var val = GetDocumentFromDocumentByDocumentId(
            doc.fields[i].value,
            docId
          );
          if (val != undefined || val != null) {
            return val;
          }
        }
      } else if (
        doc.fields[i].fieldDefinition.fieldDataType === 14 ||
        doc.fields[i].fieldDefinition.fieldDataType === 13 ||
        doc.fields[i].fieldDefinition.fieldDataType === 16
      ) {
        for (var j = 0; j < doc.fields[i].value.entities.length; j++) {
          var val = GetDocumentFromDocumentByDocumentId(
            doc.fields[i].value.entities[j],
            docId
          );
          if (val != undefined || val != null) {
            return val;
          }
        }
      }
    }
  }
  return null;
}

function SaveDocumentButton(callback) {
  if (gDocStack.length == 1) {
    var doc = GetDocumentUpdatesFromDocumentField(gDoc);
    doc.toString = GetDocumentToString(doc);
    var obj = new Object();
    obj.doc = doc;
    obj.workflowId = "40db8f81-36de-4156-beec-a28a49dc04ae";
    obj.tokenId = tokenId;
    $.ajax({
      type: "PUT",
      url: "/api/document/save",
      cache: false,
      data: obj,
      dataType: "json",
      success: function (result) {
        console.log("Save done In Save Doc");
        try {
          $("#Messages").empty();
          $("#Messages").append("<h3>Save Successful</h3>");
          if ($.isEmptyObject(result)) {
            alert("Your document was unable to save.");
          } else {
            gDoc = new Object();
            gDocStack = new Array();
            LoadPopup(result, gDivId);
            gDoc = result;
            gDocStack.push(result);
          }
        } catch (ex) { }
        if (callback !== undefined) {
          callback(result);
        }
      },
      error: function (results) {
        if (callback !== undefined) {
          callback(result);
        }
      },
    });
  } else if (gDocStack.length > 1) {
    ClosePopup();
  } else {
    alert("Error somewhere");
  }
}

function InitialMakeNewDocument(docDefId, callback) {
  LocalLoadCallback();
  MakeNewDocument(docDefId, callback);
}

function MakeNewDocument(docDefId, callback) {
  var obj = new Object();
  obj.tokenId = tokenId;
  obj.docDefId = docDefId;
  // obj.id = id;
  var jqxhr = $.ajax({
    type: "PUT",
    url: "/api/document/new",
    cache: false,
    data: obj,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
  });

  jqxhr.done(function (doc) {
    var data = doc;
    var docId = data.id;

    LoadPopup(data, "Results");
    if (gDocStack.length == 0) {
      gDoc = data;
    }
    gDocStack.push(data);
    if (callback !== undefined) { callback(doc); }
  });
}

function GetHistoryHTML(field) {
  var html = '<div id="FieldHistory_' + field.id + '" style="display:none">';
  var pageNumber = 0;
  html +=
    '<div id="FieldHistory_' +
    field.id +
    "_Page_" +
    pageNumber +
    '"><table><tr><th>Value</th><th>Modified</th></tr>';
  for (var i = 0; i < field.history.length; i++) {
    if (i % 5 == 0 && i > 0) {
      if (pageNumber == 0) {
        html +=
          "<tr><td></td><th>" +
          pageNumber +
          '</th><td><input type="button" class="btn" value="Next" onclick="ShowHistoryPageForField(\'' +
          field.id +
          "', 1);\" /></td></tr></table></div>";
      } else {
        var tempPN = pageNumber + 1;
        var oldPN = pageNumber - 1;
        html +=
          '<tr><td><input type="button" value="Previous" onclick="ShowHistoryPageForField(\'' +
          field.id +
          "'," +
          oldPN +
          ');" /></td><th>' +
          tempPN +
          '</th><td><input type="button" value="Next" onclick="ShowHistoryPageForField(\'' +
          field.id +
          "'," +
          tempPN +
          ');" /></td></tr></table></div>';
      }
      pageNumber++;
      html +=
        '<div id="FieldHistory_' +
        field.id +
        "_Page_" +
        pageNumber +
        '" style="display:none"><table><tr><th>Value</th><th>Modified</th><th>Modified By</th></tr>';
    }
    html +=
      "<tr><td>" +
      field.history[i].value +
      "</td><td>" +
      field.history[i].timestamp +
      "</td></tr>";
  }
  if (pageNumber == 0) {
    html +=
      "<tr><td></td><th>" + pageNumber + "</th><td></td></tr></table></div>";
  } else {
    var tempPN = pageNumber - 1;
    html +=
      '<tr><td><input type="button" class="btn" value="Previous" onclick="ShowHistoryPageForField(\'' +
      field.id +
      "'," +
      tempPN +
      ');" /></td><th>' +
      pageNumber +
      "</th><td></td></tr></table></div>";
  }
  html +=
    '<input type="hidden" id="FieldHistoryPageNumber_' +
    field.id +
    '" value="' +
    pageNumber +
    '" /></div>';
  return html;
}

function ShowHistoryPageForField(fieldId, pageNumber) {
  var totalPageNumbers = $("#FieldHistoryPageNumber_" + fieldId).val();
  for (var i = 0; i <= totalPageNumbers; i++) {
    $("#FieldHistory_" + fieldId + "_Page_" + i).hide();
  }
  $("#FieldHistory_" + fieldId + "_Page_" + pageNumber).show();
}

function ShowFieldHistory(fieldId) {
  if ($("#FieldHistory_" + fieldId).css("display") == "none") {
    $("#FieldHistory_" + fieldId).show();
  } else {
    $("#FieldHistory_" + fieldId).hide();
  }
}

function GetAllValues(label, divId, fields, parentId) {
  var obj = new Object();
  obj.tokenId = tokenId;
  obj.label = label;
  if (parentId !== undefined) { obj.parentId = parentId; }
  $.ajax({
    type: "PUT",
    url: "/api/document/list/pack",
    cache: false,
    data: obj,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    success: function (results) {
      if (fields === undefined) {
        fields = [];
      }
      var docDefId = results[0]['doc']['documentDefinition']['id'];
      var html = '';

      html += '<table class="table table-tcg table-striped table-hover"><thead>';
      html += "<tr>";
      var colSpanVal = fields.length + 1;
      html += "<th colspan='" + colSpanVal + "'>" + label + "</th>";
      html += '<th><input type="button" class="btn btn-primary" onclick="InitialMakeNewDocument(\'' + docDefId + '\'); " value="Add New" /></th>';
      html += "</tr>";
      html += '</thead><tbody>';
      for (var i = 0; i < results.length; i++) {
        var weight = ';'
        html += '<tr>';
        if (fields.length === 0) {
          html += '<td>' + results[i]['doc']['toString'] + '</td>';
        } else {
          for (var j = 0; j < fields.length; j++) {
            if (j < 1) { weight = ' style="font-weight:bold"'; } else { weight = '' }
            html += '<td' + weight + '>' + results[i][fields[j]] + '</td>';
          }
        }
        html += '<td><input type="button" class="btn btn-secondary" onclick="DeleteDocumentById(\'' + results[i]['id'] + '\');" value="Delete" /></td>';
        html += '<td><input type="button" class="btn btn-primary" onclick="InitialGetDocumentById(\'' + results[i]['id'] + '\');" value="Edit" /></td>';
        html += "</tr>";
      }
      html += "</tbody></table>";

      $("#" + divId).empty();
      $("#" + divId).append(html);
      $("#" + divId).show();
    },
    error: function (results) { },
  });
}

function DeleteDocumentById(id) {
  var r = confirm("Are you sure you want to delete this item?");
  if (r == true) {
    var obj = new Object();
    obj.id = id;
    obj.tokenId = tokenId;
    $.ajax({
      type: "PUT",
      url: "/api/document/delete",
      cache: false,
      data: obj,
      dataType: "json",
      success: function (results) {
        try {
          LocalDeleteCallback();
        } catch (err) { }
      },
      error: function (results) {
        try {
          LocalDeleteCallback();
        } catch (err) { }
      },
    });
  }
}
