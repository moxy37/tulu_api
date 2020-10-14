var uuid = require("node-uuid");
var async = require('async');
module.exports = AddressDAO;

function AddressDAO() {


	this.get = function (tokenId, id, next) {
		__con.query(tokenId, "SELECT * FROM `Address` WHERE `targetId`=? ORDER BY `sequence`", id, function (err, results) {
			if (err) return next(err);
			var list = [];
			async.forEach(results, function (r, callback) {
				var obj = new Object();
				obj.targetId = r.targetId;
				obj.name = r.name;
				obj.street = r.street;
				obj.city = r.city;
				obj.province = r.province;
				obj.postal = r.postal;
				obj.sequence = r.sequence;
				list.push(obj);
				callback();
			}, function (err) {
				return next(null, list);
			});
		});
	}

}