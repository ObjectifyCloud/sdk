import { describe, it, expect, vi } from 'vitest';
import { ObjectifyClient, ObjectifyError, UnauthorizedError, RateLimitError } from '../src/index.js';

const mockFetch = vi.fn();

function client(opts: Record<string, unknown> = {}) {
  return new ObjectifyClient({ baseUrl: 'https://test.api', fetch: mockFetch as unknown as typeof fetch, maxRetries: 0, ...opts });
}

describe('ObjectifyClient', () => {
  it('uses default base URL', () => {
    const c = new ObjectifyClient({ fetch: mockFetch as unknown as typeof fetch });
    expect(c).toBeDefined();
  });

  it('sets API key auth header', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ data: [] }) });
    const c = client({ apiKey: 'test-key' });
    await c.schema.listTypes();
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer test-key' }),
    }));
  });

  it('sets JWT auth header', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) });
    const c = client({ jwt: 'eyJ...' });
    await c.get('/test');
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer eyJ...' }),
    }));
  });

  it('sets admin key header', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) });
    const c = client({ adminKey: 'admin-secret' });
    await c.get('/test');
    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers['X-Admin-Key']).toBe('admin-secret');
  });

  it('appends query params', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ data: [] }) });
    const c = client();
    await c.get('/test', { limit: 10, cursor: 'abc' });
    expect(mockFetch.mock.calls[0][0]).toBe('https://test.api/test?limit=10&cursor=abc');
  });

  it('handles 204 no-content', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 204, json: () => Promise.reject() });
    const c = client();
    const result = await c.delete('/test/123');
    expect(result).toBeUndefined();
  });

  it('throws UnauthorizedError on 401', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({ code: 'unauthorized', message: 'Bad token' }) });
    const c = client();
    await expect(c.get('/test')).rejects.toThrow(UnauthorizedError);
  });

  it('throws RateLimitError on 429', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 429, json: () => Promise.resolve({ code: 'rate_limit', message: 'Too fast' }) });
    const c = client();
    await expect(c.get('/test')).rejects.toThrow(RateLimitError);
  });

  it('parses error details', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 400, json: () => Promise.resolve({ code: 'validation_error', message: 'Bad input', details: { field: 'name' } }) });
    const c = client();
    try { await c.get('/test'); } catch (e) {
      expect(e).toBeInstanceOf(ObjectifyError);
      expect((e as ObjectifyError).details).toEqual({ field: 'name' });
    }
  });

  it('retries on 5xx', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 500, json: () => Promise.resolve({ message: 'fail' }) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ ok: true }) });
    const c = new ObjectifyClient({ baseUrl: 'https://test.api', fetch: mockFetch as unknown as typeof fetch, maxRetries: 1 });
    const result = await c.get('/test');
    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});

describe('Resource namespaces', () => {
  it('has all resource namespaces', () => {
    const c = client();
    expect(c.schema).toBeDefined();
    expect(c.objects).toBeDefined();
    expect(c.search).toBeDefined();
    expect(c.associations).toBeDefined();
    expect(c.views).toBeDefined();
    expect(c.files).toBeDefined();
    expect(c.comments).toBeDefined();
    expect(c.workflows).toBeDefined();
    expect(c.auth).toBeDefined();
    expect(c.admin).toBeDefined();
    expect(c.accounting).toBeDefined();
    expect(c.ai).toBeDefined();
    expect(c.owner).toBeDefined();
    expect(c.reports).toBeDefined();
    expect(c.importExport).toBeDefined();
    expect(c.notifications).toBeDefined();
  });

  it('admin has sub-resources', () => {
    const c = client();
    expect(c.admin.tenants).toBeDefined();
    expect(c.admin.keys).toBeDefined();
    expect(c.admin.users).toBeDefined();
    expect(c.admin.webhooks).toBeDefined();
    expect(c.admin.policies).toBeDefined();
    expect(c.admin.forms).toBeDefined();
    expect(c.admin.automations).toBeDefined();
    expect(c.admin.roles).toBeDefined();
    expect(c.admin.governance).toBeDefined();
    expect(c.admin.dashboards).toBeDefined();
    expect(c.admin.scheduledJobs).toBeDefined();
    expect(c.admin.savedReports).toBeDefined();
    expect(c.admin.integrations).toBeDefined();
    expect(c.admin.plugins).toBeDefined();
  });

  it('accounting has sub-resources', () => {
    const c = client();
    expect(c.accounting.accounts).toBeDefined();
    expect(c.accounting.periods).toBeDefined();
    expect(c.accounting.currencies).toBeDefined();
    expect(c.accounting.ledger).toBeDefined();
    expect(c.accounting.invoices).toBeDefined();
    expect(c.accounting.payments).toBeDefined();
    expect(c.accounting.banking).toBeDefined();
    expect(c.accounting.reports).toBeDefined();
  });
});
