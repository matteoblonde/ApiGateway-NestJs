import { Module } from '@nestjs/common';
import { AdapterModule } from '../../adapter/adapter.module';
import { UserDataController } from "./user-data.controller";


@Module({
  controllers: [ UserDataController ],
  imports    : [ AdapterModule ]
})
export class UserDataModule {
}
