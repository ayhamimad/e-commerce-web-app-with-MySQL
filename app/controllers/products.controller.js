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
    var resultsPerPage, page, _a, category, brand, handpicked, new_arrival, search_term, whereClause, categoryName, categorySearch, brandName, brandSearch, currentDate, threeMonthsAgo, search_termName, brandSearch, _b, count, rows, totalPages, productsWithReviewCounts, _i, rows_1, product, reviewCount, err_1;
    var _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _k.trys.push([0, 12, , 13]);
                resultsPerPage = parseInt(req.query.per_page, 10) || 12;
                page = parseInt(req.query.page, 10) || 1;
                _a = req.query, category = _a.category, brand = _a.brand, handpicked = _a.handpicked, new_arrival = _a.new_arrival, search_term = _a.search_term;
                whereClause = {};
                if (!category) return [3 /*break*/, 2];
                categoryName = req.query.category;
                return [4 /*yield*/, Category.findOne({
                        where: {
                            name: (_c = {}, _c[sequelize_1.Op.like] = "%".concat(categoryName, "%"), _c),
                        },
                    })];
            case 1:
                categorySearch = _k.sent();
                if (categorySearch) {
                    whereClause = __assign(__assign({}, whereClause), { categoryID: categorySearch.id });
                }
                _k.label = 2;
            case 2:
                if (!brand) return [3 /*break*/, 4];
                brandName = req.query.brand;
                return [4 /*yield*/, Brand.findOne({
                        where: {
                            name: (_d = {}, _d[sequelize_1.Op.like] = "%".concat(brandName, "%"), _d),
                        },
                    })];
            case 3:
                brandSearch = _k.sent();
                if (brandSearch) {
                    whereClause = __assign(__assign({}, whereClause), { brandID: brandSearch.id });
                }
                _k.label = 4;
            case 4:
                // Handle 'handpicked' query parameter
                if (handpicked === "true") {
                    whereClause = __assign(__assign({}, whereClause), { price: (_e = {},
                            _e[sequelize_1.Op.lt] = 100,
                            _e), rate: (_f = {},
                            _f[sequelize_1.Op.gt] = 4.5,
                            _f) });
                }
                // Handle 'new_arrival' query parameter
                if (new_arrival === "true") {
                    currentDate = new Date();
                    threeMonthsAgo = new Date();
                    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
                    whereClause = __assign(__assign({}, whereClause), { createdAt: (_g = {},
                            _g[sequelize_1.Op.gt] = threeMonthsAgo,
                            _g[sequelize_1.Op.lt] = currentDate,
                            _g) });
                }
                if (!search_term) return [3 /*break*/, 6];
                search_termName = req.query.search_term;
                return [4 /*yield*/, Brand.findOne({
                        where: {
                            name: (_h = {}, _h[sequelize_1.Op.like] = "%".concat(search_termName, "%"), _h),
                        },
                    })];
            case 5:
                brandSearch = _k.sent();
                if (brandSearch) {
                    // If it's a brand search, send products in that brand
                    whereClause = __assign(__assign({}, whereClause), { brandID: brandSearch.id });
                }
                else {
                    // Otherwise, search for products with a name containing the search term
                    whereClause = __assign(__assign({}, whereClause), { name: (_j = {}, _j[sequelize_1.Op.like] = "%".concat(search_termName, "%"), _j) });
                }
                _k.label = 6;
            case 6: return [4 /*yield*/, Product.findAndCountAll({
                    where: whereClause,
                    offset: (page - 1) * resultsPerPage,
                    limit: resultsPerPage,
                })];
            case 7:
                _b = _k.sent(), count = _b.count, rows = _b.rows;
                totalPages = Math.ceil(count / resultsPerPage);
                productsWithReviewCounts = [];
                _i = 0, rows_1 = rows;
                _k.label = 8;
            case 8:
                if (!(_i < rows_1.length)) return [3 /*break*/, 11];
                product = rows_1[_i];
                return [4 /*yield*/, Reviews.findAndCountAll({
                        where: { product_id: product.id },
                    })];
            case 9:
                reviewCount = (_k.sent()).count;
                productsWithReviewCounts.push(__assign(__assign({}, product.toJSON()), { ratingCount: reviewCount }));
                _k.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 8];
            case 11:
                res.status(200).json({
                    results: productsWithReviewCounts,
                    pagination: {
                        currentPage: page,
                        totalPages: totalPages,
                        resultsPerPage: resultsPerPage,
                        totalResults: count,
                    },
                });
                return [3 /*break*/, 13];
            case 12:
                err_1 = _k.sent();
                console.error("Error:", err_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.list = list;
