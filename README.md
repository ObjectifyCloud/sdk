# @objectify/sdk

TypeScript SDK for the [Objectify](https://objectify.cloud) multi-tenant Objects Platform API.

## Installation

```bash
npm install github:ObjectifyCloud/sdk
```

## Quick Start

```typescript
import { ObjectifyClient } from '@objectify/sdk';

const client = new ObjectifyClient({
  baseUrl: 'https://api.objectify.cloud',
  apiKey: 'your-api-key',
});

// List object types
const types = await client.schema.listTypes();

// Create an object
const obj = await client.objects.create('type-id', {
  properties: { name: 'Hello', email: 'hello@example.com' },
});

// Search with filters
const results = await client.search.search('type-id', {
  filters: [{ property: 'status', operator: 'eq', value: 'active' }],
  limit: 20,
});
```

## Authentication

```typescript
// API Key (scoped access)
const client = new ObjectifyClient({ apiKey: 'obj_...' });

// Owner JWT (full admin + owner access)
const client = new ObjectifyClient({ jwt: 'eyJ...' });

// Admin key (platform admin)
const client = new ObjectifyClient({ adminKey: 'your-admin-key' });
```

## Resources

| Namespace | Methods |
|-----------|---------|
| `client.schema` | listTypes, getType, createType, updateType, deleteType, listProperties, getProperty, createProperty, updateProperty, deleteProperty |
| `client.objects` | list, get, create, update, delete, batchCreate, batchUpdate, batchRead, listTrash, restore, listVersions |
| `client.search` | search, aggregate |
| `client.associations` | list, create, delete |
| `client.views` | list, create, update, delete |
| `client.files` | get, update, delete, search, signedUrl, listVersions, getStats, listFolders, listTrash, restore, batchRead, batchDelete, batchUpdate |
| `client.comments` | list, create, update, delete |
| `client.workflows` | submit, approve, reject, status |
| `client.auth` | signup, login, logout, refresh, getUser, updateUser, verifyEmail, forgotPassword, resetPassword, magicLink, otp, mfa, sessions, passkeys |
| `client.admin.tenants` | list, create, get, delete, migrate, setPlan, suspend, analytics, sql, billing, and 30+ more |
| `client.admin.keys` | list, create, revoke, rotate, update |
| `client.admin.users` | list, create, get, update, delete |
| `client.admin.webhooks` | list, create, update, delete, test, replay, rotateSecret |
| `client.admin.policies` | list, create, update, delete |
| `client.admin.forms` | list, create, update, delete, duplicate, submissions, analytics |
| `client.admin.automations` | list, get, create, update, delete, trigger, listRuns |
| `client.admin.roles` | list, get, create, update, delete, assignPermissions, assignUser, removeUser |
| `client.admin.governance` | get, update, simulate |
| `client.admin.dashboards` | list, get, create, update, delete, addWidget, updateWidget, deleteWidget |
| `client.admin.scheduledJobs` | list, get, create, update, delete, execute |
| `client.admin.savedReports` | list, get, create, update, delete, run, export |
| `client.admin.integrations` | list, get, create, update, delete, sync, listLogs |
| `client.admin.plugins` | listPlugins, installPlugin, functions CRUD, executeFunction |
| `client.accounting.*` | accounts, periods, currencies, exchangeRates, taxCodes, ledger, invoices, payments, banking, reports |
| `client.ai` | models, chat, generate, embeddings, search, index, moderate, describe, autoTag, summarise |
| `client.ai.conversations` | list, get, create, update, delete, chat |
| `client.owner` | login, signup, profile, mfa, passkeys, tenants, tickets |
| `client.reports` | pipeline, timeseries, leaderboard, funnel |
| `client.importExport` | import, export, exportStatus |
| `client.notifications` | list, unreadCount, markRead, markAllRead, getPreferences, updatePreferences |

## Error Handling

```typescript
import { ObjectifyError, NotFoundError, RateLimitError } from '@objectify/sdk';

try {
  await client.objects.get('type-id', 'nonexistent');
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log('Object not found');
  } else if (err instanceof RateLimitError) {
    console.log('Rate limited, retry later');
  } else if (err instanceof ObjectifyError) {
    console.log(err.status, err.code, err.message);
  }
}
```

## Configuration

```typescript
const client = new ObjectifyClient({
  baseUrl: 'https://api.objectify.cloud', // default
  timeout: 30_000,     // 30s default
  maxRetries: 2,       // retries on 429/5xx
  fetch: customFetch,  // custom fetch implementation
});
```

## License

MIT
