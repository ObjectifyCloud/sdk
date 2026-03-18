import type { ObjectifyClient } from '../client.js';

export class ReportsResource {
  constructor(private client: ObjectifyClient) {}

  pipeline(typeId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.client.post(`/reports/${typeId}/pipeline`, data);
  }
  timeseries(typeId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.client.post(`/reports/${typeId}/timeseries`, data);
  }
  leaderboard(typeId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.client.post(`/reports/${typeId}/leaderboard`, data);
  }
  funnel(typeId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.client.post(`/reports/${typeId}/funnel`, data);
  }
}
