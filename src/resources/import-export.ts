import type { ObjectifyClient } from '../client.js';

export class ImportExportResource {
  constructor(private client: ObjectifyClient) {}

  import(data: { format: 'csv' | 'json'; data: unknown }): Promise<{ imported: number; errors: unknown[] }> {
    return this.client.post('/v1/data/import', data);
  }
  export(query?: { format?: string }): Promise<{ job_id: string; url?: string }> {
    return this.client.post('/v1/data/export', undefined, query);
  }
  exportStatus(jobId: string): Promise<{ status: string; url?: string }> {
    return this.client.get(`/v1/data/export/${jobId}`);
  }
}
