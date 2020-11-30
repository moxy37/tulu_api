const { v4: uuidv4 } = require('uuid');
var async = require('async');

var AddressDAO = require(__base + "dao/users/addressdao");
var addressDao = new AddressDAO();

var PhoneDAO = require(__base + "dao/users/phonedao");
var phoneDao = new PhoneDAO();

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

module.exports = MessageDAO;

function MessageDAO() {
	this.new = function (tokenId, obj, next) {
		var o = new Object();
		o.id = uuidv4();
		o.senderId = obj.userId;
		o.targetId = obj.targetId;
		o.dealerId = obj.dealerId;
		o.vin = obj.vin;
		o.isRead = 0;
		o.message = '';
		o.type = 'message';
		o.timestamp = new Date();
		return next(null, o);
	}

	this.isRead = function (tokenId, id, next) {
		let self = this;
		__con.query(tokenId, "UPDATE `Messages` SET `isRead`=1 WHERE `id`=?", id, function (err, result) {
			if (err) return next(err);
			var o = new Object();
			o.id = id;
			self.list(tokenId, o, function (err, list) {
				if (err) return next(err);
				return next(null, list[0]);
			});
		});
	}

	this.save = function (tokenId, obj, next) {
		let self = this;
		var linkId = '';
		if (obj.testDrive !== undefined) { linkId = obj.testDrive.id; }
		__con.query(tokenId, "INSERT INTO `Messages` (`id`, `senderId`, `targetId`, `type`, `message`, `vin`, `dealerId`, `isRead`, `linkId`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [obj.id, obj.senderId, obj.targetId, obj.type, obj.message, obj.vin, obj.dealerId, obj.isRead, linkId], function (err, result) {
			if (err) return next(err);
			if (linkId !== '') {
				self.saveTestDrive(tokenId, obj.testDrive, function (err, td) {
					if (err) return next(err);
					obj.testDrive = td;
					return next(null, obj);
				});
			} else {
				return next(null, obj);
			}
		});
	}

	this.list = function (tokenId, obj, next) {
		let self = this;
		var sql = "SELECT * FROM `MessagesView` ";
		var whereAdded = false;
		var params = [];
		if (obj.id !== undefined && obj.id !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "`id` = ? ";
			params.push(obj.id);
		}
		if (obj.dealerId !== undefined && obj.dealerId !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "`dealerId` = ? ";
			params.push(obj.dealerId);
		}
		if (obj.senderId !== undefined && obj.senderId !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "(`senderId` = ? OR `targetId`=?) ";
			params.push(obj.senderId);
			params.push(obj.senderId);
		}
		if (obj.targetId !== undefined && obj.targetId !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "`targetId` = ? ";
			params.push(obj.targetId);
		}
		if (obj.type !== undefined && obj.type !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "`type` = ? ";
			params.push(obj.type);
		}
		if (obj.vin !== undefined && obj.vin !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "`vin` = ? ";
			params.push(obj.vin);
		}
		if (obj.isRead !== undefined && obj.isRead !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = true;
				sql += "WHERE ";
			}
			sql += "`isRead` = ? ";
			params.push(obj.isRead);
		}
		sql += " ORDER BY `timestamp`";
		__con.query(tokenId, sql, params, function (err, results) {
			if (err) return next(err);
			var list = [];
			async.forEach(results, function (r, callback) {
				var o = new Object();
				o.id = r.id;
				o.senderId = r.senderId;
				o.targetId = r.targetId;
				o.type = r.type;
				o.timestamp = r.timestamp;
				o.message = r.message;
				o.vin = r.vin;
				o.dealerId = r.dealerId;
				o.isRead = r.isRead;
				o.targetName = r.targetName;
				o.senderName = r.senderName;
				o.testDrive = null;
				if (r.linkId !== '' && r.linkId !== undefined) {
					self.getTestDrive(tokenId, r.linkId, function (err, td) {
						o.testDrive = td;
						list.push(o);
						callback();
					});
				} else {
					list.push(o);
					callback();
				}
			}, function (err) {
				return next(null, list);
			});
		});
	}

	this.newTestDrive = function (tokenId, obj, next) {
		var o = new Object();
		o.id = uuidv4();
		o.vin = obj.vin;
		o.dealerId = obj.dealerId;
		o.userId = obj.userId;
		o.tuluId = obj.tuluId;
		o.timestamp = new Date();
		o.type = 'Test Drive';
		var primary = new Object();
		primary.targetId = obj.id;
		helperDao.new(tokenId, "Address", primary, function (err, a) {
			if (err) return next(err);
			o.address = a;
			return next(null, o);
		});
	}

	this.getTestDrive = function (tokenId, id, next) {
		__con.query(tokenId, "SELECT * FROM `TestDriveView` WHERE `id`=?", id, function (err, results) {
			if (err) return next(err);
			var o = new Object();
			var obj = results[0];
			o.id = obj.id;
			o.vin = obj.vin;
			o.dealerId = obj.dealerId;
			o.userId = obj.userId;
			o.tuluId = obj.tuluId;
			o.type = obj.type;
			var a = String(obj.timestamp).split(" ");
			var b = a[0].split("-");
			var c = a[1].split(":");
			o.timestamp = new Date(b[0], (b[1] - 1), b[2], b[0], c[1], c[2]);
			o.userName = obj.userName;
			o.tuluName = obj.tuluName;
			o.dealerName = obj.dealerName;
			addressDao.get(tokenId, id, function (err, list) {
				o.address = list[0];
				return next(null, o);
			});
		});
	}

	this.saveTestDrive = function (tokenId, obj, next) {
		let self = this;
		__con.query(tokenId, "DELETE FROM `TestDrive` WHERE `id`=?", obj.id, function (err, result) {
			if (err) return next(err);
			var ts = new Date(obj.timestamp).toISOString().slice(0, 19).replace('T', ' ');
			__con.query(tokenId, "INSERT INTO `TestDrive` (`id`, `vin`, `dealerId`, `userId`, `tuluId`, `type`, `timestamp`) VALUES (?, ?, ?, ?, ?, ?)", [obj.id, obj.vin, obj.dealerId, obj.userId, obj.tuluId, obj.type, ts], function (err, result) {
				if (err) return next(err);
				var list = [];
				list.push(obj.address);
				addressDao.save(tokenId, obj.id, list, function (err, newList) {
					if (err) return next(err);
					self.getTestDrive(tokenId, obj.id, function (err, results) {
						if (err) return next(err);
						return next(null, results);
					});
				});
			});
		});
	}
}