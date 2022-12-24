import { Module } from '@nestjs/common';
import { FmDataService } from './fm-data.service';
import { UserDataService } from "./user-data.service";


@Module({
  providers: [ FmDataService, UserDataService ],
  exports  : [ FmDataService, UserDataService ]
})
export class FmDataModule {
}
