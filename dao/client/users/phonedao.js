var uuid = require("node-uuid");
var async = require('async');
module.exports = PhoneDAO;

function PhoneDAO() {


	this.get = function (tokenId, id, next) {
		__con.query(tokenId, "SELECT * FROM `Phone` WHERE `targetId`=? ORDER BY `sequence`", id, function (err, results) {
			if (err) return next(err);
			var list = [];
			async.forEach(results, function (r, callback) {
				var obj = new Object();
				obj.targetId = r.targetId;
				obj.type = r.type;
				obj.value = r.value;
				obj.sequence = r.sequence;
				list.push(obj);
				callback();
			}, function (err) {
				return next(null, list);
			});
		});
	}

	this.save = function (tokenId, targetId, list, next) {
		__con.query(tokenId, "DELETE FROM `Phones` WHERE `targetId`=?", targetId, function (err, result) {
			var newList = [];
			var sequence = 0;
			async.forEach(list, function (l, callback) {
				__con.query(tokenId, "INSERT INTO `Phones` (`targetId`, `type`, `value`, `sequence`) VALUES (? , ?, ?, ?)", [targetId, l.type, l.value, sequence], function (err, results) {
					var o = new Object();
					o.targetId = targetId;
					o.sequence = sequence;
					o.value = l.value;
					o.type = l.type;
					newList.push(o);
					sequence++;
					callback();
				});
			}, function (err) {
				return next(null, newList);
			});
		});
	}
}