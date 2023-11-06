"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
var models_1 = require("../models");
var sequelize_1 = require("sequelize");
var Brand = models_1.default.brand;
var Product = models_1.default.product;
var Category = models_1.default.category;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resultsPerPage, page, _a, new_arrival, category, handpicked, brand, search_term, filteredProducts, currentDate, threeMonthsAgo, _b, count, rows, totalPages, categoryName, categorySearch, _c, count, rows, totalPages, _d, count, rows, totalPages, branNname, brandSearch, _e, count, rows, totalPages, search_termName, brandSearch, _f, count, rows, totalPages, productDetails, err_1;
    var _g, _h, _j, _k, _l, _m, _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                _p.trys.push([0, 16, , 17]);
                resultsPerPage = parseInt(req.query.per_page, 10) || 12;
                page = parseInt(req.query.page, 10) || 1;
                _a = req.query, new_arrival = _a.new_arrival, category = _a.category, handpicked = _a.handpicked, brand = _a.brand, search_term = _a.search_term;
                filteredProducts = void 0;
                if (!(new_arrival === 'true')) return [3 /*break*/, 2];
                currentDate = new Date();
                threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            createdAt: (_g = {},
                                _g[sequelize_1.Op.gt] = threeMonthsAgo,
                                _g[sequelize_1.Op.lt] = currentDate,
                                _g),
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 1:
                _b = _p.sent(), count = _b.count, rows = _b.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                res.json({
                    results: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                _p.label = 2;
            case 2:
                if (!category) return [3 /*break*/, 7];
                categoryName = req.query.category;
                return [4 /*yield*/, Category.findOne({
                        where: {
                            name: (_h = {}, _h[sequelize_1.Op.like] = "%".concat(categoryName, "%"), _h), // Use Op.like for a case-insensitive search
                        },
                    })];
            case 3:
                categorySearch = _p.sent();
                if (!(handpicked === 'true')) return [3 /*break*/, 5];
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            categoryID: categorySearch.id,
                            price: (_j = {},
                                _j[sequelize_1.Op.lt] = 100,
                                _j),
                            rate: (_k = {},
                                _k[sequelize_1.Op.gt] = 4.5,
                                _k),
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 4:
                _c = _p.sent(), count = _c.count, rows = _c.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                res.json({
                    results: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, Product.findAndCountAll({
                    where: {
                        categoryID: categorySearch.id,
                    },
                    offset: (page - 1) * resultsPerPage,
                    limit: resultsPerPage,
                })];
            case 6:
                _d = _p.sent(), count = _d.count, rows = _d.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                res.json({
                    results: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                _p.label = 7;
            case 7:
                if (!brand) return [3 /*break*/, 10];
                branNname = req.query.brand;
                return [4 /*yield*/, Brand.findOne({
                        where: {
                            name: (_l = {}, _l[sequelize_1.Op.like] = "%".concat(branNname, "%"), _l), // Use Op.like for a case-insensitive search
                        },
                    })];
            case 8:
                brandSearch = _p.sent();
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            brandID: brandSearch.id,
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 9:
                _e = _p.sent(), count = _e.count, rows = _e.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                res.json({
                    results: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                _p.label = 10;
            case 10:
                if (!search_term) return [3 /*break*/, 15];
                search_termName = req.query.search_term;
                return [4 /*yield*/, Brand.findOne({
                        where: {
                            name: (_m = {}, _m[sequelize_1.Op.like] = "%".concat(search_termName, "%"), _m), // Use Op.like for a case-insensitive search
                        },
                    })];
            case 11:
                brandSearch = _p.sent();
                if (!brandSearch) return [3 /*break*/, 13];
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            brandID: brandSearch.id,
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 12:
                _f = _p.sent(), count = _f.count, rows = _f.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                res.status(200).json({
                    results: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                return [3 /*break*/, 15];
            case 13: return [4 /*yield*/, Product.findOne({
                    where: {
                        name: (_o = {}, _o[sequelize_1.Op.like] = "%".concat(search_term, "%"), _o), // Use Op.like for a case-insensitive search
                    },
                })];
            case 14:
                productDetails = _p.sent();
                if (productDetails) {
                    res.status(200).json(productDetails);
                }
                else {
                    res.status(404).json({ message: 'No matching products found.' });
                }
                _p.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                err_1 = _p.sent();
                console.error('Error:', err_1);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.list = list;
