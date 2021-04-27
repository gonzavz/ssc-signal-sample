const {NODE_ENV, PORT} = process.env;

module.exports = {
  env: NODE_ENV || 'development',
  port: parseInt(PORT, 10) || 3000,
};
