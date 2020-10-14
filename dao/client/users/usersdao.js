var uuid = require("node-uuid");
var async = require('async');
module.exports = UsersDAO;

function UsersDAO() {
	this.checkTokens = function () {
		var keys = Object.keys(__currentTokens);
		var endTime = new Date();
		async.forEach(keys, function (key, callback) {
			var startTime = __currentTokens[key].timestamp;
			var difference = endTime.getTime() - startTime.getTime();
			if (difference > __defaultSessionTime) {
				if (__userToTokens[__currentTokens[key].userId] !== undefined) {
					delete __userToTokens[__currentTokens[key].userId];
				}
				callback();
			}
		}, function (err) {
			return "OK";
		});
	}

	this.login = function (username, password, next) {
		var tokenId = uuid.v4();
		let self = this;
		var sql = "SELECT * FROM `Users` WHERE `email`=? AND `password`=? ";
		__con.query(tokenId, sql, [username, password], function (err, results) {
			if (err) {
				console.log("Error Running Report: " + err.message);
				return next(err);
			}
			if (results.length === 0) {
				console.log("Error Logging In");
				return next(new Error("Error Logging In"));
			} else {
				var user = new Object();
				user.id = results[0].id;
				user.name = results[0].name;
				user.email = results[0].email;
				user.type = results[0].type;
				user.password = results[0].password;
				if (__userToTokens[user.id] !== undefined) {
					user.tokenId = __userToTokens[user.id];
				} else {
					user.tokenId = uuid.v4();
				}
				if (__userToTokens[user.id] !== undefined) {
					if (__currentTokens[__userToTokens[user.id]] !== undefined) { delete __currentTokens[__userToTokens[user.id]]; }
					delete __userToTokens[user.id];
				}
				__currentTokens[user.tokenId] = new Object();
				__currentTokens[user.tokenId].user = user;
				__currentTokens[user.tokenId].timestamp = new Date();
				__userToTokens[user.id] = user.tokenId;
				return next(null, user);
			}
		});
	}

}