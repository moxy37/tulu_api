const { v4: uuidv4 } = require('uuid');
var async = require('async');
module.exports = UsersDAO;

var AddressDAO = require(__base + "dao/users/addressdao");
var addressDao = new AddressDAO();

var PhoneDAO = require(__base + "dao/users/phonedao");
var phoneDao = new PhoneDAO();

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

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
		var tokenId = uuidv4();
		let self = this;
		var sql = "SELECT * FROM `Users` WHERE `email`=? AND `password`=? ";
		__con.query(tokenId, sql, [username, password], function (err, results) {
			// console.log(JSON.stringify(results));
			if (err) {
				console.log("Error Running Report: " + err.message);
				return next(err);
			}
			if (results.length === 0) {
				console.log("Error Logging In");
				return next(new Error("Error Logging In"));
			} else {
				self.get(tokenId, results[0].id, function (err, user) {
					if (err) return next(err);
					if (__userToTokens[user.id] !== undefined) {
						user.tokenId = __userToTokens[user.id];
					} else {
						user.tokenId = uuidv4();
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
				});
			}
		});
	}

	this.getDealerUsers = function (tokenId, dealerId, next) {
		let self = this;
		__con.query(tokenId, "SELECT * FROM `UserRoles` WHERE `targetId` = ?", dealerId, function (err, results) {
			var list = [];
			async.forEach(results, function (r, callback) {
				self.get(tokenId, r.userId, function (err, o) {
					list.push(o);
					callback();
				});
			}, function (err) {
				return next(null, list);
			});
		});
	}

	this.list = function (tokenId, obj, next) {
		let self = this;
		var sql = "SELECT * FROM `Users` ";
		var whereAdded = false;
		var params = [];
		if (obj.email !== undefined && obj.email !== "") {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "`email` = ? ";
			params.push(obj.email);
		}
		if (obj.name !== undefined  && obj.name !== "") {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "LOWER(`name`) LIKE '%" + obj.name + "%' ";
			params.push(obj.name);
		}
		sql += "ORDER BY `name`";
		__con.query(tokenId, sql, params, function (err, results) {
			var list = [];
			async.forEach(results, function (r, callback) {
				self.get(tokenId, r.id, function (err, o) {
					list.push(o);
					callback();
				});
			}, function (err) {
				return next(null, list);
			});
		});
	}

	this.get = function (tokenId, id, next) {
		var tokenId = uuidv4();
		var primary = new Object();
		primary.id = id;
		helperDao.get(tokenId, "Users", primary, function (err, user) {
			if (err) {
				console.log("Error Running Report: " + err.message);
				return next(err);
			}
			if (user === undefined || user.length === 0) {
				console.log("Can't find user");
				return next(new Error("Error Logging In"));
			} else {
				user.addresses = [];
				user.phones = [];
				user.roles = [];
				user.userRoles = [];
				addressDao.get(tokenId, id, function (err, list) {
					user.addresses = list;
					phoneDao.get(tokenId, id, function (err, phones) {
						user.phones = phones;
						var p = new Object();
						p.userId = id;
						helperDao.list(tokenId, "UserRoles", p, '', function (err, list) {
							if (err) return next(err);
							user.roles = list;
							helperDao.getRoles(tokenId, user, function (err, list) {
								user.userRoles = list;
								return next(null, user);
							});
						});
					});
				});
			}
		});
	}

	this.new = function (tokenId, next) {
		helperDao.new(tokenId, "Users", null, function (err, obj) {
			if (err) return next(err);
			obj.id = uuidv4();
			obj.phones = [];
			obj.addresses = [];
			obj.roles = [];
			var rr = new Object();
			rr.userId = obj.id;
			rr.role = 'User';
			rr.targetId = '';
			obj.userRoles = [];
			obj.userRoles.push('User');
			obj.roles.push(rr);
			var primary = new Object();
			primary.targetId = obj.id;
			helperDao.new(tokenId, "Address", primary, function (err, o) {
				if (err) return next(err);
				obj.addresses.push(o);
				helperDao.new(tokenId, "Phone", primary, function (err, o) {
					if (err) return next(err);
					obj.phones.push(o);
					return next(null, obj);
				});
			});
		});
	}

	this.save = function (tokenId, user, next) {
		var primary = new Object();
		primary.id = user.id;
		helperDao.save(tokenId, "Users", user, primary, function (err, result) {
			addressDao.save(tokenId, user.id, user.addresses, function (err, list) {
				if (err) return next(err);
				phoneDao.save(tokenId, user.id, user.phones, function (err, list) {
					if (err) return next(err);
					var roles = [];
					__con.query(tokenId, "DELETE FROM `UserRoles` WHERE `userId`=?", user.id, function (err, result) {
						if (err) return next(err);
						async.forEach(user.roles, function (r, callback) {
							__con.query(tokenId, "INSERT INTO `UserRoles` (`userId`, `targetId`, `role`) VALUES (?, ?, ?)", [r.userId, r.targetId, r.role], function (err, result) {
								if (err) return next(err);
								roles.push(r);
								callback();
							});
						}, function (err) {
							user.roles = roles;
							helperDao.getRoles(tokenId, user, function (err, list) {
								user.userRoles = list;
								return next(null, user);
							});
						});
					});
				});
			});
		});
	}

	this.delete = function (tokenId, user, next) {
		var primary = new Object();
		primary.id = user.id;
		helperDao.delete(tokenId, "Users", primary, function (err, obj) {
			if (err) return next(err);
			var p = new Object();
			p.targetId = user.id;
			helperDao.delete(tokenId, "Address", primary, function (err, obj) {
				if (err) return next(err);
				helperDao.delete(tokenId, "Phone", primary, function (err, obj) {
					if (err) return next(err);
					__con.query(tokenId, "DELETE FROM `UserRoles` WHERE `userId`=?", user.id, function (err, result) {
						if (err) return next(err);
						return next(null, obj);
					});
				});
			});
		});
	}
}