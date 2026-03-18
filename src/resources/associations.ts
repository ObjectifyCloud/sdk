import type { ObjectifyClient } from '../client.js';
import type { Association } from '../types.js';

export class AssociationsResource {
  constructor(private client: ObjectifyClient) {}

  list(typeId: string, objectId: string, query?: { association_type?: string; direction?: 'forward' | 'reverse'; cursor?: string; limit?: number }): Promise<{ data: Association[]; cursor?: string }> {
    return this.client.get(`/objects/${typeId}/${objectId}/associations`, query);
  }
  create(typeId: string, objectId: string, data: { association_type: string; to_type_id: string; to_id: string; meta?: Record<string, unknown> }): Promise<Association> {
    return this.client.post(`/objects/${typeId}/${objectId}/associations`, data);
  }
  delete(typeId: string, objectId: string, assocType: string, toTypeId: string, toId: string): Promise<void> {
    return this.client.delete(`/objects/${typeId}/${objectId}/associations/${assocType}/${toTypeId}/${toId}`);
  }
}
