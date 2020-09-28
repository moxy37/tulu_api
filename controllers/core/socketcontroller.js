/*
*  The Spartacus Rapid Prototyping Toolbox 
Copyright (C) 2016 Dean Brennan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
* */
var express = require('express');
var async = require('async');

router = express.Router();


var WebSocketServer = require('ws').Server;
global.__wss = new WebSocketServer({ port: 1015 });

__wss.on('connection', function (ws) {
	console.log(ws.upgradeReq.connection.remoteAddress);
	ws.remoteAddress = ws.upgradeReq.connection.remoteAddress;
	__checkTables = true;
	// wss.broadcast('Connected to ' + ws.remoteAddress, ws.remoteAddress);
	//setInterval(rfidCon.rfidInterval, 1000);
});

__wss.on('message', function (message) {
	console.log('received: %s', message);
});

__wss.broadcast = function broadcast(data, ipAddress) {
	try {
		__wss.clients.forEach(function each(client) {
			console.log("Sending data " + data);
			if (ipAddress === undefined || ipAddress === client.remoteAddress) {
				client.send(data);
			}

		});
	} catch (err) {

	}
};


module.exports = router;