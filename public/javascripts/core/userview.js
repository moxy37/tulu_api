function Login() {
  var username = $("#Username").val();
  var password = $("#Password").val();
  var obj = new Object();
  obj.email = username;
  obj.password = password;
  $.ajax({
    type: "PUT",
    url: "/api/user/login",
    cache: false,
    data: obj,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    success: function (results) {
      gUser = ShowUserHTML(results);
      DashboardRedirect();
    },
    error: function (results) {
      // alert(results.responseText);
    },
  });
}

function Logout() {
  gUser = null;
  tokenId = "";
  $.ajax({
    type: "GET",
    url: "/api/user/logout",
    cache: false,
    dataType: "json",
    success: function (results) {
      $("#Messages").empty();
      $("#UserWelcome").empty();
      $("#LoginDiv").show();
    },
    error: function (results) {
      $("#UserWelcome").empty();
      $("#Messages").empty();
      $("#LoginDiv").show();
      location.href = "/s";
    },
  });
}

function DashboardRedirect() {
  if (!gUser) {
    location.href = "/login";
  }
  if (gUser["User Type"] === "SysAdmin") {
    location.href = "/defs?tokenId=" + gUser.tokenId;
  } else if (gUser["Company User Type"] === "Owner") {
    if (gUser["companyType"] === "Construction") {
      location.href = "/dashboardConstructionOwner?tokenId=" + gUser.tokenId;
    }
    else {
      location.href = "/dashboardFleetOwner?tokenId=" + gUser.tokenId;
    }
  } else if (gUser["Company User Type"] === "Supervisor") {
    location.href = "/dashboardSupervisor?tokenId=" + gUser.tokenId;
  } else {
    location.href = "/dashboardOperator?tokenId=" + gUser.tokenId;
  }
}
