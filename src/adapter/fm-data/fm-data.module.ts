import { Module } from '@nestjs/common';
import { FmDataService } from './fm-data.service';
import { RegistriesService } from "./registries.service";
import { UserDataService } from "./user-data.service";


@Module({
  providers: [ FmDataService, UserDataService, RegistriesService ],
  exports  : [ FmDataService, UserDataService, RegistriesService ]
})
export class FmDataModule {
}
