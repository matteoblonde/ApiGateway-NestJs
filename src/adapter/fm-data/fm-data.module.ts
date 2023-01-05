import { Module } from '@nestjs/common';
import { FmDataService } from './fm-data.service';
import { InterventionsService } from "./interventions.service";
import { RegistriesService } from "./registries.service";
import { UserDataService } from "./user-data.service";


@Module({
  providers: [ FmDataService, UserDataService, RegistriesService, InterventionsService ],
  exports  : [ FmDataService, UserDataService, RegistriesService, InterventionsService ]
})
export class FmDataModule {
}
