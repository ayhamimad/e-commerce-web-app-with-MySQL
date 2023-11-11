import { DataTypes, Sequelize } from 'sequelize';
import orderModel from './order.model';
const userAddressModel = (sequelize: Sequelize) => {


const Address = sequelize.define('user_address', {
    user_id:{
        type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    street: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pin_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  
  // Address.hasMany(orderModel(sequelize),{
  //   foreignKey: "address_id"
  // })
  return Address;
}
  export default userAddressModel;
  