const configs = require('./configs');
const app = require('./app');

// listen to requests
const message = `server started on port ${configs.port} (${configs.env})`;
app.listen(configs.port, () => console.log(message));

/**
 * Exports express
 * @public
 */
module.exports = app;
