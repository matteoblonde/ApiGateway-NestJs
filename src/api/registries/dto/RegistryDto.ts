import { IsString } from "class-validator";


export class RegistryDto {

  @IsString()
  id!: string;

}
