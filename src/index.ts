import ConfigLoader from './configs';
import SecurityScorecard from './libs/ssc';
import manifest from './manifest';
import {Service} from './service';
import {ManifestService} from './services/manifest';
import {SSCApiService} from './services/ssc_api';

// listen to requests
const configs = ConfigLoader();

const securityScorecard = new SecurityScorecard({token: configs.sscToken});

const sscApiService = new SSCApiService(securityScorecard);
const manifestService = new ManifestService({manifest});

const service = new Service({port: configs.port, sscApiService, manifestService});

// tslint:disable-next-line: no-floating-promises
service.start().then(() => {
  console.info(`Server started on port ${configs.port}`);
});

// Gracefully shutdown dependencies and exit.
function close(code: any): void {
  console.info(`Server is shutting down with code ${code}`);
  service.stop();
  process.exit(code);
}

// Handle shutdown events
process.on('SIGINT', close);
process.on('SIGTERM', close);

export default service;
