"use strict";
// export const dbConfig = {
//     HOST: "sql.freedb.tech",
//     USER: "freedb_backend-final-3", // Replace with your MySQL username
//     PASSWORD: "*NgvyAs9f#Dnyd&", // Replace with your MySQL password
//     DB: "freedb_coral_ecommerce", // Replace with your MySQL database name
//     DIALECT: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
//   };
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "ayham123",
    DB: "coral_ecommerce",
    DIALECT: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
