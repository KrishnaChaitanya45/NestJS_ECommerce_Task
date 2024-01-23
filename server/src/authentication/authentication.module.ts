import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AuthenticationService, JwtService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
