import express from 'express';
import helmet from 'helmet';
import * as errors from './middlewares/error';
const {manifest, sampleSignal} = require('./controllers');

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/manifest', manifest);
app.post('/test/:type', sampleSignal);
app.use(errors.notFound);
app.use(errors.parseToAPIError);
app.use(errors.apiErrorHandler);

export default app;
