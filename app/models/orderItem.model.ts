import { DataTypes, Sequelize } from 'sequelize';
import orderModel from './order.model';
import productModel from './products.model';
const orderItemModel = (sequelize: Sequelize) => {


const OrderItem = sequelize.define('order_item', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sub_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });
  
  return OrderItem;
}

export default orderItemModel;