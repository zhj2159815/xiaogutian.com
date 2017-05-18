

let env = process.env.NODE_ENV = "test";

let configiurations = {
  test: {
    PORT: 8000,
    ADMIN: 'blues'
  },
  product: {
    PORT: 80,
    ADMIN: 'blues'
  }
};

module.exports = configiurations[env];