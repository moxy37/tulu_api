var tokenId = "";
var gUser;
var viewVin = '';
var viewDealerId = '';
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
			} else if (hash[0] === "viewDealerId") {
				viewDealerId = hash[1];
			} else if (hash[0] === "vin") {
				viewVin = hash[1];
			}
		}
		if (tokenId !== undefined) {
			console.log("hasToken");
			GetCurrentUser(PageLoadFunction);
		} else {
			console.log("noToken");
			PageLoadFunction();
		}
	}
	getUrlVars();
});

function GetCurrentUser(next) {
	var makeCall = true;
	// var tempUserText = window.sessionStorage.getItem("gUser");
	// if (tempUserText !== undefined && tempUserText !== null) {
	// 	gUser = JSON.parse(tempUserText);
	// 	dealerId = window.sessionStorage.getItem("dealerId");
	// 	if (tokenId === gUser.tokenId) { makeCall = false; }
	// }
	if (makeCall === true) {
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
				gUser = results.user;
				for (var i = 0; i < gUser.roles.length; i++) {
					if (gUser.roles[i].role === 'Dealer' || gUser.roles[i].role === 'DealerAdmin') {
						dealerId = gUser.roles[i].targetId;
						window.sessionStorage.setItem("dealerId", dealerId);
					}
				}
				window.sessionStorage.setItem("gUser", JSON.stringify(gUser));
				next();
			},
			error: function (results) { next(); },
		});
	} else { next(); }
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

function Logout() {
	window.sessionStorage.clear();
	window.localStorage.clear();
	window.location = '/login';
}

async function NewHelperObject(table, primary) {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.primary = primary;
	obj.table = table;

	const result = await $.ajax({
		type: "PUT",
		url: "/api/helper/new",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			console.log(results);
		},
		error: function (results) { console.log(results.statusText); },
	});
	return result;
}