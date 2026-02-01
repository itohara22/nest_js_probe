import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  login(): string {
    return 'login';
  }

  // @Get() // this are changing servers state so cannot be get
  @Post('logout')
  logout(): string {
    return 'logout';
  }

  // @Get() // this are changing servers state so cannot be get
  @Post('refresh')
  refreshToken(): string {
    return 'refreshed';
  }
}
