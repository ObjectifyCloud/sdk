export class ObjectifyError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ObjectifyError';
  }

  static fromResponse(status: number, body: unknown): ObjectifyError {
    const b = body as Record<string, unknown>;
    const err = (typeof b?.error === 'object' && b?.error !== null ? b.error : {}) as Record<string, unknown>;
    const code = (err.code as string) || (b?.code as string) || 'unknown_error';
    const msg = (err.message as string) || (b?.message as string) || `HTTP ${status}`;
    const details = err.details || b?.details;
    if (status === 400 || status === 422) return new ValidationError(code, msg, details);
    if (status === 401) return new UnauthorizedError(msg);
    if (status === 403) return new ForbiddenError(msg);
    if (status === 404) return new NotFoundError(msg);
    if (status === 409) return new ConflictError(msg);
    if (status === 429) return new RateLimitError(msg);
    return new ObjectifyError(status, code, msg, details);
  }
}

export class ValidationError extends ObjectifyError {
  constructor(code: string, message: string, details?: unknown) {
    super(400, code, message, details);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends ObjectifyError {
  constructor(message = 'Unauthorized') {
    super(401, 'unauthorized', message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ObjectifyError {
  constructor(message = 'Forbidden') {
    super(403, 'forbidden', message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ObjectifyError {
  constructor(message = 'Not found') {
    super(404, 'not_found', message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends ObjectifyError {
  constructor(message = 'Conflict') {
    super(409, 'conflict', message);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends ObjectifyError {
  constructor(message = 'Rate limit exceeded') {
    super(429, 'rate_limit', message);
    this.name = 'RateLimitError';
  }
}
