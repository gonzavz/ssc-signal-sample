import {IManifestService, ISSCAppManifest} from './types';

interface IManifestServiceConfig {
  filePath?: string;
  manifest?: ISSCAppManifest;
}

export class ManifestService implements IManifestService{
  private readonly manifest: ISSCAppManifest | undefined;

  constructor(config: IManifestServiceConfig) {
    if (config.manifest) {
      this.manifest = config.manifest;
    } else if (config.filePath) {
      // load from file logic
    } else {
      throw Error('must provide either a manifest object or a filepath to the manifest');
    }
  }

  getManifest(): ISSCAppManifest | undefined {
    return this.manifest;
  }
}
