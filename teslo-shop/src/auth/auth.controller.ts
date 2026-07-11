import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';
import { GetRawHeaders } from './decorators/get-rawHeaders.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { Auth } from './decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Get('/check-auth-status')
  @Auth(ValidRoles.admin)
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }


  @Get('/private')
  @UseGuards(AuthGuard('jwt'))
  testingPrivateRoute(
    @GetUser() user: User,
    @GetRawHeaders() rawHeaders: string[],
    //@GetUser('email') email: string,
    //@Req() request: Express.Request
  ){
    //console.log({request});
    return {
      ok: true,
      message: 'Hello World Private',
      user,
      //email,
      rawHeaders
    }
  }

  @Get('/private2')
  @RoleProtected(ValidRoles.superUser)
  //@SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user
    }
  }

  @Get('/private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user
    }
  }
}
