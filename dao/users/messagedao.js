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
	
	this.save = function (tokenId, obj, next) {
		__con.query(tokenId, "INSERT INTO `Messages` (`id`, `senderId`, `targetId`, `type`, `message`, `vin`, `dealerId`, `isRead`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [obj.id, obj.senderId, obj.targetId, obj.type, obj.message, obj.vin, obj.dealerId, obj.isRead], function (err, result) {
			if (err) return next(err);
			return next(null, obj);
		});
	}

	this.list = function (tokenId, userId, next) {
		__con.query(tokenId, "SELECT * FROM `Messages` WHERE `userId`=? ORDER BY `timestamp`", userId, function (err, results) {
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