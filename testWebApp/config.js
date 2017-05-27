'use strict'

let env = process.env.NODE_ENV = "product";

let configiurations = {
  test: {
    PORT: 8001,
    ADMIN: 'blues',
    DBNAME: 'root',
    DBPSW: '123456',
    DB: '120.25.167.143',
    DBPORT: '3306',
    DBDATABASE: 'xiaogutian'
  },
  product: {
    PORT: 80,
    ADMIN: 'blues',
    DBNAME: 'root',
    DBPSW: '123456',
    DB: '127.0.0.1',
    DBPORT: '3306',
    DBDATABASE: 'xiaogutian'
  }
};

module.exports = configiurations[env];