import type { ObjectifyClient } from '../client.js';

export class WorkflowsResource {
  constructor(private client: ObjectifyClient) {}

  submit(typeId: string, objectId: string): Promise<{ status: string }> {
    return this.client.post(`/v1/objects/${typeId}/${objectId}/submit-for-review`);
  }
  approve(typeId: string, objectId: string, data?: { comment?: string }): Promise<{ status: string }> {
    return this.client.post(`/v1/objects/${typeId}/${objectId}/approve`, data);
  }
  reject(typeId: string, objectId: string, data?: { comment?: string }): Promise<{ status: string }> {
    return this.client.post(`/v1/objects/${typeId}/${objectId}/reject`, data);
  }
  status(typeId: string, objectId: string): Promise<{ status: string; history: unknown[] }> {
    return this.client.get(`/v1/objects/${typeId}/${objectId}/workflow-status`);
  }
}
