import { Module } from '@nestjs/common';
import { AdapterModule } from '../../adapter/adapter.module';
import { RegistriesController } from "./registries.controller";


@Module({
  controllers: [ RegistriesController ],
  imports    : [ AdapterModule ]
})
export class RegistriesModule {
}
