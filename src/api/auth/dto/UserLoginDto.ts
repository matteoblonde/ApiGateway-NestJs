import { IsString, MaxLength, MinLength } from "class-validator";


export class UserLoginDto {

  @IsString()
  @MinLength(4)
  @MaxLength(64)
  username!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(64)
  password!: string;
}
