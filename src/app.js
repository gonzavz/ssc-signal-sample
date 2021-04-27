const express = require('express');
const helmet = require('helmet');
const errors = require('./middlewares/error');
const {manifest} = require('./handlers');

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/manifest', manifest);
app.use(errors.notFound);
app.use(errors.parseToAPIError);
app.use(errors.apiErrorHandler);

module.exports = app;
