import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { UserDataService } from "../../adapter/fm-data/user-data.service";
import { UserDto } from "./dto/UserDto";


@Controller('user-data')
export class UserDataController {

  constructor(private readonly userDataService: UserDataService) {
  }


  /**
   * Get Users List endpoint
   */
  @Get('all')
  public getUserS(): Promise<any> {
    return this.userDataService.getAllUsers();
  }


  /**
   * Get Single User by ID
   */
  @Post('user')
  public getSingleUser(
    @Body(ValidationPipe) userData: UserDto
  ): Promise<any> {
    return this.userDataService.getSingleUser(userData.id);
  }

}
