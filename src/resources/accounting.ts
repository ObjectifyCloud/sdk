import type { ObjectifyClient } from '../client.js';
import type { Account, JournalEntry, Invoice } from '../types.js';

export class AccountingResource {
  readonly accounts: AccountingAccountsResource;
  readonly periods: AccountingPeriodsResource;
  readonly currencies: AccountingCurrenciesResource;
  readonly exchangeRates: AccountingExchangeRatesResource;
  readonly taxCodes: AccountingTaxCodesResource;
  readonly ledger: AccountingLedgerResource;
  readonly invoices: AccountingInvoicesResource;
  readonly payments: AccountingPaymentsResource;
  readonly banking: AccountingBankingResource;
  readonly reports: AccountingReportsResource;

  constructor(private client: ObjectifyClient) {
    this.accounts = new AccountingAccountsResource(client);
    this.periods = new AccountingPeriodsResource(client);
    this.currencies = new AccountingCurrenciesResource(client);
    this.exchangeRates = new AccountingExchangeRatesResource(client);
    this.taxCodes = new AccountingTaxCodesResource(client);
    this.ledger = new AccountingLedgerResource(client);
    this.invoices = new AccountingInvoicesResource(client);
    this.payments = new AccountingPaymentsResource(client);
    this.banking = new AccountingBankingResource(client);
    this.reports = new AccountingReportsResource(client);
  }
}

class AccountingAccountsResource {
  constructor(private c: ObjectifyClient) {}
  list(q?: Record<string, string>): Promise<{ data: Account[] }> { return this.c.get('/v1/accounting/accounts', q); }
  get(id: string): Promise<Account> { return this.c.get(`/v1/accounting/accounts/${id}`); }
  create(d: Record<string, unknown>): Promise<Account> { return this.c.post('/v1/accounting/accounts', d); }
  update(id: string, d: Record<string, unknown>): Promise<Account> { return this.c.patch(`/v1/accounting/accounts/${id}`, d); }
  delete(id: string): Promise<void> { return this.c.delete(`/v1/accounting/accounts/${id}`); }
}

class AccountingPeriodsResource {
  constructor(private c: ObjectifyClient) {}
  list(): Promise<{ data: unknown[] }> { return this.c.get('/v1/accounting/periods'); }
  get(id: string): Promise<unknown> { return this.c.get(`/v1/accounting/periods/${id}`); }
  create(d: Record<string, unknown>): Promise<unknown> { return this.c.post('/v1/accounting/periods', d); }
  update(id: string, d: Record<string, unknown>): Promise<unknown> { return this.c.patch(`/v1/accounting/periods/${id}`, d); }
  delete(id: string): Promise<void> { return this.c.delete(`/v1/accounting/periods/${id}`); }
  close(id: string): Promise<unknown> { return this.c.post(`/v1/accounting/periods/${id}/close`); }
  reopen(id: string): Promise<unknown> { return this.c.post(`/v1/accounting/periods/${id}/reopen`); }
}

class AccountingCurrenciesResource {
  constructor(private c: ObjectifyClient) {}
  list(): Promise<{ data: unknown[] }> { return this.c.get('/v1/accounting/currencies'); }
  get(code: string): Promise<unknown> { return this.c.get(`/v1/accounting/currencies/${code}`); }
  create(d: Record<string, unknown>): Promise<unknown> { return this.c.post('/v1/accounting/currencies', d); }
  update(code: string, d: Record<string, unknown>): Promise<unknown> { return this.c.patch(`/v1/accounting/currencies/${code}`, d); }
  delete(code: string): Promise<void> { return this.c.delete(`/v1/accounting/currencies/${code}`); }
}

class AccountingExchangeRatesResource {
  constructor(private c: ObjectifyClient) {}
  list(q?: Record<string, string>): Promise<{ data: unknown[] }> { return this.c.get('/v1/accounting/exchange-rates', q); }
  get(id: string): Promise<unknown> { return this.c.get(`/v1/accounting/exchange-rates/${id}`); }
  create(d: Record<string, unknown>): Promise<unknown> { return this.c.post('/v1/accounting/exchange-rates', d); }
  delete(id: string): Promise<void> { return this.c.delete(`/v1/accounting/exchange-rates/${id}`); }
}

class AccountingTaxCodesResource {
  constructor(private c: ObjectifyClient) {}
  list(): Promise<{ data: unknown[] }> { return this.c.get('/v1/accounting/tax-codes'); }
  get(id: string): Promise<unknown> { return this.c.get(`/v1/accounting/tax-codes/${id}`); }
  create(d: Record<string, unknown>): Promise<unknown> { return this.c.post('/v1/accounting/tax-codes', d); }
  update(id: string, d: Record<string, unknown>): Promise<unknown> { return this.c.patch(`/v1/accounting/tax-codes/${id}`, d); }
  delete(id: string): Promise<void> { return this.c.delete(`/v1/accounting/tax-codes/${id}`); }
}

