import type { ObjectifyClient } from '../client.js';

export class ImportExportResource {
  constructor(private client: ObjectifyClient) {}

  import(typeId: string, data: { format: 'csv' | 'json'; data: unknown }): Promise<{ imported: number; errors: unknown[] }> {
    return this.client.post(`/objects/${typeId}/import`, data);
  }
  export(typeId: string, query?: { format?: string }): Promise<{ job_id: string; url?: string }> {
    return this.client.post(`/objects/${typeId}/export`, undefined, query);
  }
  exportStatus(jobId: string): Promise<{ status: string; url?: string }> {
    return this.client.get(`/exports/${jobId}`);
  }
}
