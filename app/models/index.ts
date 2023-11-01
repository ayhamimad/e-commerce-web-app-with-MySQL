import { Dialect, Sequelize } from 'sequelize';
import { dbConfig } from '../config/db.config';
import brandModel from './brands.model';
import categorydModel from './category.model';
import orderModel from './order.model';
import orderItemModel from './orderItem.model';
import productModel from './products.model';
import reviewsModel from './reviews.model';
import userModel from './user.model';
import userAddressModel from './userAddress.model';
//initializes a new Sequelize instance connecting to a database using the configuration parameters stored in the bookConfig object
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT as Dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db: any = {};

db.Sequelize = Sequelize;//This line assigns the Sequelize constructor to the Sequelize property of the db object. It allows you to use db.Sequelize to access the Sequelize constructor in other parts of your code.
db.sequelize = sequelize;

db.brand = brandModel(sequelize);
db.category = categorydModel(sequelize);
db.order = orderModel(sequelize);
db.order_item = orderItemModel(sequelize);
db.product = productModel(sequelize);
db.review = reviewsModel(sequelize);
db.user = userModel(sequelize);
db.user_address = userAddressModel(sequelize);

export default db;
