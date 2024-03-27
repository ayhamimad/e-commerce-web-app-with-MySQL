"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    HOST: "sql.freedb.tech",
    USER: "freedb_backend-final3",
    PASSWORD: "7*fnAaZ4!YMXMAZ",
    DB: "freedb_coral_e-commerce",
    DIALECT: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
// export const dbConfig = {
//   HOST: "localhost",
//   USER: "root", // Replace with your MySQL username
//   PASSWORD: "ayham123", // Replace with your MySQL password
//   DB: "coral_ecommerce", // Replace with your MySQL database name
//   DIALECT: "mysql",
//   pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//   }
// };
