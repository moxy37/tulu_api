const { v4: uuidv4 } = require('uuid');
var async = require('async');


module.exports = PhoneDAO;

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

function PhoneDAO() {
	this.get = function (tokenId, id, next) {
		var primary = new Object();
		primary.targetId = id;
		helperDao.list(tokenId, "Phone", primary, 'ORDER BY `sequence`', function (err, list) {
			if (err) return next(err);
			if (list === undefined) list = [];
			return next(null, list);
		});
	}

	this.new = function (tokenId, targetId, next) {
		var primary = new Object();
		primary.targetId = targetId;
		helperDao.new(tokenId, "Phone", primary, function (err, obj) {
			if (err) return next(err);
			obj.targetId = targetId;
			return next(null, obj);
		});
	}

	this.save = function (tokenId, targetId, list, next) {
		var primary = new Object();
		primary.targetId = targetId;
		helperDao.delete(tokenId, "Phone", primary, function (err, r) {
			var newList = [];
			var sequence = 0;
			async.forEach(list, function (l, callback) {
				primary.sequence = sequence;
				l.sequence = sequence;
				sequence++;
				helperDao.save(tokenId, "Phone", l, primary, function (err, o) {
					newList.push(l);
					callback();
				});
			}, function (err) {
				return next(null, newList);
			});
		});
	}
}