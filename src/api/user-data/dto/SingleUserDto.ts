import { IsString } from 'class-validator';


export class SingleUserDto {

  @IsString()
  id!: string;

}