class AccountingLedgerResource {
  constructor(private c: ObjectifyClient) {}
  list(q?: Record<string, string>): Promise<{ data: JournalEntry[] }> { return this.c.get('/v1/accounting/journal-entries', q); }
  get(id: string): Promise<JournalEntry> { return this.c.get(`/v1/accounting/journal-entries/${id}`); }
  create(d: Record<string, unknown>): Promise<JournalEntry> { return this.c.post('/v1/accounting/journal-entries', d); }
  update(id: string, d: Record<string, unknown>): Promise<JournalEntry> { return this.c.patch(`/v1/accounting/journal-entries/${id}`, d); }
  delete(id: string): Promise<void> { return this.c.delete(`/v1/accounting/journal-entries/${id}`); }
  post(id: string): Promise<JournalEntry> { return this.c.post(`/v1/accounting/journal-entries/${id}/post`); }
  reverse(id: string): Promise<JournalEntry> { return this.c.post(`/v1/accounting/journal-entries/${id}/reverse`); }
  listRecurring(): Promise<{ data: unknown[] }> { return this.c.get('/v1/accounting/recurring-entries'); }
  getRecurring(id: string): Promise<unknown> { return this.c.get(`/v1/accounting/recurring-entries/${id}`); }
  createRecurring(d: Record<string, unknown>): Promise<unknown> { return this.c.post('/v1/accounting/recurring-entries', d); }
  updateRecurring(id: string, d: Record<string, unknown>): Promise<unknown> { return this.c.patch(`/v1/accounting/recurring-entries/${id}`, d); }
  deleteRecurring(id: string): Promise<void> { return this.c.delete(`/v1/accounting/recurring-entries/${id}`); }
  executeRecurring(id: string): Promise<unknown> { return this.c.post(`/v1/accounting/recurring-entries/${id}/execute`); }
}

class AccountingInvoicesResource {
  constructor(private c: ObjectifyClient) {}
  list(q?: Record<string, string>): Promise<{ data: Invoice[] }> { return this.c.get('/v1/accounting/invoices', q); }
  get(id: string): Promise<Invoice> { return this.c.get(`/v1/accounting/invoices/${id}`); }
  create(d: Record<string, unknown>): Promise<Invoice> { return this.c.post('/v1/accounting/invoices', d); }
  update(id: string, d: Record<string, unknown>): Promise<Invoice> { return this.c.patch(`/v1/accounting/invoices/${id}`, d); }
  delete(id: string): Promise<void> { return this.c.delete(`/v1/accounting/invoices/${id}`); }
  approve(id: string): Promise<Invoice> { return this.c.post(`/v1/accounting/invoices/${id}/approve`); }
  void(id: string): Promise<Invoice> { return this.c.post(`/v1/accounting/invoices/${id}/void`); }
}

class AccountingPaymentsResource {
  constructor(private c: ObjectifyClient) {}
  list(q?: Record<string, string>): Promise<{ data: unknown[] }> { return this.c.get('/v1/accounting/payments', q); }
  get(id: string): Promise<unknown> { return this.c.get(`/v1/accounting/payments/${id}`); }
  create(d: Record<string, unknown>): Promise<unknown> { return this.c.post('/v1/accounting/payments', d); }
  void(id: string): Promise<unknown> { return this.c.post(`/v1/accounting/payments/${id}/void`); }
}

class AccountingBankingResource {
  constructor(private c: ObjectifyClient) {}
  listAccounts(): Promise<{ data: unknown[] }> { return this.c.get('/v1/accounting/bank-accounts'); }
  getAccount(id: string): Promise<unknown> { return this.c.get(`/v1/accounting/bank-accounts/${id}`); }
  createAccount(d: Record<string, unknown>): Promise<unknown> { return this.c.post('/v1/accounting/bank-accounts', d); }
  updateAccount(id: string, d: Record<string, unknown>): Promise<unknown> { return this.c.patch(`/v1/accounting/bank-accounts/${id}`, d); }
  deleteAccount(id: string): Promise<void> { return this.c.delete(`/v1/accounting/bank-accounts/${id}`); }
  listTransactions(accountId: string, q?: Record<string, string>): Promise<{ data: unknown[] }> { return this.c.get(`/v1/accounting/bank-accounts/${accountId}/transactions`, q); }
  getTransaction(accountId: string, txId: string): Promise<unknown> { return this.c.get(`/v1/accounting/bank-accounts/${accountId}/transactions/${txId}`); }
  importTransactions(accountId: string, d: Record<string, unknown>): Promise<unknown> { return this.c.post(`/v1/accounting/bank-accounts/${accountId}/transactions/import`, d); }
  matchTransaction(accountId: string, txId: string, d: Record<string, unknown>): Promise<unknown> { return this.c.post(`/v1/accounting/bank-accounts/${accountId}/transactions/${txId}/match`, d); }
  reconcile(accountId: string, d: Record<string, unknown>): Promise<unknown> { return this.c.post(`/v1/accounting/bank-accounts/${accountId}/reconcile`, d); }
}

class AccountingReportsResource {
  constructor(private c: ObjectifyClient) {}
  trialBalance(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/trial-balance', q); }
  balanceSheet(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/balance-sheet', q); }
  profitAndLoss(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/profit-and-loss', q); }
  agedReceivables(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/aged-receivables', q); }
  agedPayables(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/aged-payables', q); }
  cashFlow(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/cash-flow', q); }
  taxReport(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/tax', q); }
  generalLedger(q?: Record<string, string>): Promise<unknown> { return this.c.get('/v1/accounting/reports/general-ledger', q); }
}
