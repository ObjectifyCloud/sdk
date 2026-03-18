import type { ObjectifyClient } from '../client.js';
import type { Notification } from '../types.js';

export class NotificationsResource {
  constructor(private client: ObjectifyClient) {}

  list(query?: { cursor?: string; limit?: number }): Promise<{ data: Notification[]; cursor?: string }> {
    return this.client.get('/notifications', query);
  }
  unreadCount(): Promise<{ count: number }> {
    return this.client.get('/notifications/unread-count');
  }
  markRead(notificationId: string): Promise<void> {
    return this.client.post(`/notifications/${notificationId}/read`);
  }
  markAllRead(): Promise<void> {
    return this.client.post('/notifications/read-all');
  }
  getPreferences(): Promise<Record<string, unknown>> {
    return this.client.get('/notifications/preferences');
  }
  updatePreferences(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.patch('/notifications/preferences', data);
  }
  deletePreference(key: string): Promise<void> {
    return this.client.delete(`/notifications/preferences/${key}`);
  }
}
