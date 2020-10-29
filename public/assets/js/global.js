var tokenId = "";
var gUser;
var dealerId = "";

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
	var data = sessionStorage.getItem('gUser');
	if (data === undefined) {
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
				sessionStorage.setItem('gUser', JSON.stringify(gUser));
				for (var i = 0; i < results.roles.length; i++) {
					if (results.roles[i].role === 'Dealer' || results.roles[i].role === 'DealerAdmin') {
						dealerId = results.roles[i].targetId;
					}
				}
				sessionStorage.setItem('dealerId', dealerId);
				next();
			},
			error: function (results) { next(); },
		});
	} else {
		gUser = JSON.parse(data);
		dealerId = sessionStorage.getItem('dealerId');
	}
}

function CreateUUID() {
	var s = [];
	var hexDigits = "0123456789abcdef"; for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid;
}