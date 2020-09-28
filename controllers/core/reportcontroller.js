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


router = express.Router();
var DocumentDAO = require(__base + "dao/core/documentdao");
var dCon = new DocumentDAO();

global.__currentTokens = new Object();
global.__userToTokens = new Object();
global.__defaultSessionTime = 900000;

router.put('/api/user/login', function (req, res) {
    var data = req.body;
    var username = data.email;
    var password = data.password;
    dCon.login(username, password, function (err, user) {
        __currentTokens[user.tokenId] = new Object();
        __currentTokens[user.tokenId].user = user;
        __currentTokens[user.tokenId].timestamp = new Date();
        __userToTokens[user.id] = user.tokenId;
        return res.send(user);
    });
});


router.get('/user', function (req, res) {
    res.render('core/user');
});

router.get('/',function(req,res){
    res.render('core/index');
});

router.get('/api/user/logout/:tokenId', function (req, res) {
    var tokenId = req.params.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        var obj = new Object();
        obj.message = "Logged out";
        if (__userToTokens[__currentTokens[tokenId].user.id] !== undefined) { delete __userToTokens[__currentTokens[tokenId].user.id]; }
        delete __currentTokens[tokenId];
        return res.send(obj);
    } else { return res.status(404).send("Invalid Token"); }
});

router.get('/api/user/current/:tokenId', function (req, res) {
    var tokenId = req.params.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        __currentTokens[tokenId].timestamp = new Date();
        return res.send(__currentTokens[tokenId].user);
    } else { return res.status(404).send("Error"); }
});

setInterval(dCon.checkTokens, 60000);

module.exports = router;