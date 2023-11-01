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
  
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  Address.hasMany(orderModel(sequelize),{
    foreignKey: "address_id"
  })
  return Address;
}
  export default userAddressModel;
  