import db from "../models";
import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
const Order = db.order;
const User = db.user;
const OrderItem = db.order_item;

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user as typeof User;
    const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.findOne({
      where: { user_id: user.id, id: orderId },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status to "placed"
    order.status = "placed";
    await order.save();

    res
      .status(200)
      .json({ message: "Order placed successfully", order: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderItemId } = req.params;
    const user = req.user as typeof User; // Assuming you have authentication middleware

    // Find the order item by ID
    const orderItem = await OrderItem.findByPk(orderItemId);

    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    // Find the associated order using the orderID of the order item
    const associatedOrder = await Order.findByPk(orderItem.orderID);

    // Check if the order item belongs to the authenticated user
    if (!associatedOrder || associatedOrder.user_id !== user.id) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: Order item does not belong to the user",
        });
    }

    // Remove the order item from the order item table
    await orderItem.destroy();

    return res
      .status(200)
      .json({
        message: "Order item removed successfully",
        order_item: orderItem,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
