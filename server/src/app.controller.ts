import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Login_User, Register_User } from './authentication/dto/USER.dto';
import { AuthenticationService } from './authentication/authentication.service';
import { ProductService } from './products/product.service';
import { AuthGuard } from './guards/auth.guard';
import { Add_To_Cart } from './products/dto/Cart.dto';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
  };
}

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthenticationService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  registerUser(@Body() user: Register_User) {
    return this.authService.registerUser(user);
  }

  @Get('/users')
  @UseGuards(AuthGuard)
  getUsers() {
    return this.authService.getUsers();
  }

  @Post('/login')
  loginUser(@Body() user: Login_User) {
    return this.authService.loginUser(user);
  }

  @Get('/products')
  getProducts(@Query() search) {
    return this.productService.getProducts(search);
  }

  @Get('/products/cart')
  @UseGuards(AuthGuard)
  getCart(@Req() req: RequestWithUser) {
    return this.productService.getCart(req['user'].id);
  }

  @Post('/products/update-cart')
  @UseGuards(AuthGuard)
  AddProductToCart(
    @Body() cartInput: Add_To_Cart,
    @Req() req: RequestWithUser,
  ) {
    return this.productService.AddProductToCart(cartInput, req['user'].id);
  }

  @Post('/products/remove-from-cart')
  @UseGuards(AuthGuard)
  RemoveProductFromCart(
    @Body() body: { product_id: number },
    @Req() req: RequestWithUser,
  ) {
    return this.productService.RemoveProductFromCart(
      body.product_id,
      req['user'].id,
    );
  }

  @Post('/checkout')
  @UseGuards(AuthGuard)
  checkout(@Req() req: RequestWithUser) {
    return this.productService.Order(req['user'].id);
  }

  @Get('/orders')
  @UseGuards(AuthGuard)
  getOrders(@Req() req: RequestWithUser) {
    return this.productService.getOrders(req['user'].id);
  }
}
