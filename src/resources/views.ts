import type { ObjectifyClient } from '../client.js';
import type { View } from '../types.js';

export class ViewsResource {
  constructor(private client: ObjectifyClient) {}

  list(typeId: string): Promise<{ data: View[] }> {
    return this.client.get(`/objects/${typeId}/views`);
  }
  create(typeId: string, data: Partial<View> & { name: string }): Promise<View> {
    return this.client.post(`/objects/${typeId}/views`, data);
  }
  update(typeId: string, viewId: string, data: Partial<View>): Promise<View> {
    return this.client.patch(`/objects/${typeId}/views/${viewId}`, data);
  }
  delete(typeId: string, viewId: string): Promise<void> {
    return this.client.delete(`/objects/${typeId}/views/${viewId}`);
  }
}
