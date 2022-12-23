import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserLoginDto } from './dto/UserLoginDto';
import { FmDataService } from '../../adapter/fm-data/fm-data.service';


@Controller('auth')
export class AuthController {

  constructor(private readonly fmDataService: FmDataService) {
  }


  @Post('login')
  public loginUser(
    @Body(ValidationPipe) loginData: UserLoginDto
  ): Promise<any> {
    return this.fmDataService.validateUserLogin(loginData.username, loginData.password);
  }

}
