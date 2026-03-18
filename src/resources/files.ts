import type { ObjectifyClient } from '../client.js';
import type { FileData, PaginatedResponse } from '../types.js';

export class FilesResource {
  constructor(private client: ObjectifyClient) {}

  get(fileId: string): Promise<FileData> {
    return this.client.get(`/files/${fileId}`);
  }
  update(fileId: string, data: Partial<{ filename: string; access: string; folder: string; meta: Record<string, unknown> }>): Promise<FileData> {
    return this.client.patch(`/files/${fileId}`, data);
  }
  delete(fileId: string): Promise<void> {
    return this.client.delete(`/files/${fileId}`);
  }
  search(query?: { folder?: string; mime_type?: string; object_type_id?: string; object_id?: string; cursor?: string; limit?: number }): Promise<PaginatedResponse<FileData>> {
    return this.client.get('/files', query);
  }
  signedUrl(fileId: string, query?: { expires_in?: number }): Promise<{ url: string; expires_at: string }> {
    return this.client.get(`/files/${fileId}/signed-url`, query);
  }
  listVersions(fileId: string): Promise<{ versions: FileData[] }> {
    return this.client.get(`/files/${fileId}/versions`);
  }
  getStats(): Promise<{ total_files: number; total_bytes: number; by_type: Record<string, number> }> {
    return this.client.get('/files/stats');
  }
  listFolders(): Promise<{ folders: string[] }> {
    return this.client.get('/files/folders');
  }
  listTrash(query?: { cursor?: string; limit?: number }): Promise<PaginatedResponse<FileData>> {
    return this.client.get('/files/trash', query);
  }
  restore(fileId: string): Promise<FileData> {
    return this.client.post(`/files/${fileId}/restore`);
  }
  batchRead(ids: string[]): Promise<{ files: FileData[] }> {
    return this.client.post('/files/batch/read', { ids });
  }
  batchDelete(ids: string[]): Promise<{ deleted: number }> {
    return this.client.post('/files/batch/delete', { ids });
  }
  batchUpdate(items: { file_id: string; data: Partial<FileData> }[]): Promise<{ updated: FileData[] }> {
    return this.client.post('/files/batch/update', { items });
  }
}
