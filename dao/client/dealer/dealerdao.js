var uuid = require("node-uuid");
var async = require('async');
module.exports = DealerDAO;

var AddressDAO = require(__base + "dao/client/users/addressdao");
var addressDao = new AddressDAO();

var PhoneDAO = require(__base + "dao/client/users/phonedao");
var phoneDao = new PhoneDAO();

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

function DealerDAO() {
	this.list = function (tokenId, next) {
		let self = this;
		__con.query(tokenId, "SELECT * FROM `Dealer` ORDER BY `name`", function (err, results) {
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
		var primary = new Object();
		primary.id = id;
		helperDao.get(tokenId, "Dealer", primary, function (err, obj) {
			if (err) return next(err);
			obj.addresses = [];
			obj.phones = [];
			addressDao.get(tokenId, id, function (err, list) {
				if (err) return next(err);
				obj.addresses = list;
				phoneDao.get(tokenId, id, function (err, list) {
					if (err) return next(err);
					obj.phones = list;
					return next(null, obj);
				});
			});
		});
	}

	this.new = function (tokenId, next) {
		helperDao.new(tokenId, "Dealer", null, function (err, obj) {
			if (err) return next(err);
			obj.id = uuid.v4();
			obj.addresses = [];
			obj.phones = [];
			return next(null, obj);
		});
	}

	this.save = function (tokenId, obj, next) {
		var primary = new Object();
		primary.id = obj.id;
		helperDao.save(tokenId, "Dealer", obj, primary, function (err, result) {
			if (err) return next(err);
			addressDao.save(tokenId, obj.id, obj.addresses, function (err, list) {
				if (err) return next(err);
				obj.addresses = list;
				phoneDao.save(tokenId, obj.id, obj.phones, function (err, list) {
					if (err) return next(err);
					obj.phones = list;
					return next(null, obj);
				});
			});
		});
	}

}