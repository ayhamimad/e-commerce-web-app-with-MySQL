import db from "../models";
import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";

const User = db.user;
const Product = db.product;
const Wishlist = db.wishlist;

export const addProductToWishlist = async (req: Request, res: Response) => {
  try {
    const user = req.user as typeof User;
    const { productId } = req.params;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in wishlist of current logged-in user
    let existingItemInWishList = await Wishlist.findOne({
      where: {
        [Op.and]: [{ user_id: user.id }, { product_id: productId }],
      },
    });
    if (existingItemInWishList) {
      return res
        .status(200)
        .json({ message: "This item has been added to your wishlist before" });
    } else {
      const newWishListItem = {
        user_id: user.id,
        product_id: productId,
      };
      const createdWishlistItem = await Wishlist.create(newWishListItem);
      return res.status(200).json({
        message: "the product added to the wishlist successfully",
        createdWishlistItem,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const getWishlistProducts = async (req: Request, res: Response) => {
    try {
      const user = req.user as typeof User;
      const wishlistItems = await Wishlist.findAll({
        where: { user_id: user.id },
        include: [
          {
            model: Product,
          },
        ],
      });
  
      if (!wishlistItems || wishlistItems.length === 0) {
        return res.status(200).json({ message: "No items in your wishlist yet." });
      }
  
      const products = wishlistItems.map((wishlistItem: typeof Wishlist) => wishlistItem.product);

      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  };
  
