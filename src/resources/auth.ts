import type { ObjectifyClient } from '../client.js';
import type { AuthTokens, AuthUser } from '../types.js';

export class AuthResource {
  constructor(private client: ObjectifyClient) {}

  // Core auth
  signup(data: { email: string; password: string; role?: string; user_metadata?: Record<string, unknown> }): Promise<AuthTokens> {
    return this.client.post('/auth/signup', data);
  }
  login(data: { email: string; password: string }): Promise<AuthTokens> {
    return this.client.post('/auth/login', data);
  }
  logout(): Promise<void> {
    return this.client.post('/auth/logout');
  }
  refresh(data: { refresh_token: string }): Promise<AuthTokens> {
    return this.client.post('/auth/refresh', data);
  }
  getUser(): Promise<AuthUser> {
    return this.client.get('/auth/user');
  }
  updateUser(data: Partial<{ email: string; password: string; role: string; user_metadata: Record<string, unknown> }>): Promise<AuthUser> {
    return this.client.patch('/auth/user', data);
  }
  verifyEmail(data: { token: string }): Promise<{ verified: boolean }> {
    return this.client.post('/auth/verify-email', data);
  }

  // Password reset
  forgotPassword(data: { email: string }): Promise<{ sent: boolean }> {
    return this.client.post('/auth/forgot-password', data);
  }
  resetPassword(data: { token: string; password: string }): Promise<{ reset: boolean }> {
    return this.client.post('/auth/reset-password', data);
  }

  // Magic link
  magicLink(data: { email: string }): Promise<{ sent: boolean }> {
    return this.client.post('/auth/magic-link', data);
  }
  magicLinkVerify(data: { token: string }): Promise<AuthTokens> {
    return this.client.post('/auth/magic-link/verify', data);
  }

  // OAuth
  oauthRedirect(provider: string, query?: { redirect_uri?: string }): Promise<{ url: string }> {
    return this.client.get(`/auth/oauth/${provider}`, query);
  }

  // OTP
  otpSend(data: { phone: string }): Promise<{ sent: boolean }> {
    return this.client.post('/auth/otp/send', data);
  }
  otpVerify(data: { phone: string; code: string }): Promise<AuthTokens> {
    return this.client.post('/auth/otp/verify', data);
  }

  // Anonymous
  anonymous(): Promise<AuthTokens> {
    return this.client.post('/auth/anonymous');
  }

  // MFA
  mfaEnroll(data: { type: 'totp' }): Promise<{ secret: string; qr_code: string; ticket: string }> {
    return this.client.post('/auth/mfa/enroll', data);
  }
  mfaVerify(data: { ticket: string; code: string }): Promise<AuthTokens> {
    return this.client.post('/auth/mfa/verify', data);
  }
  mfaUnenroll(data: { factor_id: string }): Promise<void> {
    return this.client.post('/auth/mfa/unenroll', data);
  }
  mfaList(): Promise<{ factors: unknown[] }> {
    return this.client.get('/auth/mfa/factors');
  }
  mfaChallenge(data: { factor_id: string }): Promise<{ ticket: string }> {
    return this.client.post('/auth/mfa/challenge', data);
  }

  // Sessions
  sessionsList(): Promise<{ sessions: unknown[] }> {
    return this.client.get('/auth/sessions');
  }
  sessionRevoke(sessionId: string): Promise<void> {
    return this.client.delete(`/auth/sessions/${sessionId}`);
  }
  sessionsRevokeAll(): Promise<void> {
    return this.client.post('/auth/sessions/revoke-all');
  }

  // Passkeys
  passkeysList(): Promise<{ passkeys: unknown[] }> {
    return this.client.get('/auth/passkeys');
  }
  passkeyRegisterBegin(): Promise<unknown> {
    return this.client.post('/auth/passkeys/register/begin');
  }
  passkeyRegisterComplete(data: unknown): Promise<unknown> {
    return this.client.post('/auth/passkeys/register/complete', data);
  }
  passkeyAuthBegin(): Promise<unknown> {
    return this.client.post('/auth/passkeys/auth/begin');
  }
  passkeyAuthComplete(data: unknown): Promise<AuthTokens> {
    return this.client.post('/auth/passkeys/auth/complete', data);
  }
  passkeyDelete(passkeyId: string): Promise<void> {
    return this.client.delete(`/auth/passkeys/${passkeyId}`);
  }
}
