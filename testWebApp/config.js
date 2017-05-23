

let env = process.env.NODE_ENV = "product";

let configiurations = {
  test: {
    PORT: 8000,
    ADMIN: 'blues',
    DBName: 'root',
    DBPSW: '123456',
    DB: '120.25.167.143',
    DBPORT: '3306'
  },
  product: {
    PORT: 80,
    ADMIN: 'blues',
    DBName: 'root',
    DBPSW: '123456',
    DB: '127.0.0.1',
    DBPORT: '3306'
  }
};

module.exports = configiurations[env];