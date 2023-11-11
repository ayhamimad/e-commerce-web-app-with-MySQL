import db from "../models";
import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
const Product = db.product;
const Reviews = db.review;
const User = db.user;
const Order = db.order;
const OrderItem = db.order_item;

// get the product information
export const productInfo = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log(`Received product ID: ${productId}`);

    const product = await Product.findByPk(productId);
    const { count } = await Reviews.findAndCountAll({
      where: { product_id: productId },
    });
    if (product) {
      const productInfo = {
        ...product.toJSON(), // Converts the Sequelize model to a plain JavaScript object
        ratingCount: count,
      };
      res.status(200).json(productInfo);
    } else {
      res.status(404).json({
        message: "product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const productRelated = async (req: Request, res: Response) => {
  try {
    const randomProducts = await Product.findAll({
      order: db.sequelize.random(),
      limit: 5,
    });

    if (randomProducts.length > 0) {
      res.status(200).json({ products: randomProducts });
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// get all the reviews of an product
export const productReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const reviews = await Reviews.findAll({
      where: { product_id: productId },
      include: [
        {
          model: User,
          attributes: [
            [
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("first_name"),
                " ",
                Sequelize.col("last_name")
              ),
              "full_name",
            ],
          ],
        },
      ],
    });

    if (reviews.length > 0) {
      res.status(200).json({ reviews: reviews });
    } else {
      res
        .status(404)
        .json({ message: `There is no reviews for this product ${productId}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// create an order if it doesn't exist and if it's status not in_cart
export const addProductToCart = async (req: Request, res: Response) => {
    try {
      const user = req.user as typeof User;
      console.log("User ID:", user.id);
  
      const { orderItemQuantity } = req.body;
      const { productId } = req.params;
      // Check if the product exists in the database
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Check if there is enough stock available
      if (product.stock_quantity < orderItemQuantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
  
      // Find the user's existing "in-cart" order
      let cart = await Order.findOne({
        where: { user_id: user.id, status: "in_cart" },
      });
  
      if (!cart) {
        // If no "in-cart" order exists, create a new one
        cart = await Order.create({
          user_id: user.id,
          address_id: null,
          status: "in_cart",
          total_price: 0,
          tax: 2,
        });
      }
  
      // Find the existing order item for the given product
      let order_item = await OrderItem.findOne({
        where: { productID: productId, orderID: cart.id },
      });
  
      if (order_item) {
        // If the order item already exists, update its quantity and sub-total
        order_item.quantity += orderItemQuantity;
        order_item.sub_total =
          (product.price - product.price * (product.discount / 100)) *
          order_item.quantity;
        await order_item.save();
      } else {
        // If the order item doesn't exist, create a new one and save it to the database
        order_item = await OrderItem.create({
          quantity: orderItemQuantity,
          orderID: cart.id,
          productID: productId,
          sub_total:
            (product.price - product.price * (product.discount / 100)) *
            orderItemQuantity,
        });
      }
  
      // Deduct the orderItemQuantity from the product's stock
      product.stock_quantity -= orderItemQuantity;
      await product.save();
  
      // Update the total price of the cart
      const orderItems = await OrderItem.findAll({
        where: { orderID: cart.id },
      });
  
      let newTotalPrice = 0;
  
      for (const item of orderItems) {
        newTotalPrice += parseFloat(item.sub_total);
        console.log(newTotalPrice);
      }
  
      cart.total_price = newTotalPrice;
      await cart.save();
  
      console.log(cart.total_price);
  
      console.log("The product added as an order item to the cart");
      res.status(201).json({
        message: "The product added as an order item to the cart", cart:cart});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  };
  
