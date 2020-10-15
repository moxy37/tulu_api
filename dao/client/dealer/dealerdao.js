var uuid = require("node-uuid");
var async = require('async');
module.exports = DealerDAO;

var AddressDAO = require(__base + "dao/client/users/addressdao");
var addressDao = new AddressDAO();

var PhoneDAO = require(__base + "dao/client/users/phonedao");
var phoneDao = new PhoneDAO();

function DealerDAO() {
	this.get = function (tokenId, id, next) {
		__con.query(tokenId, "SELECT * FROM `Dealer` WHERE `id`=?", id, function (err, results) {
			if (err) return next(err);
			if (results.length === 0) {
				return next(new Error("Not found"));
			} else {
				var obj = new Object();
				obj.id = results[0].id;
				obj.name = results[0].name;
				obj.addresses = [];
				obj.phones = [];
				addressDao.get(tokenId, id, function (err, list) {
					obj.addresses = list;
					phoneDao.get(tokenId, id, function (err, list) {
						obj.phones = list;
						return next(null, obj);
					});
				});
			}
		});
	}

}