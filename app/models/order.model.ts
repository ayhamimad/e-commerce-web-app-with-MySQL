import { DataTypes, Sequelize } from 'sequelize';

import userModel from './user.model';
import  userAddressModel  from "./userAddress.model";
import orderItemModel from './orderItem.model';

const orderModel = (sequelize: Sequelize) => {

const Order = sequelize.define('order', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('in_cart', 'processing', 'paid', 'canceled'),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });
  Order.hasMany(orderItemModel(sequelize), {
    foreignKey: 'orderID', // This should match the foreign key in the Product model
  });
  return Order;
}

export default orderModel;
