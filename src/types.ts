// ── Auth & Config ─────────────────────────────────────────────
export type DataType =
  | 'string' | 'text' | 'email' | 'url' | 'phone' | 'slug' | 'color' | 'richtext'
  | 'number' | 'integer' | 'float' | 'percent' | 'currency' | 'rating'
  | 'boolean' | 'date' | 'datetime' | 'time'
  | 'json' | 'array' | 'object' | 'enum';

export type PlanTier = 'free' | 'starter' | 'pro' | 'business';
export type ApiKeyScope = 'read' | 'write' | 'schema' | 'files' | 'auth' | 'ai' | '*';
export type FilterOperator = 'eq' | 'in' | 'gt' | 'gte' | 'lt' | 'lte' | 'exists' | 'contains' | 'starts_with' | 'not_eq' | 'not_in';
export type SortDirection = 'asc' | 'desc';
export type FileAccess = 'public' | 'private';

// ── Client options ────────────────────────────────────────────
export interface ClientOptions {
  baseUrl?: string;
  apiKey?: string;
  jwt?: string;
  adminKey?: string;
  fetch?: typeof globalThis.fetch;
  timeout?: number;
  maxRetries?: number;
}

// ── Pagination ────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  cursor?: string | null;
  has_more: boolean;
  total?: number;
}

export interface PaginationParams {
  cursor?: string;
  limit?: number;
}

// ── Schema ────────────────────────────────────────────────────
export interface ObjectType {
  object_type_id: string;
  tenant_id: string;
  name: string;
  created_at: string;
}

export interface Property {
  property_id: string;
  object_type_id: string;
  tenant_id: string;
  name: string;
  data_type: DataType;
  is_indexed: boolean;
  is_sortable: boolean;
  is_unique: boolean;
  is_required: boolean;
  default_value?: string | null;
  validation_json?: string | null;
  created_at: string;
}

// ── Objects ───────────────────────────────────────────────────
export interface ObjectData {
  object_id: string;
  object_type_id: string;
  tenant_id: string;
  properties: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  version: number;
}

// ── Files ─────────────────────────────────────────────────────
export interface FileData {
  file_id: string;
  tenant_id: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  access: FileAccess;
  status: string;
  object_type_id?: string | null;
  object_id?: string | null;
  folder: string;
  url?: string;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// ── Auth ──────────────────────────────────────────────────────
export interface AuthUser {
  user_id: string;
  tenant_id: string;
  email?: string | null;
  phone?: string | null;
  role: string;
  email_verified: boolean;
  user_metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  user: AuthUser;
}

// ── Search ────────────────────────────────────────────────────
export interface SearchFilter {
  property: string;
  operator: FilterOperator;
  value: unknown;
}

export interface SearchParams {
  filters?: SearchFilter[];
  sort?: { property: string; direction: SortDirection }[];
  cursor?: string;
  limit?: number;
}

export interface AggregateParams {
  filters?: SearchFilter[];
  group_by?: string;
  metrics: { property: string; function: 'count' | 'sum' | 'avg' | 'min' | 'max' }[];
}

// ── Associations ──────────────────────────────────────────────
export interface Association {
  from_type_id: string;
  from_id: string;
  association_type: string;
  to_type_id: string;
  to_id: string;
  created_at: string;
  meta?: Record<string, unknown>;
}

// ── Views ─────────────────────────────────────────────────────
export interface View {
  view_id: string;
  object_type_id: string;
  name: string;
  filters?: SearchFilter[];
  sort?: { property: string; direction: SortDirection }[];
  columns?: string[];
  created_at: string;
  updated_at: string;
}

// ── Comments ──────────────────────────────────────────────────
export interface Comment {
  comment_id: string;
  object_id: string;
  user_id: string;
  body: string;
  created_at: string;
  updated_at: string;
}

// ── API Key ───────────────────────────────────────────────────
export interface ApiKey {
  key_id: string;
  tenant_id: string;
  label: string;
  scopes: ApiKeyScope[];
  status: string;
  ip_allowlist: string[];
  expires_at?: string | null;
  created_at: string;
  last_used_at?: string | null;
}

// ── Webhook ───────────────────────────────────────────────────
export interface Webhook {
  webhook_id: string;
  tenant_id: string;
  url: string;
  events: string[];
  secret?: string;
  active: boolean;
  created_at: string;
}

// ── Notification ──────────────────────────────────────────────
export interface Notification {
  notification_id: string;
  user_id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

// ── Accounting ────────────────────────────────────────────────
export interface Account {
  account_id: string;
  code: string;
  name: string;
  type: string;
  parent_id?: string | null;
  created_at: string;
}

export interface JournalEntry {
  entry_id: string;
  date: string;
  memo?: string;
  lines: { account_id: string; debit?: number; credit?: number }[];
  posted: boolean;
  created_at: string;
}

export interface Invoice {
  invoice_id: string;
  number: string;
  customer_name: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
}

// ── Owner ─────────────────────────────────────────────────────
export interface OwnerProfile {
  owner_id: string;
  email: string;
  name?: string;
  organization_name?: string;
  mfa_enabled: boolean;
  created_at: string;
}

export interface Tenant {
  tenant_id: string;
  organization_name?: string;
  plan_tier: PlanTier;
  shard_ids: string[];
  suspended: boolean;
  created_at: string;
}

// ── AI ────────────────────────────────────────────────────────
export interface AiChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AiConversation {
  conversation_id: string;
  title?: string;
  messages: AiChatMessage[];
  created_at: string;
  updated_at: string;
}
