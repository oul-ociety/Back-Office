import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_key',  // ✅ Clé secrète du JWT
      signOptions: { expiresIn: '1h' }, // ✅ Durée de validité du token
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}