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
      secret:
        'c4ae807915c0e423948fb7172b4ae0337ba61820b15ff91e89062f32342a0cd6285e3f4a7f36ebc589ece5e732445b0cd2980fb82f8d77da831c37ec7d3e563b',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticationService, ProductService],
})
export class AppModule {}
