import app from './app';
import ConfigLoader from './configs';

// listen to requests
const configs = ConfigLoader();
const message = `server started on port ${configs.port} (${configs.env})`;
app.listen(configs.port, () => console.log(message));

/**
 * Exports express
 * @public
 */
module.exports = app;
