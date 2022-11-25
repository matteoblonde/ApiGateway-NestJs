import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { FmDataService } from "../../adapter/fm-data/fm-data.service";
import { UserLoginDto } from "./dto/UserLoginDto";


@Controller('auth')
export class AuthController {

  constructor(private readonly fmDataService: FmDataService) {
  }

  @Post('login')
  public async loginUser(
    @Body(ValidationPipe) loginData: UserLoginDto
  ): Promise<any> {
    return await this.fmDataService.validateUserLogin(loginData.username, loginData.password);
  }

}
