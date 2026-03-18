import type { ObjectifyClient } from '../client.js';
import type { ObjectData, PaginatedResponse } from '../types.js';

export class ObjectsResource {
  constructor(private client: ObjectifyClient) {}

  list(typeId: string, query?: { cursor?: string; limit?: number; sort?: string; order?: string }): Promise<PaginatedResponse<ObjectData>> {
    return this.client.get(`/objects/${typeId}`, query);
  }
  get(typeId: string, objectId: string): Promise<ObjectData> {
    return this.client.get(`/objects/${typeId}/${objectId}`);
  }
  create(typeId: string, data: { properties: Record<string, unknown> }): Promise<ObjectData> {
    return this.client.post(`/objects/${typeId}`, data);
  }
  update(typeId: string, objectId: string, data: { properties: Record<string, unknown> }): Promise<ObjectData> {
    return this.client.patch(`/objects/${typeId}/${objectId}`, data);
  }
  delete(typeId: string, objectId: string): Promise<void> {
    return this.client.delete(`/objects/${typeId}/${objectId}`);
  }
  batchCreate(typeId: string, items: { properties: Record<string, unknown> }[]): Promise<{ created: ObjectData[] }> {
    return this.client.post(`/objects/${typeId}/batch`, { items });
  }
  batchUpdate(typeId: string, items: { object_id: string; properties: Record<string, unknown> }[]): Promise<{ updated: ObjectData[] }> {
    return this.client.patch(`/objects/${typeId}/batch`, { items });
  }
  batchRead(typeId: string, ids: string[]): Promise<{ objects: ObjectData[] }> {
    return this.client.post(`/objects/${typeId}/batch/read`, { ids });
  }
  listTrash(typeId: string, query?: { cursor?: string; limit?: number }): Promise<PaginatedResponse<ObjectData>> {
    return this.client.get(`/objects/${typeId}/trash`, query);
  }
  restore(typeId: string, objectId: string): Promise<ObjectData> {
    return this.client.post(`/objects/${typeId}/${objectId}/restore`);
  }
  listVersions(typeId: string, objectId: string): Promise<{ versions: ObjectData[] }> {
    return this.client.get(`/objects/${typeId}/${objectId}/versions`);
  }
}
