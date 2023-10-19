import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { v4 } from 'uuid';

export class Uuid implements IIdentifierGenerator {
  generate(): string {
    return v4();
  }
}
