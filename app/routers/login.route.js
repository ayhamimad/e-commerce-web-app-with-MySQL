"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var models_1 = require("../models/");
var User = models_1.default.user;
var router = express.Router();
router.post('/', function (req, res, next) {
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) {
            return res.status(500).json({ error: 'Authentication error: ' + err.message });
        }
        if (!user) {
            // Authentication failed
            if (info && info.message === 'Incorrect username.') {
                return res.status(401).json({ message: 'Incorrect email.' });
            }
            else if (info && info.message === 'Incorrect password.') {
                return res.status(401).json({ message: 'Incorrect password.' });
            }
            else {
                return res.status(401).json({ message: 'Authentication failed. Incorrect email or password.' });
            }
        }
        // Authentication successful, generate a JWT token
        var token = jwt.sign({ id: user.id }, 'top-secret', { expiresIn: '1h' });
        return res.json({ token: token });
    })(req, res, next);
});
exports.default = router;
