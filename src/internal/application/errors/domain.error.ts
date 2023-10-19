export class DomainException extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'DomainException';
  }
}
