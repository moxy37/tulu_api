var uuid = require("node-uuid");
var async = require('async');
module.exports = HelperDAO;

function HelperDAO() {
	this.loadResult = function (tokenId, result, next) {
		var obj = new Object();
		var keys = Object.keys(result);
		async.forEach(keys, function (k, callback) {
			obj[k] = result[k];
			callback();
		}, function (err) {
			return next(null, obj);
		});
	}

	this.loadResults = function (tokenId, results, next) {
		let self = this;
		var list = [];
		async.forEach(results, function (r, callback) {
			self.loadResult(tokenId, r, function (err, obj) {
				list.push(obj);
				callback();
			});
		}, function (err) {
			return next(null, list);
		});
	}

}