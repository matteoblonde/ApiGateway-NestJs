import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { Registry } from "../../adapter/fm-data/interfaces/Registries/Registry";
import { RegistriesService } from "../../adapter/fm-data/registries.service";
import { RegistryDto } from "./dto/RegistryDto";


@Controller('registries')
export class RegistriesController {

  constructor(private readonly registriesService: RegistriesService) {
  }


  /**
   * Get Registries List
   */
  @Get('all')
  public getRegistries(): Promise<any> {
    return this.registriesService.getAllRegistries();
  }


  /**
   * Get Single Registry by ID
   */
  @Post('registry')
  public getSingleRegistry(
    @Body(ValidationPipe) registryData: RegistryDto
  ): Promise<any> {
    return this.registriesService.getSingleRegistry(registryData.id)
  }

  /**
   * Create New Registry
   */
  @Post('new-registry')
  public newRegistry(
    @Body(ValidationPipe) registryData: Registry
  ): Promise<any> {
    return this.registriesService.newRegistry(registryData)
  }

}
