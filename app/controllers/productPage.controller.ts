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
      res.status(200).json({ products: productInfo });
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
    const { orderItemQuantity } = req.body;
    const { productId } = req.params;
    // check if the product exists in the database
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }

    let cart = await Order.findOne({ where: { user_id: user.id } });
    let order_item = await OrderItem.findOne({
      where: { productID: productId },
    });
    // create new order and add item on it if item doesn't exist and if exist update the quantity 
    if (!cart || cart.status==='placed' || cart.status==='paid' || cart.status==='canceled') {
      cart = await Order.create({
        user_id: user.id,
        address_id: null,
        status: 'in_cart',
        total_price: 0,
        tax: 2,
      });
      if (!order_item) {
        //create new item and save it to the db
        order_item = await OrderItem.create({
          quantity: orderItemQuantity,
          orderID: cart.id,
          productID: productId,
          sub_total: product.price * product.discount * orderItemQuantity,
        });
      } else {
        //update existing item with new quantity
        order_item = {
          ...order_item,
          quantity: order_item.quantity + orderItemQuantity,
        };
        await OrderItem.update(
          { quantity: order_item.quantity },
          { where: { id: order_item.id } }
        );
      }
      //add price of this item to the total price of the cart
      cart.total_price += order_item.sub_total;
      await cart.save();
      console.log("the product added as new orderItem to a new order");
      res.status(201).json({message:"the product added as new orderItem to a new order"}); 
    //   if there an order it's  status is in_cart
    } else {
        if (!order_item) {
          //create new item and save it to the db
            order_item = await OrderItem.create({
            quantity: orderItemQuantity,
            orderID: cart.id,
            productID: productId,
            sub_total: product.price * product.discount * orderItemQuantity,
          });
        } else {
          //update existing item with new quantity
          order_item = {
            ...order_item,
            quantity: order_item.quantity + orderItemQuantity,
          };
          await OrderItem.update(
            { quantity: order_item.quantity },
            { where: { id: order_item.id } }
          );
        }
        //add price of this item to the total price of the cart
        cart.total_price += order_item.sub_total;
        await cart.save();
        console.log("added anew orderItem");
        res.status(201).json({ message: "product added as new orderItem" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

