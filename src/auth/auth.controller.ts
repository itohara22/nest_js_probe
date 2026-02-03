import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto_auth/auth_user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login( @Body() user: AuthUserDto): Promise<string> {
    return  await this.authService.authenticateUser(user);
  }

  // @Get() // this are changing servers state so cannot be get
  @Post('logout')
  logout(): string {
    return this.authService.logoutUser();
  }

  // @Get() // this are changing servers state so cannot be get
  @Post('refresh')
  refreshToken(): string {
    return this.authService.refreshToken();
  }
}
