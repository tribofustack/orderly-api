export class DatabaseException extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'DatabaseException';
  }
}
