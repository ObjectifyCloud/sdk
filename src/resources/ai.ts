import type { ObjectifyClient } from '../client.js';
import type { AiConversation, AiChatMessage } from '../types.js';

export class AiResource {
  readonly conversations: AiConversationsResource;
  constructor(private client: ObjectifyClient) {
    this.conversations = new AiConversationsResource(client);
  }

  models(): Promise<{ models: unknown[] }> { return this.client.get('/ai/models'); }
  chat(data: { messages: AiChatMessage[]; model?: string; max_tokens?: number }): Promise<{ response: string }> { return this.client.post('/ai/chat', data); }
  generate(data: { prompt: string; model?: string; max_tokens?: number }): Promise<{ text: string }> { return this.client.post('/ai/generate', data); }
  embeddings(data: { texts: string[]; model?: string }): Promise<{ embeddings: number[][] }> { return this.client.post('/ai/embeddings', data); }
  search(data: { query: string; object_type_id?: string; limit?: number }): Promise<{ results: unknown[] }> { return this.client.post('/ai/search', data); }
  index(data: { object_type_id: string; object_id: string }): Promise<{ indexed: boolean }> { return this.client.post('/ai/index', data); }
  moderate(data: { text: string }): Promise<{ flagged: boolean; categories: Record<string, boolean> }> { return this.client.post('/ai/moderate', data); }
  describe(data: { object_type_id: string; object_id: string }): Promise<{ description: string }> { return this.client.post('/ai/describe', data); }
  autoTag(data: { object_type_id: string; object_id: string }): Promise<{ tags: string[] }> { return this.client.post('/ai/auto-tag', data); }
  summarise(data: { object_type_id: string; object_id: string }): Promise<{ summary: string }> { return this.client.post('/ai/summarise', data); }
}

class AiConversationsResource {
  constructor(private c: ObjectifyClient) {}
  list(q?: Record<string, string>): Promise<{ data: AiConversation[] }> { return this.c.get('/ai/conversations', q); }
  get(id: string): Promise<AiConversation> { return this.c.get(`/ai/conversations/${id}`); }
  create(d?: { title?: string }): Promise<AiConversation> { return this.c.post('/ai/conversations', d); }
  update(id: string, d: { title?: string }): Promise<AiConversation> { return this.c.patch(`/ai/conversations/${id}`, d); }
  delete(id: string): Promise<void> { return this.c.delete(`/ai/conversations/${id}`); }
  chat(id: string, d: { message: string }): Promise<{ response: string }> { return this.c.post(`/ai/conversations/${id}/chat`, d); }
}
