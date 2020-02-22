const express = require('express');
const router = express.Router();
const url = require('url');
const con = require("./db.js");

//add a player
router.get("/adduser", function (req, res) {
    var q = url.parse(req.url, true).query;
    var money = q.money;
    var sql = "INSERT INTO users (money)  VALUES (20)";
    con.query(sql, [money],function (err, result) {
        if (err)
            throw (err);
        else {
            console.log("line 24 " + result.insertId);
            var id = result.insertId;
            console.log("line 26 " + result.insertId.toString());
            res.send(result.insertId.toString());
        }
    });
});

//update saldo
router.get("/updateSaldo", function (req, res) {
    var q = url.parse(req.url, true).query;
    var id = q.id;
    var sql = "UPDATE users SET money=money-1 WHERE id=?";
    con.query(sql, [id],function (err, result) {
        if (err)
            throw (err);
        else {
            res.send("saldo updated");
        }
    });
});

//reset saldo
router.get("/resetSaldo", function (req, res) {
    var q = url.parse(req.url, true).query;
    var id = q.id;
    var sql = "UPDATE users SET money=20 WHERE id=?";
    con.query(sql, [id],function (err, result) {
        if (err)
            throw (err);
        else {
            res.send("saldo reset");
        }
    });
});
//get saldo
router.get("/getsaldo", function (req, res) {
    var q = url.parse(req.url, true).query;
    var id = q.id;
    var sql = "SELECT (money) FROM users WHERE id=?";
    con.query(sql, [id],function (err, result) {
        if (err)
            throw (err);
        else {
            res.send(result);
        }
    });
});

//get amount clicks
router.get("/clicks", function (req, res) {
    var sql = "SELECT (amount) FROM clicks WHERE id=1";
    con.query(sql,function (err, result) {
        if (err)
            throw (err);
        else {
            res.send(result);
        }
    });
});

//update amount clicks and return the new amount
router.get("/updateclicks", function (req, res) {
    var sql = "UPDATE clicks SET amount=amount+1 WHERE id=1";
    con.query(sql,function (err, result) {
        if (err)
            throw (err);
        else {
            var sql = "SELECT (amount) FROM clicks WHERE id=1";
            con.query(sql,function (err, result) {
                if (err)
                    throw (err);
                else {
                    res.send(result);
                }
            });
        }
    });

});
//update amount money
router.get("/addsaldo", function (req, res) {
    var q = url.parse(req.url, true).query;
    var amount = q.amount;
    var id = q.user;
    var sql = "UPDATE users SET money=money+? WHERE id=?";
    con.query(sql,[amount, id], function (err, result) {
        if (err)
            throw (err);
        else {
            res.send(result);
        }
    });

});

module.exports = router;
