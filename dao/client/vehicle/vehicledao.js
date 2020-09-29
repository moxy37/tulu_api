var uuid = require("node-uuid");
module.exports = VehicleDAO;

function VehicleDAO() {
	this.list = function (tokenId, obj, next) {
		var list = [];
		var v1 = new Object();
		v1.make = 'Ford';
		v1.model = 'Focus';
		v1.year = '2010';
		v1.vin = '1234567890';
		list.push(v1);
		var v2 = new Object();
		v2.make = 'Ford';
		v2.model = 'Fusion';
		v2.year = '2019';
		v2.vin = '0201010';
		list.push(v2);
		return next(null, list);
	}

}