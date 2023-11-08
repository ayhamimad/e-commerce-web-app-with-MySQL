// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.loginUser = void 0;
// var jsonwebtoken_1 = require("jsonwebtoken");
// var models_1 = require("../models/");
// var User = models_1.default.user;
// var loginUser = function (req, res) {
//     var user = req.body.user;
//     var token = jsonwebtoken_1.default.sign({ id: user.id }, 'top-secret', { expiresIn: '1h' });
//     res.json({ token: token });
// };
// exports.loginUser = loginUser;
