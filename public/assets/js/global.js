var tokenId = "";
var gUser;

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

function GetCurrentUser(t, next) {
	var obj = new Object();
	obj.tokenId = tokenId;
	$.ajax({
		type: "PUT",
		url: "/api/user/current",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			gUser = results;
			next();
		},
		error: function (results) { next(); },
	});
}