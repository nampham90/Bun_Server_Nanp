export const config = {
    HOST: "localhost",
    PORT: "3306",
    USER: "root",//root
    PASSWORD: "@Root@123",//@Root@123
    DB: "testdb",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }

  };
  
  export const dialect = "mysql";
  
