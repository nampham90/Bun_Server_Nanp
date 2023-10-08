export const config = {
    HOST: "nanp.bounceme.net",//nanp.bounceme.net//117.2.209.20
    PORT: "3306",
    USER: "nanp",//root
    PASSWORD: "@Nanp123@pass",//@Root@123
    DB: "testdb",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }

  };
  
  export const dialect = "mysql";
  
