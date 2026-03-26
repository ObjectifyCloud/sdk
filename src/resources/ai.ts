import type { ObjectifyClient } from '../client.js';
import type { AiConversation, AiChatMessage } from '../types.js';

export class AiResource {
  readonly conversations: AiConversationsResource;
  constructor(private client: ObjectifyClient) {
    this.conversations = new AiConversationsResource(client);
  }

  models(): Promise<{ models: unknown[] }> { return this.client.get('/v1/ai/models'); }
  chat(data: { messages: AiChatMessage[]; model?: string; max_tokens?: number }): Promise<{ response: string }> { return this.client.post('/v1/ai/chat', data); }
  generate(data: { prompt: string; model?: string; max_tokens?: number }): Promise<{ text: string }> { return this.client.post('/v1/ai/generate', data); }
  embeddings(data: { texts: string[]; model?: string }): Promise<{ embeddings: number[][] }> { return this.client.post('/v1/ai/embeddings', data); }
  search(data: { query: string; object_type_id?: string; limit?: number }): Promise<{ results: unknown[] }> { return this.client.post('/v1/ai/search', data); }
  index(data: { object_type_id: string; object_id: string }): Promise<{ indexed: boolean }> { return this.client.post('/v1/ai/index', data); }
  moderate(data: { text: string }): Promise<{ flagged: boolean; categories: Record<string, boolean> }> { return this.client.post('/v1/ai/moderate', data); }
  describe(data: { object_type_id: string; object_id: string }): Promise<{ description: string }> { return this.client.post('/v1/ai/describe', data); }
  autoTag(data: { object_type_id: string; object_id: string }): Promise<{ tags: string[] }> { return this.client.post('/v1/ai/auto-tag', data); }
  summarise(data: { object_type_id: string; object_id: string }): Promise<{ summary: string }> { return this.client.post('/v1/ai/summarise', data); }
}

class AiConversationsResource {
  constructor(private c: ObjectifyClient) {}
  list(q?: Record<string, string>): Promise<{ data: AiConversation[] }> { return this.c.get('/v1/ai/conversations', q); }
  get(id: string): Promise<AiConversation> { return this.c.get(`/v1/ai/conversations/${id}`); }
  create(d?: { title?: string }): Promise<AiConversation> { return this.c.post('/v1/ai/conversations', d); }
  update(id: string, d: { title?: string }): Promise<AiConversation> { return this.c.patch(`/v1/ai/conversations/${id}`, d); }
  delete(id: string): Promise<void> { return this.c.delete(`/v1/ai/conversations/${id}`); }
  chat(id: string, d: { message: string }): Promise<{ response: string }> { return this.c.post(`/v1/ai/conversations/${id}/chat`, d); }
}
