import type { ObjectifyClient } from '../client.js';

export class ReportsResource {
  constructor(private client: ObjectifyClient) {}

  pipeline(data: Record<string, unknown>): Promise<unknown> {
    return this.client.post('/v1/reports/pipeline', data);
  }
  timeseries(data: Record<string, unknown>): Promise<unknown> {
    return this.client.post('/v1/reports/timeseries', data);
  }
  leaderboard(data: Record<string, unknown>): Promise<unknown> {
    return this.client.post('/v1/reports/leaderboard', data);
  }
  funnel(data: Record<string, unknown>): Promise<unknown> {
    return this.client.post('/v1/reports/funnel', data);
  }
}
