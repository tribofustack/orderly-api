import { JwtService } from '@nestjs/jwt';
import { ITokenGenerator } from 'src/internal/application/ports/tokens/token-generator';

export class Jwt implements ITokenGenerator {
  constructor(private jwtService: JwtService) {}

  generate(payload: unknown): string {
    return this.jwtService.sign(
      { sub: payload },
      { secret: 'jwtConstants.secret' },
    );
  }
}
