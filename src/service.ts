import express, {Application} from 'express';
import helmet from 'helmet';
import {Server} from 'http';
import {ManifestController, SignalsController} from './controllers';
import * as errors from './middlewares/error';
import {IManifestService, ISSCApiService} from './services/types';

interface IServiceConfig {
  port: number;
  sscApiService: ISSCApiService;
  manifestService: IManifestService;
}

export class Service {
  public app:Application;
  public port:number;
  private sscApiService: ISSCApiService;
  private manifestService: IManifestService;
  private server: Server | undefined;

  constructor(config:IServiceConfig) {
    this.app = express();
    this.port = config.port;
    this.manifestService=config.manifestService;
    this.sscApiService=config.sscApiService;
    this.server = undefined;
    this.mount();
  }

  private mount() {
    this.app.use(helmet());
    this.app.use(express.json());

    this.app.get('/manifest', ManifestController.show(this.manifestService));
    this.app.post('/test-signal', SignalsController.sendSignal(this.sscApiService));

    this.app.use(errors.notFound);
    this.app.use(errors.parseToAPIError);
    this.app.use(errors.apiErrorHandler);
  }

  start():Promise<void> {
    return new Promise(resolve => {
      this.server = this.app.listen(this.port, resolve)
    })
  }

  stop() {
    this.server = this.server?.close();
  }
}
