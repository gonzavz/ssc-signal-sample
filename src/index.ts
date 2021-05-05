import ConfigLoader from './configs';
import SecurityScorecard from './libs/ssc';
import {Service} from './service';
import manifest from './manifest';
import {ManifestService} from './services/manifest';
import {SSCApiService} from './services/ssc_api';
import {SSCManifest} from './libs/ssc_manifest';

// load configs from env
const configs = ConfigLoader();

const securityScorecard = new SecurityScorecard({token: configs.sscToken});

const sscApiService = new SSCApiService(securityScorecard);
const manifestService = new ManifestService({manifest: SSCManifest.fromJSON(manifest)});

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
