import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto_auth/auth_user.dto';
import { LoginResponseObject } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() user: AuthUserDto): Promise<LoginResponseObject> {
    return await this.authService.authenticateUser(user);
  }

  // @Get() // this are changing servers state so cannot be get
  @Post('logout')
  logout(): Promise<string> {
    return this.authService.logoutUser();
  }

  // @Get() // this are changing servers state so cannot be get
  @Post('refresh')
  async refreshToken(): Promise<LoginResponseObject> {
    return await this.authService.refreshToken('refreshTokenFromClient');
  }
}
