var uuid = require("node-uuid");
var async = require('async');
module.exports = VehicleDAO;

function VehicleDAO() {
	this.list = function (tokenId, obj, next) {
		var sql = "SELECT * FROM `DealerList` ";
		var whereAdded = false;
		var params = [];
		if (obj.dealerIds !== undefined && obj.dealerIds.length !== 0) {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = truel
				sql += "WHERE ";
			}
			sql += "`dealerId` IN (";
			for (var i = 0; i < obj.dealerIds.length; i++) {
				if (i > 0) { sql += ", "; }
				sql += "?";
				params.push(obj.dealerIds[i]);
			}
			sql += ") ";
		}
		if (obj.makes !== undefined && obj.makes.length !== 0) {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = truel
				sql += "WHERE ";
			}
			sql += "`make` IN (";
			for (var i = 0; i < obj.makes.length; i++) {
				if (i > 0) { sql += ", "; }
				sql += "?";
				params.push(obj.makes[i]);
			}
			sql += ") ";
		}
		if (obj.models !== undefined && obj.models.length !== 0) {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = truel
				sql += "WHERE ";
			}
			sql += "`model` IN (";
			for (var i = 0; i < obj.models.length; i++) {
				if (i > 0) { sql += ", "; }
				sql += "?";
				params.push(obj.models[i]);
			}
			sql += ") ";
		}
		sql += "ORDER BY `dealerId`, `make`, `model`, `year` ";
		let self = this;
		__con.query(tokenId, sql, params, function (err, results) {
			var list = [];
			async.forEach(results, function (r, callback) {
				self.get(tokenId, r.vin, function (err, vehicle) {
					list.push(vehicle);
					callback();
				});
			}, function (err) {
				return next(null, list);
			});
		});
	}

	this.get = function (tokenId, vin, dealerId, next) {
		__con.query(tokenId, "SELECT * FROM `DealerList` WHERE `vin`=? AND `dealerId`=?", [vin, dealerId], function (err, results) {
			if (err) return next(err);
			if (results.length === 0) {
				return next(new Error("No results"));
			} else {
				var r = results[0];
				var obj = new Object();
				obj.vin = r.vin;
				obj.make = r.make;
				obj.year = r.year;
				obj.trim = r.trim;
				obj.model = r.model;
				obj.dealerId = r.dealerId;
				obj.links = [];
				__con.query(tokenId, "SELECT * FROM `VehicleLinks` WHERE `vin`=?", vin, function (err, result) {
					async.forEach(result, function (rr, callback) {
						var o = new Object();
						o.vin = vin;
						o.name = rr.name;
						o.url = rr.url;
						o.type = rr.type;
						obj.links.push(o);
						callback();
					}, function (err) {
						return next(null, obj);
					});
				});
			}
		});
	}

	this.save = function (tokenId, vehicle, next) {
		var list = [];
		async.series([
			function (callback) {
				__con.query(tokenId, "DELETE FROM `DealerVehicle` WHERE `vin`=? AND `dealerId`=?", [vehicle.vin, vehicle.dealerId], function (err, result) {
					if (err) return next(err);
					callback();
				});
			},
			function (callback) {
				__con.query(tokenId, "DELETE FROM `Vehicle` WHERE `vin`=?", vehicle.vin, function (err, result) {
					callback();
				});
			},
			function (callback) {
				__con.query(tokenId, "DELETE FROM `VehicleLinks` WHERE `vin`=?", vehicle.vin, function (err, result) {
					callback();
				});
			},
			function (callback) {
				__con.query(tokenId, "INSERT INTO `Vehicle` (`make`, `model`, `year`, `trim`, `vin`) VALUES (?, ?, ?, ?, ?, ?)", [vehicle.make, vehicle.model, vehicle.year, vehicle.trim, vehicle.vin], function (err, result) {
					callback();
				});
			},
			function (callback) {
				__con.query(tokenId, "INSERT INTO `DealerVehicle` (`vin`, `dealerId`) VALUES (?, ?)", [vehicle.vin, vehicle.dealerId], function (err, result) {
					callback();
				});
			}, function (callback) {
				async.forEach(vehicle.links, function (link, callback2) {
					__con.query(tokenId, "INSERT INTO `VehicleLinks` (`vin`, `name`, `url`, `type`) VALUES (?, ?, ?, ?)", [link.vin, link.name, link.url, link.type], function (err, l) {
						list.push(link);
						callback2();
					});
				}, function (err) {
					vehicle.links = list;
					callback();
				});
			}
		], function (err) {
			return next(null, vehicle);
		})
	}

	this.delete = function (tokenId, vehvicle, next) {
		__con.query(tokenId, "DELETE FROM `Vehicle` WHERE `vin`=?", vehicle.vin, function (err, result) {
			__con.query(tokenId, "DELETE FROM `VehicleLinks` WHERE `vin`=?", vehicle.vin, function (err, result) {
				__con.query(tokenId, "DELETE FROM `DealerVehicle` WHERE `vin`=? AND `dealerId`=?", [vehicle.vin, vehicle.dealerId], function (err, result) {
					var obj = new Object();
					obj.message = "Vehicle Deleted";
					return next(null, obj);
				});
			});
		});
	}
}