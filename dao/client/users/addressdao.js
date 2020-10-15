var uuid = require("node-uuid");
var async = require('async');

module.exports = AddressDAO;

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

function AddressDAO() {
	this.get = function (tokenId, id, next) {
		__con.query(tokenId, "SELECT * FROM `Address` WHERE `targetId`=? ORDER BY `sequence`", id, function (err, results) {
			if (err) return next(err);
			helperDao.loadResults(tokenId, results, function (err, list) {
				return next(null, list);
			});
		});
	}

}