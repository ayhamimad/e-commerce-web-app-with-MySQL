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
exports.getWishlistProducts = exports.addProductToWishlist = void 0;
var models_1 = require("../models");
var sequelize_1 = require("sequelize");
var User = models_1.default.user;
var Product = models_1.default.product;
var Wishlist = models_1.default.wishlist;
var addProductToWishlist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, productId, product, existingItemInWishList, newWishListItem, createdWishlistItem, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                user = req.user;
                productId = req.params.productId;
                return [4 /*yield*/, Product.findByPk(productId)];
            case 1:
                product = _b.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                }
                return [4 /*yield*/, Wishlist.findOne({
                        where: (_a = {},
                            _a[sequelize_1.Op.and] = [{ user_id: user.id }, { product_id: productId }],
                            _a),
                    })];
            case 2:
                existingItemInWishList = _b.sent();
                if (!existingItemInWishList) return [3 /*break*/, 3];
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: "This item has been added to your wishlist before" })];
            case 3:
                newWishListItem = {
                    user_id: user.id,
                    product_id: productId,
                };
                return [4 /*yield*/, Wishlist.create(newWishListItem)];
            case 4:
                createdWishlistItem = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "the product added to the wishlist successfully",
                        createdWishlistItem: createdWishlistItem,
                    })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ error: "Internal Server Error", details: error_1 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addProductToWishlist = addProductToWishlist;
var getWishlistProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, wishlistItems, products, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                return [4 /*yield*/, Wishlist.findAll({
                        where: { user_id: user.id },
                        include: [
                            {
                                model: Product,
                            },
                        ],
                    })];
            case 1:
                wishlistItems = _a.sent();
                if (!wishlistItems || wishlistItems.length === 0) {
                    return [2 /*return*/, res.status(200).json({ message: "No items in your wishlist yet." })];
                }
                products = wishlistItems.map(function (wishlistItem) { return wishlistItem.product; });
                return [2 /*return*/, res.status(200).json({ products: products })];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: "Internal Server Error", details: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getWishlistProducts = getWishlistProducts;
