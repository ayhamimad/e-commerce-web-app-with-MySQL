"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Reviews = models_1.default.review;
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resultsPerPage, page, _a, new_arrival, category, handpicked, brand, search_term, filteredProducts, currentDate, threeMonthsAgo, _b, count, rows, totalPages, productsWithReviewCounts, _i, rows_1, product, reviewCount, categoryName, categorySearch, _c, count, rows, totalPages, productsWithReviewCounts, _d, rows_2, product, reviewCount, _e, count, rows, totalPages, branNname, brandSearch, _f, count, rows, totalPages, productsWithReviewCounts, _g, rows_3, product, reviewCount, search_termName, brandSearch, _h, count, rows, totalPages, productsWithReviewCounts, _j, rows_4, product, reviewCount, productDetails, count, productInfo, err_1;
    var _k, _l, _m, _o, _p, _q, _r;
    return __generator(this, function (_s) {
        switch (_s.label) {
            case 0:
                _s.trys.push([0, 33, , 34]);
                resultsPerPage = parseInt(req.query.per_page, 10) || 12;
                page = parseInt(req.query.page, 10) || 1;
                _a = req.query, new_arrival = _a.new_arrival, category = _a.category, handpicked = _a.handpicked, brand = _a.brand, search_term = _a.search_term;
                filteredProducts = void 0;
                if (!(new_arrival === 'true')) return [3 /*break*/, 6];
                currentDate = new Date();
                threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            createdAt: (_k = {},
                                _k[sequelize_1.Op.gt] = threeMonthsAgo,
                                _k[sequelize_1.Op.lt] = currentDate,
                                _k),
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 1:
                _b = _s.sent(), count = _b.count, rows = _b.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                productsWithReviewCounts = [];
                _i = 0, rows_1 = rows;
                _s.label = 2;
            case 2:
                if (!(_i < rows_1.length)) return [3 /*break*/, 5];
                product = rows_1[_i];
                return [4 /*yield*/, Reviews.findAndCountAll({
                        where: { product_id: product.id },
                    })];
            case 3:
                reviewCount = (_s.sent()).count;
                productsWithReviewCounts.push(__assign(__assign({}, product.toJSON()), { ratingCount: reviewCount }));
                _s.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.json({
                    results: productsWithReviewCounts,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                _s.label = 6;
            case 6:
                if (!category) return [3 /*break*/, 15];
                categoryName = req.query.category;
                return [4 /*yield*/, Category.findOne({
                        where: {
                            name: (_l = {}, _l[sequelize_1.Op.like] = "%".concat(categoryName, "%"), _l), // Use Op.like for a case-insensitive search
                        },
                    })];
            case 7:
                categorySearch = _s.sent();
                if (!(handpicked === 'true')) return [3 /*break*/, 13];
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            categoryID: categorySearch.id,
                            price: (_m = {},
                                _m[sequelize_1.Op.lt] = 100,
                                _m),
                            rate: (_o = {},
                                _o[sequelize_1.Op.gt] = 4.5,
                                _o),
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 8:
                _c = _s.sent(), count = _c.count, rows = _c.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                productsWithReviewCounts = [];
                _d = 0, rows_2 = rows;
                _s.label = 9;
            case 9:
                if (!(_d < rows_2.length)) return [3 /*break*/, 12];
                product = rows_2[_d];
                return [4 /*yield*/, Reviews.findAndCountAll({
                        where: { product_id: product.id },
                    })];
            case 10:
                reviewCount = (_s.sent()).count;
                productsWithReviewCounts.push(__assign(__assign({}, product.toJSON()), { ratingCount: reviewCount }));
                _s.label = 11;
            case 11:
                _d++;
                return [3 /*break*/, 9];
            case 12:
                res.json({
                    results: productsWithReviewCounts,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                return [3 /*break*/, 15];
            case 13: return [4 /*yield*/, Product.findAndCountAll({
                    where: {
                        categoryID: categorySearch.id,
                    },
                    offset: (page - 1) * resultsPerPage,
                    limit: resultsPerPage,
                })];
            case 14:
                _e = _s.sent(), count = _e.count, rows = _e.rows;
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
                _s.label = 15;
            case 15:
                if (!brand) return [3 /*break*/, 22];
                branNname = req.query.brand;
                return [4 /*yield*/, Brand.findOne({
                        where: {
                            name: (_p = {}, _p[sequelize_1.Op.like] = "%".concat(branNname, "%"), _p), // Use Op.like for a case-insensitive search
                        },
                    })];
            case 16:
                brandSearch = _s.sent();
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            brandID: brandSearch.id,
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 17:
                _f = _s.sent(), count = _f.count, rows = _f.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                productsWithReviewCounts = [];
                _g = 0, rows_3 = rows;
                _s.label = 18;
            case 18:
                if (!(_g < rows_3.length)) return [3 /*break*/, 21];
                product = rows_3[_g];
                return [4 /*yield*/, Reviews.findAndCountAll({
                        where: { product_id: product.id },
                    })];
            case 19:
                reviewCount = (_s.sent()).count;
                productsWithReviewCounts.push(__assign(__assign({}, product.toJSON()), { ratingCount: reviewCount }));
                _s.label = 20;
            case 20:
                _g++;
                return [3 /*break*/, 18];
            case 21:
                res.json({
                    results: productsWithReviewCounts,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                _s.label = 22;
            case 22:
                if (!search_term) return [3 /*break*/, 32];
                search_termName = req.query.search_term;
                return [4 /*yield*/, Brand.findOne({
                        where: {
                            name: (_q = {}, _q[sequelize_1.Op.like] = "%".concat(search_termName, "%"), _q), // Use Op.like for a case-insensitive search
                        },
                    })];
            case 23:
                brandSearch = _s.sent();
                if (!brandSearch) return [3 /*break*/, 29];
                return [4 /*yield*/, Product.findAndCountAll({
                        where: {
                            brandID: brandSearch.id,
                        },
                        offset: (page - 1) * resultsPerPage,
                        limit: resultsPerPage,
                    })];
            case 24:
                _h = _s.sent(), count = _h.count, rows = _h.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                productsWithReviewCounts = [];
                _j = 0, rows_4 = rows;
                _s.label = 25;
            case 25:
                if (!(_j < rows_4.length)) return [3 /*break*/, 28];
                product = rows_4[_j];
                return [4 /*yield*/, Reviews.findAndCountAll({
                        where: { product_id: product.id },
                    })];
            case 26:
                reviewCount = (_s.sent()).count;
                productsWithReviewCounts.push(__assign(__assign({}, product.toJSON()), { ratingCount: reviewCount }));
                _s.label = 27;
            case 27:
                _j++;
                return [3 /*break*/, 25];
            case 28:
                res.status(200).json({
                    results: productsWithReviewCounts,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                return [3 /*break*/, 32];
            case 29: return [4 /*yield*/, Product.findAll({
                    where: {
                        name: (_r = {}, _r[sequelize_1.Op.like] = "%".concat(search_term, "%"), _r), // Use Op.like for a case-insensitive search
                    },
                })];
            case 30:
                productDetails = _s.sent();
                return [4 /*yield*/, Reviews.findAndCountAll({ where: { product_id: productDetails.id } })];
            case 31:
                count = (_s.sent()).count;
                if (productDetails) {
                    productInfo = __assign(__assign({}, productDetails.toJSON()), { ratingCount: count });
                    res.status(200).json(productInfo);
                }
                else {
                    res.status(404).json({ message: 'No matching products found.' });
                }
                _s.label = 32;
            case 32: return [3 /*break*/, 34];
            case 33:
                err_1 = _s.sent();
                console.error('Error:', err_1);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 34];
            case 34: return [2 /*return*/];
        }
    });
}); };
exports.list = list;
