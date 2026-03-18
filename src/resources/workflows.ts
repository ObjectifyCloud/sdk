import type { ObjectifyClient } from '../client.js';

export class WorkflowsResource {
  constructor(private client: ObjectifyClient) {}

  submit(typeId: string, objectId: string): Promise<{ status: string }> {
    return this.client.post(`/objects/${typeId}/${objectId}/workflow/submit`);
  }
  approve(typeId: string, objectId: string, data?: { comment?: string }): Promise<{ status: string }> {
    return this.client.post(`/objects/${typeId}/${objectId}/workflow/approve`, data);
  }
  reject(typeId: string, objectId: string, data?: { comment?: string }): Promise<{ status: string }> {
    return this.client.post(`/objects/${typeId}/${objectId}/workflow/reject`, data);
  }
  status(typeId: string, objectId: string): Promise<{ status: string; history: unknown[] }> {
    return this.client.get(`/objects/${typeId}/${objectId}/workflow`);
  }
}
