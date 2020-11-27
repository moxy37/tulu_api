const { v4: uuidv4 } = require('uuid');
var async = require('async');

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
		__con.query(tokenId, "INSERT INTO `Messages` (`id`, `senderId`, `targetId`, `type`, `message`, `vin`, `dealerId`, `isRead`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [obj.id, obj.senderId, obj.targetId, obj.type, obj.message, obj.vin, obj.dealerId, obj.isRead], function (err, result) {
			if (err) return next(err);
			return next(null, obj);
		});
	}

	this.list = function (tokenId, obj, next) {
		var sql = "SELECT * FROM `Messages` ";
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
				list.push(o);
				callback();
			}, function (err) {
				return next(null, list);
			});
		});
	}
}