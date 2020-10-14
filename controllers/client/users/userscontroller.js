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
var uuid = require("node-uuid");

var UsersDAO = require(__base + "dao/client/users/usersdao");
var usersDao = new UsersDAO();
router = express.Router();


router.put("/api/user/login", function (req, res) {
    var data = req.body;
    var username = data.email;
    var password = data.password;
    usersDao.login(username, password, function (err, user) {
        return res.send(user);
    });
});

router.get('/user', function (req, res) {
	console.log("DOING IT");
    res.render('client/test/login');
});

router.get('/',function(req,res){
    res.render('client/test/home');
});

setInterval(usersDao.checkTokens, 60000);

module.exports = router;