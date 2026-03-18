import type { ObjectifyClient } from '../client.js';
import type { Tenant, ApiKey, Webhook, PaginatedResponse, AuthUser } from '../types.js';

export class AdminResource {
  readonly tenants: AdminTenantsResource;
  readonly keys: AdminKeysResource;
  readonly users: AdminUsersResource;
  readonly webhooks: AdminWebhooksResource;
  readonly policies: AdminPoliciesResource;
  readonly forms: AdminFormsResource;
  readonly automations: AdminAutomationsResource;
  readonly roles: AdminRolesResource;
  readonly governance: AdminGovernanceResource;
  readonly dashboards: AdminDashboardsResource;
  readonly scheduledJobs: AdminScheduledJobsResource;
  readonly savedReports: AdminSavedReportsResource;
  readonly integrations: AdminIntegrationsResource;
  readonly plugins: AdminPluginsResource;

  constructor(private client: ObjectifyClient) {
    this.tenants = new AdminTenantsResource(client);
    this.keys = new AdminKeysResource(client);
    this.users = new AdminUsersResource(client);
    this.webhooks = new AdminWebhooksResource(client);
    this.policies = new AdminPoliciesResource(client);
    this.forms = new AdminFormsResource(client);
    this.automations = new AdminAutomationsResource(client);
    this.roles = new AdminRolesResource(client);
    this.governance = new AdminGovernanceResource(client);
    this.dashboards = new AdminDashboardsResource(client);
    this.scheduledJobs = new AdminScheduledJobsResource(client);
    this.savedReports = new AdminSavedReportsResource(client);
    this.integrations = new AdminIntegrationsResource(client);
    this.plugins = new AdminPluginsResource(client);
  }
}

class AdminTenantsResource {
  constructor(private client: ObjectifyClient) {}
  list(query?: { cursor?: string; limit?: number }): Promise<PaginatedResponse<Tenant>> { return this.client.get('/admin/tenants', query); }
  create(data: { name: string; slug?: string; plan_tier?: string }): Promise<Tenant> { return this.client.post('/admin/tenants', data); }
  get(tenantId: string): Promise<Tenant> { return this.client.get(`/admin/tenants/${tenantId}`); }
  delete(tenantId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}`); }
  getRoute(tenantId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/route`); }
  migrate(tenantId: string, data: { target_shard_id: string }): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/migrate`, data); }
  updateQuota(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/quota`, data); }
  setPlan(tenantId: string, data: { plan_tier: string }): Promise<unknown> { return this.client.put(`/admin/tenants/${tenantId}/plan`, data); }
  getUsage(tenantId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/usage`); }
  filesCleanup(tenantId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/files/cleanup`); }
  updateAllowedOrigins(tenantId: string, data: { origins: string[] }): Promise<unknown> { return this.client.put(`/admin/tenants/${tenantId}/allowed-origins`, data); }
  suspend(tenantId: string, data?: { reason?: string }): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/suspend`, data); }
  unsuspend(tenantId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/unsuspend`); }
  billingUsage(tenantId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/billing/usage`); }
  analytics(tenantId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/analytics`, query); }
  globalAnalytics(): Promise<unknown> { return this.client.get('/admin/analytics'); }
  listErrors(query?: { cursor?: string; limit?: number }): Promise<unknown> { return this.client.get('/admin/errors', query); }
  clearErrors(): Promise<void> { return this.client.delete('/admin/errors'); }
  getErrorWebhook(): Promise<unknown> { return this.client.get('/admin/errors/webhook'); }
  setErrorWebhook(data: { url: string }): Promise<unknown> { return this.client.put('/admin/errors/webhook', data); }
  listAuditLogs(tenantId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/audit-logs`, query); }
  listEvents(tenantId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/events`, query); }
  realtimeStats(tenantId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/realtime/stats`); }
  listDlq(query?: { cursor?: string; limit?: number }): Promise<unknown> { return this.client.get('/admin/dlq', query); }
  retryDlq(messageId: string): Promise<unknown> { return this.client.post(`/admin/dlq/${messageId}/retry`); }
  discardDlq(messageId: string): Promise<void> { return this.client.delete(`/admin/dlq/${messageId}`); }
  sqlQuery(tenantId: string, data: { query: string }): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/sql`, data); }
  billingCheckout(tenantId: string, data: { plan_tier: string }): Promise<{ url: string }> { return this.client.post(`/admin/tenants/${tenantId}/billing/checkout`, data); }
  billingPortal(tenantId: string): Promise<{ url: string }> { return this.client.post(`/admin/tenants/${tenantId}/billing/portal`); }
  getAuthConfig(tenantId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/auth-config`); }
  setAuthConfig(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.put(`/admin/tenants/${tenantId}/auth-config`, data); }
  listShards(): Promise<unknown> { return this.client.get('/admin/shards'); }
  provisionShard(data: { shard_id: string; binding_name: string }): Promise<unknown> { return this.client.post('/admin/shards', data); }
  fileStats(tenantId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/files/stats`); }
}

class AdminKeysResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: ApiKey[] }> { return this.client.get(`/admin/tenants/${tenantId}/keys`); }
  create(tenantId: string, data: { label?: string; scopes?: string[]; ip_allowlist?: string[]; expires_at?: string }): Promise<ApiKey & { raw_key: string }> { return this.client.post(`/admin/tenants/${tenantId}/keys`, data); }
  revoke(tenantId: string, keyId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/keys/${keyId}`); }
  rotate(tenantId: string, keyId: string): Promise<ApiKey & { raw_key: string }> { return this.client.post(`/admin/tenants/${tenantId}/keys/${keyId}/rotate`); }
  update(tenantId: string, keyId: string, data: Partial<{ label: string; scopes: string[]; ip_allowlist: string[] }>): Promise<ApiKey> { return this.client.patch(`/admin/tenants/${tenantId}/keys/${keyId}`, data); }
}

class AdminUsersResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string, query?: { cursor?: string; limit?: number }): Promise<PaginatedResponse<AuthUser>> { return this.client.get(`/admin/tenants/${tenantId}/users`, query); }
  create(tenantId: string, data: { email: string; password?: string; role?: string }): Promise<AuthUser> { return this.client.post(`/admin/tenants/${tenantId}/users`, data); }
  get(tenantId: string, userId: string): Promise<AuthUser> { return this.client.get(`/admin/tenants/${tenantId}/users/${userId}`); }
  update(tenantId: string, userId: string, data: Partial<{ email: string; role: string; banned: boolean }>): Promise<AuthUser> { return this.client.patch(`/admin/tenants/${tenantId}/users/${userId}`, data); }
  delete(tenantId: string, userId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/users/${userId}`); }
}

class AdminWebhooksResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: Webhook[] }> { return this.client.get(`/admin/tenants/${tenantId}/webhooks`); }
  create(tenantId: string, data: { url: string; events: string[] }): Promise<Webhook> { return this.client.post(`/admin/tenants/${tenantId}/webhooks`, data); }
  update(tenantId: string, webhookId: string, data: Partial<{ url: string; events: string[]; active: boolean }>): Promise<Webhook> { return this.client.patch(`/admin/tenants/${tenantId}/webhooks/${webhookId}`, data); }
  delete(tenantId: string, webhookId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/webhooks/${webhookId}`); }
  test(tenantId: string, webhookId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/webhooks/${webhookId}/test`); }
  replay(tenantId: string, webhookId: string, data: { delivery_id: string }): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/webhooks/${webhookId}/replay`, data); }
  rotateSecret(tenantId: string, webhookId: string): Promise<{ secret: string }> { return this.client.post(`/admin/tenants/${tenantId}/webhooks/${webhookId}/rotate-secret`); }
}

class AdminPoliciesResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string, typeId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/types/${typeId}/policies`); }
  create(tenantId: string, typeId: string, data: { action: string; role: string; condition?: unknown }): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/types/${typeId}/policies`, data); }
  update(tenantId: string, typeId: string, policyId: string, data: Partial<{ action: string; role: string; condition: unknown }>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/types/${typeId}/policies/${policyId}`, data); }
  delete(tenantId: string, typeId: string, policyId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/types/${typeId}/policies/${policyId}`); }
}

class AdminFormsResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/forms`); }
  create(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/forms`, data); }
  update(tenantId: string, formId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/forms/${formId}`, data); }
  delete(tenantId: string, formId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/forms/${formId}`); }
  duplicate(tenantId: string, formId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/forms/${formId}/duplicate`); }
  listSubmissions(tenantId: string, formId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/forms/${formId}/submissions`, query); }
  exportSubmissions(tenantId: string, formId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/forms/${formId}/submissions/export`, query); }
  analytics(tenantId: string, formId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/forms/${formId}/analytics`); }
}

class AdminAutomationsResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/automations`); }
  get(tenantId: string, automationId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/automations/${automationId}`); }
  create(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/automations`, data); }
  update(tenantId: string, automationId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/automations/${automationId}`, data); }
  delete(tenantId: string, automationId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/automations/${automationId}`); }
  trigger(tenantId: string, automationId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/automations/${automationId}/trigger`); }
  listRuns(tenantId: string, automationId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/automations/${automationId}/runs`, query); }
}

class AdminRolesResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/roles`); }
  get(tenantId: string, roleId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/roles/${roleId}`); }
  create(tenantId: string, data: { name: string; permissions?: string[] }): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/roles`, data); }
  update(tenantId: string, roleId: string, data: Partial<{ name: string; permissions: string[] }>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/roles/${roleId}`, data); }
  delete(tenantId: string, roleId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/roles/${roleId}`); }
  assignPermissions(tenantId: string, roleId: string, data: { permissions: string[] }): Promise<unknown> { return this.client.put(`/admin/tenants/${tenantId}/roles/${roleId}/permissions`, data); }
  assignUser(tenantId: string, roleId: string, data: { user_id: string }): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/roles/${roleId}/users`, data); }
  removeUser(tenantId: string, roleId: string, userId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/roles/${roleId}/users/${userId}`); }
  listUserRoles(tenantId: string, userId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/users/${userId}/roles`); }
}

class AdminGovernanceResource {
  constructor(private client: ObjectifyClient) {}
  get(tenantId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/governance`); }
  update(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.put(`/admin/tenants/${tenantId}/governance`, data); }
  simulate(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/governance/simulate`, data); }
}

class AdminDashboardsResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/dashboards`); }
  get(tenantId: string, dashboardId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/dashboards/${dashboardId}`); }
  create(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/dashboards`, data); }
  update(tenantId: string, dashboardId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/dashboards/${dashboardId}`, data); }
  delete(tenantId: string, dashboardId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/dashboards/${dashboardId}`); }
  addWidget(tenantId: string, dashboardId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/dashboards/${dashboardId}/widgets`, data); }
  updateWidget(tenantId: string, dashboardId: string, widgetId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/dashboards/${dashboardId}/widgets/${widgetId}`, data); }
  deleteWidget(tenantId: string, dashboardId: string, widgetId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/dashboards/${dashboardId}/widgets/${widgetId}`); }
}

class AdminScheduledJobsResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/scheduled-jobs`); }
  get(tenantId: string, jobId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/scheduled-jobs/${jobId}`); }
  create(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/scheduled-jobs`, data); }
  update(tenantId: string, jobId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/scheduled-jobs/${jobId}`, data); }
  delete(tenantId: string, jobId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/scheduled-jobs/${jobId}`); }
  execute(tenantId: string, jobId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/scheduled-jobs/${jobId}/execute`); }
}

class AdminSavedReportsResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/saved-reports`); }
  get(tenantId: string, reportId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/saved-reports/${reportId}`); }
  create(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/saved-reports`, data); }
  update(tenantId: string, reportId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/saved-reports/${reportId}`, data); }
  delete(tenantId: string, reportId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/saved-reports/${reportId}`); }
  run(tenantId: string, reportId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/saved-reports/${reportId}/run`); }
  export(tenantId: string, reportId: string, query?: { format?: string }): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/saved-reports/${reportId}/export`, query); }
}

class AdminIntegrationsResource {
  constructor(private client: ObjectifyClient) {}
  list(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/integrations`); }
  get(tenantId: string, integrationId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/integrations/${integrationId}`); }
  create(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/integrations`, data); }
  update(tenantId: string, integrationId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/integrations/${integrationId}`, data); }
  delete(tenantId: string, integrationId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/integrations/${integrationId}`); }
  sync(tenantId: string, integrationId: string): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/integrations/${integrationId}/sync`); }
  listLogs(tenantId: string, integrationId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/integrations/${integrationId}/logs`, query); }
}

class AdminPluginsResource {
  constructor(private client: ObjectifyClient) {}
  listPlugins(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/plugins`); }
  getPlugin(tenantId: string, pluginId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/plugins/${pluginId}`); }
  installPlugin(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/plugins`, data); }
  updatePlugin(tenantId: string, pluginId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/plugins/${pluginId}`, data); }
  uninstallPlugin(tenantId: string, pluginId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/plugins/${pluginId}`); }
  listFunctions(tenantId: string): Promise<{ data: unknown[] }> { return this.client.get(`/admin/tenants/${tenantId}/functions`); }
  getFunction(tenantId: string, fnId: string): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/functions/${fnId}`); }
  createFunction(tenantId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/functions`, data); }
  updateFunction(tenantId: string, fnId: string, data: Record<string, unknown>): Promise<unknown> { return this.client.patch(`/admin/tenants/${tenantId}/functions/${fnId}`, data); }
  deleteFunction(tenantId: string, fnId: string): Promise<void> { return this.client.delete(`/admin/tenants/${tenantId}/functions/${fnId}`); }
  executeFunction(tenantId: string, fnId: string, data?: Record<string, unknown>): Promise<unknown> { return this.client.post(`/admin/tenants/${tenantId}/functions/${fnId}/execute`, data); }
  listFunctionLogs(tenantId: string, fnId: string, query?: Record<string, string>): Promise<unknown> { return this.client.get(`/admin/tenants/${tenantId}/functions/${fnId}/logs`, query); }
}
