export const dbConfig = {
    HOST: "sql.freedb.tech",
    USER: "freedb_backend-final3", // Replace with your MySQL username
    PASSWORD: "7*fnAaZ4!YMXMAZ", // Replace with your MySQL password
    DB: "freedb_coral_e-commerce", // Replace with your MySQL database name
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

