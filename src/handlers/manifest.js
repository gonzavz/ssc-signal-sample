const jsonManifest = require('../manifest');
/**
 * Handler to return the app manifest.
 * @param req
 * @param res
 * @param next
 */
const manifest = (req, res, next) => {
  res.json(jsonManifest);
};

module.exports = manifest;
