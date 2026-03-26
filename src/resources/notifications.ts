import type { ObjectifyClient } from '../client.js';
import type { Notification } from '../types.js';

export class NotificationsResource {
  constructor(private client: ObjectifyClient) {}

  list(query?: { cursor?: string; limit?: number }): Promise<{ data: Notification[]; cursor?: string }> {
    return this.client.get('/v1/auth/notifications', query);
  }
  unreadCount(): Promise<{ count: number }> {
    return this.client.get('/v1/auth/notifications/count');
  }
  markRead(notificationId: string): Promise<void> {
    return this.client.patch(`/v1/auth/notifications/${notificationId}/read`);
  }
  markAllRead(): Promise<void> {
    return this.client.post('/v1/auth/notifications/read-all');
  }
  getPreferences(): Promise<Record<string, unknown>> {
    return this.client.get('/v1/auth/notifications/preferences');
  }
  updatePreferences(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.client.patch('/v1/auth/notifications/preferences', data);
  }
  deletePreference(key: string): Promise<void> {
    return this.client.delete(`/v1/auth/notifications/preferences/${key}`);
  }
}
