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