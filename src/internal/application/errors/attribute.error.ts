export class AttributeException extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'AttributeException';
  }
}
