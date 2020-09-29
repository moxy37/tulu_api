var tokenId = "";
var gUser;
var projectId = '';
var requestId = '';

function GetDocumentListHTML(docs, divId) {
  var html = "<table>";
  docs.forEach(function (doc) {
    html += "<tr><td>" + doc.toString + '</td><td><input type="button" value="Load" onclick="GetDocumentByDocumentId(\'' + doc.id + "');\" /></td></tr>";
  });
  html += "</table>";
  $("#" + divId).empty();
  $("#" + divId).append(html);
  return docs;
}

function LoadNavigation() {
  var html = '<li id="Home" class="active menu-li"><a onclick="LocationChange(\'\');"><i class="fa fa-home"></i><span class="hidden-sm">Home<br />Page</span></a></li>';
  html += '<li id="Defs" class="active menu-li"><a onclick="LocationChange(\'defs\');"><i class="fa fa-gear"></i><span class="hidden-sm">Config<br />Management</span></a></li>';
  html += '<li id="Test" class="active menu-li"><a onclick="LocationChange(\'test\');"><i class="fa fa-lightbulb-o"></i><span class="hidden-sm">Test<br />Screen</span></a></li>';
  html += '<li id="Users" class="active menu-li"><a onclick="LocationChange(\'user\');"><i class="fa fa-user"></i><span class="hidden-sm">User<br />Management</span></a></li>';

  $("#Navigation_UL").empty();
  $("#Navigation_UL").append(html);
  $(".menu-li").removeClass("active");
}

function LocationChange(p) {
  console.log("LocationChange");
  console.log(tokenId);
  location.href = "/" + p + "?tokenId=" + tokenId;
}

$(document).ready(function () {
  function getUrlVars() {
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      if (hash[0] === "tokenId") {
        tokenId = hash[1];
      } 
    }
    if (tokenId !== undefined) {
      console.log("hasToken");
      GetCurrentUser(tokenId, PageLoadFunction);
    } else {
      console.log("noToken");
      PageLoadFunction();
    }
  }
  getUrlVars();
});

function GetDocumentListHTML(docs, divId) {
  var html = "<table>";
  docs.forEach(function (doc) {
    html += "<tr><td>" + doc.toString + '</td><td><input type="button" value="Load" onclick="GetDocumentByDocumentId(\'' + doc.id + "');\" /></td></tr>";
  });
  html += "</table>";
  $("#" + divId).empty();
  $("#" + divId).append(html);
  return docs;
}

function createUUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}
function ShowUserHTML(user) {
  // // alert(JSON.stringify(user));
  // $("#UserWelcome").empty();
  // var html = '<h4>Welcome ' + user.Name + '</h4><a onclick="Logout();">Logout</a>';
  // $("#UserWelcome").append(html);
  // $("#LoginDiv").hide();
  return user;
}

function GetCurrentUser(t, next) {
  tokenId = t;
  $.ajax({
    type: "GET",
    url: "/api/user/current/" + t,
    cache: false,
    dataType: "json",
    success: function (results) {
      gUser = ShowUserHTML(results);
      //    LoadNavigation();
      next();
    },
    error: function (results) {
      // LoadNavigation();
      next();
    },
  });
}

async function GetDoc(docId, isPacked = "true") {
  var obj = new Object();
  obj.tokenId = tokenId;
  obj.id = docId;
  obj.isPacked = isPacked;
  const result = await $.ajax({
    type: "PUT",
    url: "/api/document/get/packed",
    data: obj,
    cache: false,
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (results) { },
    error: function (results) { console.log(results.statusText); },
  });
  return result;
}

async function GetDocs(label = "", fieldLabel = "", fieldValue = "", isPacked = "true") {
  var obj = new Object();
  obj.tokenId = tokenId;
  obj.label = label;
  obj.fieldLabel = fieldLabel;
  obj.fieldValue = fieldValue;
  obj.isPacked = isPacked;
  const result = await $.ajax({
    type: "PUT",
    url: "/api/document/search/list",
    //url: "/api/document/list/pack",
    data: obj,
    cache: false,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    success: function (results) { },
    error: function (results) { console.log(results.statusText); },
  });
  return result;
}

async function SaveDoc(doc) {
  var obj = new Object();
  obj.tokenId = tokenId;
  obj.doc = doc;
  const result = await $.ajax({
    type: "PUT",
    url: "/api/document/save/packed",
    data: obj,
    cache: false,
    dataType: "json",
    //contentType: "application/x-www-form-urlencoded",
    success: function (results) { },
    error: function (results) { console.log(results.statusText); },
  });
  return result;
}


async function packContainer(doc) {
  var obj = new Object();
  obj.id = doc.id;
  obj.doc = doc;
  for (var i = 0; i < doc.fields.length; i++) {
    var field = doc.fields[i];
    switch (parseInt(field.fieldDefinition.fieldDataType)) {
      case 11:
      case 12:
        packContainer(field.value).then(function (c) {
          obj[field.fieldDefinition.label] = c;
        });
        break;
      case 13:
      case 14:
        obj[field.fieldDefinition.label] = [];
        for (var j = 0; i < field.value.entities.length; j++) {
          packContainer(field.value.entities[i]).then(function (c) {
            obj[field.fieldDefinition.label].push(c);
          });
        }
        break;
      case 6:
      case 8:
      case 9:
        obj[field.fieldDefinition.label] = field.value.value;
        obj[field.fieldDefinition.label + '-list'] = [];
        for (var j = 0; i < field.fieldDefinition.listOfValues.length; j++) {
          var fv = field.fieldDefinition.listOfValues[i];
          obj[field.fieldDefinition.label + '-list'].push(fv.value);
        }
        break;
      default:
        obj[field.fieldDefinition.label] = field.value.value;
        break;
    }
  }
  return obj;
}

async function GetFieldByDefLabel(doc, label) {
  for (var i = 0; i < doc.fields.length; i++) {
    if (doc.fields[i].fieldDefinition.label === label) {
      return doc.fields[i];
    }
  }
  return null;
}