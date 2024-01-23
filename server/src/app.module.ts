import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './products/product.module';
import { ProductService } from './products/product.service';
@Module({
  imports: [
    AuthenticationModule,
    ProductModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}` || 'SECRET',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticationService, ProductService],
})
export class AppModule {}
