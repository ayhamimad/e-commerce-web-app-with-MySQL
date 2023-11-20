export const dbConfig = {
    HOST: "sql.freedb.tech",
    USER: "freedb_backend-final-3", // Replace with your MySQL username
    PASSWORD: "*NgvyAs9f#Dnyd&", // Replace with your MySQL password
    DB: "freedb_coral_ecommerce", // Replace with your MySQL database name
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

