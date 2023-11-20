import db from "../models";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { Op, Sequelize } from "sequelize";
const Order = db.order;
const User = db.user;
const OrderItem = db.order_item;
const Product = db.product;
const Address = db.user_address;
export const changeOrderStatusAndPutAddress = async (req: Request,res: Response) => {
  try {
    const user = req.user as typeof User;
    const { orderId } = req.params;
    const { addressId, orderItems } = req.body;

    // Find the order by ID
    const order = await Order.findOne({
      where: { user_id: user.id, id: orderId },
      include: OrderItem,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if an address is provided
    if (addressId) {
      // Update the order's address ID
      order.address_id = addressId;

      // Set the order status to "paid"
      order.status = "paid";
    }

    // Check if orderItems is provided in the request body
    if (orderItems && Array.isArray(orderItems)) {
      // Update the order status to "placed"
      // order.status = "placed";

      // Update order item quantities and product stock quantities
      for (const incomingOrderItem of orderItems) {
        const existingOrderItem = order.order_items.find(
          (item: typeof OrderItem) => item.id === incomingOrderItem.id
        );

        if (!existingOrderItem) {
          console.log(
            `Order item with ID ${incomingOrderItem.id} not found in the order.`
          );
          continue;
        }

        // Check if the quantity has changed
        // Check if the quantity has changed
        if (incomingOrderItem.quantity !== existingOrderItem.quantity) {
          const product = await Product.findByPk(existingOrderItem.productID);

          if (!product) {
            console.log(
              `Product not found for order item ID ${existingOrderItem.id}`
            );
            continue;
          }

          // Calculate the quantity difference
          const quantityDifference =
            incomingOrderItem.quantity - existingOrderItem.quantity;

          // Update product stock quantity
          const updatedStockQuantity =
            product.stock_quantity - quantityDifference;
          await product.update({ stock_quantity: updatedStockQuantity });

          // Update order item quantity
          existingOrderItem.quantity = incomingOrderItem.quantity;

          // Calculate the new sub_total for the order item
          existingOrderItem.sub_total =
            existingOrderItem.quantity * product.price;

          // Save the order item changes
          await existingOrderItem.save();

          // Calculate the new total_price for the order
          const updatedTotalPrice = order.order_items.reduce((total:typeof OrderItem, item:typeof OrderItem) => total + item.sub_total,0);

          // Update order total_price
          await order.update({ total_price: updatedTotalPrice });
        }
      }
    }

    // Save the order changes
    await order.save();

    res
      .status(200)
      .json({ message: "Order placed successfully", order: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};



//////////////////////////////////////////////////////////////////////////////////
export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderItemId } = req.params;
    const user = req.user as typeof User; // Assuming you have authentication middleware

    // Find the order item by ID
    const orderItem = await OrderItem.findByPk(orderItemId, {
      include: Product,
    }); // Include the associated Product model

    console.log(orderItem.product);
    if (!orderItem || !orderItem.product) {
      return res
        .status(404)
        .json({ message: "Order item or associated product not found" });
    }

    // Find the associated order using the orderID of the order item
    const associatedOrder = await Order.findByPk(orderItem.orderID);

    // Check if the order item belongs to the authenticated user
    if (!associatedOrder || associatedOrder.user_id !== user.id) {
      return res.status(403).json({
        message: "Unauthorized: Order item does not belong to the user",
      });
    }

    // Get the sub_total and quantity of the order item to be removed
    const removedSubTotal = orderItem.sub_total;
    const removedQuantity = orderItem.quantity;

    console.log(removedQuantity);

    // Find the associated product for the order item
    const associatedProduct = orderItem.product;

    // Increment the product's stock_quantity by the quantity of the deleted order item
    if (associatedProduct) {
      const updatedStockQuantity =
        associatedProduct.stock_quantity + removedQuantity;
      await associatedProduct.update({ stock_quantity: updatedStockQuantity });
    }

    // Remove the order item from the order item table
    await orderItem.destroy();

    // Check if there are no remaining order items for the associated order
    const remainingOrderItems = await OrderItem.count({
      where: {
        orderID: associatedOrder.id,
      },
    });

    // If there are no remaining order items, delete the order itself
    if (remainingOrderItems === 0) {
      await associatedOrder.destroy();
      return res.status(200).json({
        message: "Order and all order items removed successfully",
      });
    }

    // Subtract the removed sub_total from the total_price in the order table
    const updatedTotalPrice = associatedOrder.total_price - removedSubTotal;
    await associatedOrder.update({ total_price: updatedTotalPrice });

    return res.status(200).json({ message: "Order item removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};


export const getInProgress =async (req:Request, res: Response) => {
  try{
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken: any = jwt.verify(token, 'top-secret');
    let order = await Order.findOne({
      where:
      {
        user_id: decodedToken.id,
        status:"in_cart"
      }
    });
    if(!order){
      return res.status(200).send({message:"No orders found!",data:order});
    }
    
    let items = await OrderItem.findAll({
      where:{
        orderID: order.id
      }
    });
    let itemsWithImage = [];

    var totalDiscount = 0;
    for(let i=0;i<items.length;i++){
      let product = await Product.findByPk(items[i].productID);
      let itemWithImage = {
        ...items[i].toJSON(), // Copy existing properties from OrderItem
        image: product.image_url,
        name: product.name,
        sub_title: product.short_description,
        product_price: product.price
      };
      let totalItemDiscount = items[i].quantity * product.price * product.discount/100;
      totalDiscount = totalDiscount + totalItemDiscount;
      itemsWithImage.push(itemWithImage);
    }
      return res.status(200).json({
        data: itemsWithImage,
        total_price: order.total_price,
        total_discount: totalDiscount,
        orderId: order.id
        })
  }catch(err){
    console.log(err);
    res.status(500).send("Server Error");
  }
}
export const getUserOrders = async (req: Request, res:Response)=>{
  try{
    const user = req.user as typeof User;
    const orders = await Order.findAll({
      where: {
        user_id: user.id
      }
    });
    return res.status(200).json({data:orders});
  }catch{
    res.status(500).send('server error');
  }
}

export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const order = await Order.findOne({ where: { id: id } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = await OrderItem.findAll({
      include: [Product],
      where: {
        orderID: order.id,
      },
    });

    const itemsWithImage = [];
    var totalDiscount = 0;
    for (let i = 0; i < items.length; i++) {
      let product = await Product.findByPk(items[i].productID);

      if (!product) {
        // Handle the case where the associated product is not found
        console.error(`Product not found for OrderItem with ID ${items[i].id}`);
        continue; // Skip to the next iteration of the loop
      }
      let totalItemDiscount = items[i].quantity * product.price * product.discount/100;
      totalDiscount = totalDiscount + totalItemDiscount;
      let itemWithImage = {
        ...items[i].toJSON(), // Copy existing properties from OrderItem
        image: product.image_url,
        name: product.name,
        sub_title: product.short_description
      };
      itemsWithImage.push(itemWithImage);
    }
    const address = await Address.findOne({
      where: {
        id: order.address_id
      }
    })
    return res.status(200).json({ data: itemsWithImage,
      city: address.city,
      state: address.state,
      street: address.street,
      phone_number: address.phone_number,
      first_name:address.first_name,
      last_name: address.last_name,
      total_price: order.total_price,
      totalDiscount: totalDiscount
     });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};