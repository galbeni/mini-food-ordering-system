import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CurrentUserResponseDto } from './dto/current-user-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { AuthenticatedUser } from './decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new customer',
    description:
      'Creates a new customer account, hashes the password and returns a JWT access token.',
  })
  @ApiCreatedResponse({
    description: 'Customer registered successfully.',
    type: AuthResponseDto,
  })
  @ApiConflictResponse({
    description: 'User with this email already exists.',
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login with email and password',
    description:
      'Authenticates a customer and returns a JWT access token on success.',
  })
  @ApiCreatedResponse({
    description: 'Login successful.',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password.',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.login(loginDto);
  }

  @Get('who-am-i')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Return the currently authenticated user',
    description: 'Returns the customer profile linked to the JWT access token.',
  })
  @ApiOkResponse({
    description: 'Current user returned.',
    type: CurrentUserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid or expired access token.',
  })
  async whoAmI(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CurrentUserResponseDto> {
    return await this.authService.getCurrentUser(user.id);
  }
}
