import { IsString } from "class-validator";


export class InterventionsDto {

  @IsString()
  id!: string;

}
