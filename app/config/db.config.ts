export const dbConfig = {
    HOST: "localhost",
    USER: "root", // Replace with your MySQL username
    PASSWORD: "omar0595334880+++", // Replace with your MySQL password
    DB: "coral_ecommerce", // Replace with your MySQL database name
    DIALECT: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  };
  