import { JwtModule } from '@nestjs/jwt';

export default JwtModule.register({
  global: true,
  secret: 'jwtConstants.secret',
  signOptions: { expiresIn: '60m' },
});
