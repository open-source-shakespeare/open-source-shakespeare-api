export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParameterNotFoundError";
  }
}

export class DatabaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DatabaseError";
  }
}
