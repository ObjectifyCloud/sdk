import type { ObjectifyClient } from '../client.js';
import type { OwnerProfile, Tenant, AuthTokens } from '../types.js';

export class OwnerResource {
  constructor(private client: ObjectifyClient) {}

  login(data: { email: string; password: string }): Promise<AuthTokens> { return this.client.post('/owner/login', data); }
  signup(data: { email: string; password: string; name?: string; organization_name?: string }): Promise<AuthTokens> { return this.client.post('/owner/signup', data); }
  verifyEmail(data: { token: string }): Promise<{ verified: boolean }> { return this.client.post('/owner/verify-email', data); }
  resendVerification(): Promise<{ sent: boolean }> { return this.client.post('/owner/resend-verification'); }
  forgotPassword(data: { email: string }): Promise<{ sent: boolean }> { return this.client.post('/owner/forgot-password', data); }
  resetPassword(data: { token: string; password: string }): Promise<{ reset: boolean }> { return this.client.post('/owner/reset-password', data); }
  checkSlug(slug: string): Promise<{ available: boolean }> { return this.client.get('/owner/check-slug', { slug }); }
  getProfile(): Promise<OwnerProfile> { return this.client.get('/owner/profile'); }
  updateProfile(data: Partial<{ name: string; email: string }>): Promise<OwnerProfile> { return this.client.patch('/owner/profile', data); }
  changePassword(data: { current_password: string; new_password: string }): Promise<void> { return this.client.post('/owner/change-password', data); }
  updateOrg(data: { organization_name: string }): Promise<unknown> { return this.client.patch('/owner/organization', data); }

  // MFA
  mfaEnroll(data: { type: 'totp' }): Promise<{ secret: string; qr_code: string }> { return this.client.post('/owner/mfa/enroll', data); }
  mfaVerify(data: { code: string }): Promise<{ verified: boolean }> { return this.client.post('/owner/mfa/verify', data); }
  mfaList(): Promise<{ factors: unknown[] }> { return this.client.get('/owner/mfa/factors'); }
  mfaUnenroll(factorId: string): Promise<void> { return this.client.delete(`/owner/mfa/${factorId}`); }

  // Passkeys
  passkeysList(): Promise<{ passkeys: unknown[] }> { return this.client.get('/owner/passkeys'); }
  passkeyRegisterBegin(): Promise<unknown> { return this.client.post('/owner/passkeys/register/begin'); }
  passkeyRegisterComplete(data: unknown): Promise<unknown> { return this.client.post('/owner/passkeys/register/complete', data); }
  passkeyDelete(passkeyId: string): Promise<void> { return this.client.delete(`/owner/passkeys/${passkeyId}`); }

  // Notifications
  updateNotifications(data: Record<string, unknown>): Promise<unknown> { return this.client.patch('/owner/notifications', data); }

  // Tenants
  listTenants(): Promise<{ data: Tenant[] }> { return this.client.get('/owner/tenants'); }
  createTenant(data: { name: string; slug?: string }): Promise<Tenant> { return this.client.post('/owner/tenants', data); }
  switchTenant(data: { tenant_id: string }): Promise<AuthTokens> { return this.client.post('/owner/switch-tenant', data); }

  // Support tickets
  listTickets(q?: Record<string, string>): Promise<{ data: unknown[] }> { return this.client.get('/owner/support-tickets', q); }
  getTicket(id: string): Promise<unknown> { return this.client.get(`/owner/support-tickets/${id}`); }
  createTicket(data: { title: string; body: string }): Promise<unknown> { return this.client.post('/owner/support-tickets', data); }
  replyTicket(id: string, data: { body: string }): Promise<unknown> { return this.client.post(`/owner/support-tickets/${id}/reply`, data); }
  closeTicket(id: string): Promise<unknown> { return this.client.post(`/owner/support-tickets/${id}/close`); }
}
