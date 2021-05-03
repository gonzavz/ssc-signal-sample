import SecurityScorecard from '../libs/ssc';
import {ICreateSignalRequest, ISSCApiService} from './types';

export class SSCApiService implements ISSCApiService{
  constructor(private sscApi: SecurityScorecard) {}
  async sendSignal(req: ICreateSignalRequest):Promise<any> {
    return await this.sscApi.apiCall({path: '/signals/by-type', method: 'POST', body: req});
  }
}