import type { ObjectifyClient } from '../client.js';
import type { Comment } from '../types.js';

export class CommentsResource {
  constructor(private client: ObjectifyClient) {}

  list(typeId: string, objectId: string, query?: { cursor?: string; limit?: number }): Promise<{ data: Comment[]; cursor?: string }> {
    return this.client.get(`/objects/${typeId}/${objectId}/comments`, query);
  }
  create(typeId: string, objectId: string, data: { body: string }): Promise<Comment> {
    return this.client.post(`/objects/${typeId}/${objectId}/comments`, data);
  }
  update(typeId: string, objectId: string, commentId: string, data: { body: string }): Promise<Comment> {
    return this.client.patch(`/objects/${typeId}/${objectId}/comments/${commentId}`, data);
  }
  delete(typeId: string, objectId: string, commentId: string): Promise<void> {
    return this.client.delete(`/objects/${typeId}/${objectId}/comments/${commentId}`);
  }
}
