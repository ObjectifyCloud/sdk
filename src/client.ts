import { ObjectifyError } from './errors.js';
import type { ClientOptions } from './types.js';
import { SchemaResource } from './resources/schema.js';
import { ObjectsResource } from './resources/objects.js';
import { SearchResource } from './resources/search.js';
import { AssociationsResource } from './resources/associations.js';
import { ViewsResource } from './resources/views.js';
import { FilesResource } from './resources/files.js';
import { CommentsResource } from './resources/comments.js';
import { WorkflowsResource } from './resources/workflows.js';
import { AuthResource } from './resources/auth.js';
import { AdminResource } from './resources/admin.js';
import { AccountingResource } from './resources/accounting.js';
import { AiResource } from './resources/ai.js';
import { OwnerResource } from './resources/owner.js';
import { ReportsResource } from './resources/reports.js';
import { ImportExportResource } from './resources/import-export.js';
import { NotificationsResource } from './resources/notifications.js';

export class ObjectifyClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private fetchFn: typeof globalThis.fetch;
  private timeout: number;
  private maxRetries: number;

  readonly schema: SchemaResource;
  readonly objects: ObjectsResource;
  readonly search: SearchResource;
  readonly associations: AssociationsResource;
  readonly views: ViewsResource;
  readonly files: FilesResource;
  readonly comments: CommentsResource;
  readonly workflows: WorkflowsResource;
  readonly auth: AuthResource;
  readonly admin: AdminResource;
  readonly accounting: AccountingResource;
  readonly ai: AiResource;
  readonly owner: OwnerResource;
  readonly reports: ReportsResource;
  readonly importExport: ImportExportResource;
  readonly notifications: NotificationsResource;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl || 'https://api.objectify.cloud').replace(/\/$/, '');
    this.fetchFn = options.fetch || globalThis.fetch.bind(globalThis);
    this.timeout = options.timeout || 30_000;
    this.maxRetries = options.maxRetries ?? 2;
    this.headers = { 'Content-Type': 'application/json' };

    if (options.adminKey) {
      this.headers['Authorization'] = `Bearer ${options.adminKey}`;
      this.headers['X-Admin-Key'] = options.adminKey;
    } else if (options.jwt) {
      this.headers['Authorization'] = `Bearer ${options.jwt}`;
    } else if (options.apiKey) {
      this.headers['Authorization'] = `Bearer ${options.apiKey}`;
    }

    this.schema = new SchemaResource(this);
    this.objects = new ObjectsResource(this);
    this.search = new SearchResource(this);
    this.associations = new AssociationsResource(this);
    this.views = new ViewsResource(this);
    this.files = new FilesResource(this);
    this.comments = new CommentsResource(this);
    this.workflows = new WorkflowsResource(this);
    this.auth = new AuthResource(this);
    this.admin = new AdminResource(this);
    this.accounting = new AccountingResource(this);
    this.ai = new AiResource(this);
    this.owner = new OwnerResource(this);
    this.reports = new ReportsResource(this);
    this.importExport = new ImportExportResource(this);
    this.notifications = new NotificationsResource(this);
  }

  setToken(jwt: string): void {
    this.headers['Authorization'] = `Bearer ${jwt}`;
  }

  async request<T = unknown>(method: string, path: string, options?: {
    body?: unknown;
    query?: Record<string, string | number | boolean | undefined>;
    headers?: Record<string, string>;
  }): Promise<T> {
    let url = `${this.baseUrl}${path}`;
    if (options?.query) {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(options.query)) {
        if (v !== undefined) params.set(k, String(v));
      }
      const qs = params.toString();
      if (qs) url += `?${qs}`;
    }

    const init: RequestInit = {
      method,
      headers: { ...this.headers, ...options?.headers },
      signal: AbortSignal.timeout(this.timeout),
    };
    if (options?.body !== undefined) {
      init.body = JSON.stringify(options.body);
    }

    let lastError: unknown;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const res = await this.fetchFn(url, init);
        if (res.status === 204) return undefined as T;

        const body = await res.json().catch(() => null);
        if (!res.ok) throw ObjectifyError.fromResponse(res.status, body);
        return body as T;
      } catch (err) {
        lastError = err;
        if (err instanceof ObjectifyError && err.status !== 429 && err.status < 500) throw err;
        if (attempt < this.maxRetries) {
          await new Promise(r => setTimeout(r, Math.min(1000 * 2 ** attempt, 10_000)));
        }
      }
    }
    throw lastError;
  }

  async get<T = unknown>(path: string, query?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('GET', path, { query });
  }

  async post<T = unknown>(path: string, body?: unknown, query?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('POST', path, { body, query });
  }

  async put<T = unknown>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, { body });
  }

  async patch<T = unknown>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, { body });
  }

  async delete<T = unknown>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}
