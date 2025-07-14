import { AuthService } from './auth.service';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import { Post, Controller, Body } from '@nestjs/common';
import { IsPublic } from 'src/decorators/public.decorator';
import { LoginReqDto } from './dto/login-req.dto';
import { LoginResDto } from './dto/login-res.dto';
import { RefreshReqDto } from './dto/refresh-req.dto';
import { RefreshResDto } from './dto/refresh-res.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { JwtPayloadType } from './types/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @IsPublic()
  @Post('email/login')
  async signIn(@Body() dto: LoginReqDto): Promise<LoginResDto> {
    return await this.authService.signin(dto);
  }
  @IsPublic()
  @Post('email/register')
  async register(@Body() dto: RegisterReqDto): Promise<RegisterResDto> {
    return await this.authService.register(dto);
  }

  @Post('logout')
  async logout(@GetCurrentUser() userToken: JwtPayloadType): Promise<void> {
    await this.authService.logout(userToken);
  }
  @IsPublic()
  @Post('refresh')
  async refresh(@Body() dto: RefreshReqDto): Promise<RefreshResDto> {
    return await this.authService.refreshToken(dto);
  }
}
