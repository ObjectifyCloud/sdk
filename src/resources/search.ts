import type { ObjectifyClient } from '../client.js';
import type { ObjectData, PaginatedResponse, SearchParams, AggregateParams } from '../types.js';

export class SearchResource {
  constructor(private client: ObjectifyClient) {}

  search(typeId: string, params: SearchParams): Promise<PaginatedResponse<ObjectData>> {
    return this.client.post(`/objects/${typeId}/search`, params);
  }
  aggregate(typeId: string, params: AggregateParams): Promise<{ results: Record<string, unknown>[] }> {
    return this.client.post(`/objects/${typeId}/aggregate`, params);
  }
}
