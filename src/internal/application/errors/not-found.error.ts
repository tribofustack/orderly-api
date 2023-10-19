export class NotFoundException extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'NotFoundException';
  }
}
