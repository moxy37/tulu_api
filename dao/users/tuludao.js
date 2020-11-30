const { v4: uuidv4 } = require('uuid');
var async = require('async');
module.exports = TuluDAO;

var AddressDAO = require(__base + "dao/users/addressdao");
var addressDao = new AddressDAO();

var PhoneDAO = require(__base + "dao/users/phonedao");
var phoneDao = new PhoneDAO();

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

var UsersDAO = require(__base + "dao/users/usersdao");
var usersDao = new UsersDAO();

var VehicleDAO = require(__base + "dao/vehicle/vehicledao");
var vehicleDao = new VehicleDAO();

function TuluDAO() {
	this.saveFav = function (tokenId, tuluId, vin, dealerId, next) {
		let self = this;
		self.deleteFav(tokenId, tuluId, vin, dealerId, function (err, result) {
			__con.query(tokenId, "INSERT INTO `TuluFavorite` (`tuluId`, `vin`, `dealerId`) VALUES (?, ?, ?)", [tuluId, vin, dealerId], function (err, result) {
				if (err) return next(err);
				var obj = new Object();
				obj.tuluId = tuluId;
				obj.vin = vin;
				obj.dealerId = dealerId;
				obj.timestamp = new Date();
				return next(null, obj);
			});
		});
	}

	this.listFav = function (tokenId, tuluId, next) {
		__con.query(tokenId, "SELECT * FROM `TuluFavorite` WHERE `tuluId`=? ORDER BY `timestamp`", tuluId, function (err, results) {
			if (err) return next(err);
			var list = [];
			async.forEach(results, function (r, callback) {
				vehicleDao.get(tokenId, r.vin, r.dealerId, function (err, vehicle) {
					if (err) return next(err);
					list.push(vehicle);
					callback();
				});
			}, function (err) {
				return next(null, list);
			});
		});
	}

	this.deleteFav = function (tokenId, tuluId, vin, dealerId, next) {
		__con.query(tokenId, "DELETE FROM `TuluFavorite` WHERE `tuluId`=? AND `vin`=? AND `dealerId`=?", [tuluId, vin, dealerId], function (err, result) {
			if (err) return next(err);
			return next(null, result);
		});
	}
}