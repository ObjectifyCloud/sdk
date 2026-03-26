import type { ObjectifyClient } from '../client.js';
import type { AuthTokens, AuthUser } from '../types.js';

export class AuthResource {
  constructor(private client: ObjectifyClient) {}

  // Core auth
  signup(data: { email: string; password: string; role?: string; user_metadata?: Record<string, unknown> }): Promise<AuthTokens> {
    return this.client.post('/v1/auth/signup', data);
  }
  login(data: { email: string; password: string }): Promise<AuthTokens> {
    return this.client.post('/v1/auth/login', data);
  }
  logout(): Promise<void> {
    return this.client.post('/v1/auth/logout');
  }
  refresh(data: { refresh_token: string }): Promise<AuthTokens> {
    return this.client.post('/v1/auth/refresh', data);
  }
  getUser(): Promise<AuthUser> {
    return this.client.get('/v1/auth/user');
  }
  updateUser(data: Partial<{ email: string; password: string; role: string; user_metadata: Record<string, unknown> }>): Promise<AuthUser> {
    return this.client.patch('/v1/auth/user', data);
  }
  verifyEmail(data: { token: string }): Promise<{ verified: boolean }> {
    return this.client.post('/v1/auth/verify', data);
  }

  // Password reset
  forgotPassword(data: { email: string }): Promise<{ sent: boolean }> {
    return this.client.post('/v1/auth/forgot-password', data);
  }
  resetPassword(data: { token: string; password: string }): Promise<{ reset: boolean }> {
    return this.client.post('/v1/auth/reset-password', data);
  }

  // Magic link
  magicLink(data: { email: string }): Promise<{ sent: boolean }> {
    return this.client.post('/v1/auth/magic-link', data);
  }
  magicLinkVerify(data: { token: string }): Promise<AuthTokens> {
    return this.client.post('/v1/auth/magic-link/verify', data);
  }

  // OAuth
  oauthRedirect(provider: string, query?: { redirect_uri?: string }): Promise<{ url: string }> {
    return this.client.get(`/v1/auth/oauth/${provider}`, query);
  }

  // OTP
  otpSend(data: { phone: string }): Promise<{ sent: boolean }> {
    return this.client.post('/v1/auth/otp/send', data);
  }
  otpVerify(data: { phone: string; code: string }): Promise<AuthTokens> {
    return this.client.post('/v1/auth/otp/verify', data);
  }

  // Anonymous
  anonymous(): Promise<AuthTokens> {
    return this.client.post('/v1/auth/anonymous');
  }

  // MFA
  mfaEnroll(data: { type: 'totp' }): Promise<{ secret: string; qr_code: string; ticket: string }> {
    return this.client.post('/v1/auth/mfa/enroll', data);
  }
  mfaVerify(data: { ticket: string; code: string }): Promise<AuthTokens> {
    return this.client.post('/v1/auth/mfa/verify', data);
  }
  mfaUnenroll(factorId: string): Promise<void> {
    return this.client.delete(`/v1/auth/mfa/${factorId}`);
  }
  mfaList(): Promise<{ factors: unknown[] }> {
    return this.client.get('/v1/auth/mfa/factors');
  }
  mfaChallenge(data: { factor_id: string }): Promise<{ ticket: string }> {
    return this.client.post('/v1/auth/mfa/challenge', data);
  }

  // Sessions
  sessionsList(): Promise<{ sessions: unknown[] }> {
    return this.client.get('/v1/auth/sessions');
  }
  sessionRevoke(sessionId: string): Promise<void> {
    return this.client.delete(`/v1/auth/sessions/${sessionId}`);
  }
  sessionsRevokeAll(): Promise<void> {
    return this.client.delete('/v1/auth/sessions');
  }

  // Passkeys
  passkeysList(): Promise<{ passkeys: unknown[] }> {
    return this.client.get('/v1/auth/passkeys');
  }
  passkeyRegisterBegin(): Promise<unknown> {
    return this.client.post('/v1/auth/passkeys/register/begin');
  }
  passkeyRegisterComplete(data: unknown): Promise<unknown> {
    return this.client.post('/v1/auth/passkeys/register/complete', data);
  }
  passkeyAuthBegin(): Promise<unknown> {
    return this.client.post('/v1/auth/passkeys/authenticate/begin');
  }
  passkeyAuthComplete(data: unknown): Promise<AuthTokens> {
    return this.client.post('/v1/auth/passkeys/authenticate/complete', data);
  }
  passkeyDelete(passkeyId: string): Promise<void> {
    return this.client.delete(`/v1/auth/passkeys/${passkeyId}`);
  }
}
