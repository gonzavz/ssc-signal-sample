import SecurityScorecard from '../libs/ssc';

interface ICreateSignalRequest {
  domain: string,
  ip: string,
  count: number,
  summary: string,
  url: string,
  first_seen: string,
  last_seen: string,
  owner_organization_id: string,
  labels: string,
  scorecard_ids: string[],
  status: 'processing' | 'active' | 'resolved' | 'decayed'
}

export class SSCApiService {
  constructor(private sscApi: SecurityScorecard) {
  }

  async sendSignal(req: ICreateSignalRequest):Promise<any> {
    return await this.sscApi.apiCall({path: '/signals/by-type', method: 'POST', body: req});
  }
}