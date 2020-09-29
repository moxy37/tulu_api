var uuid = require("node-uuid");
module.exports = VehicleDAO;

function VehicleDAO() {
	this.list = function (tokenId, obj, next) {
		var list = [];
		return next(null, list);
	}

}