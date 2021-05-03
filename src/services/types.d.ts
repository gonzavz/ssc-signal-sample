export interface ICreateSignalRequest {
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

export interface ISSCApiService {
  sendSignal(req: ICreateSignalRequest): Promise<any>;
};