import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AdapterModule } from './adapter/adapter.module';


@Module({
  imports    : [ ApiModule, AdapterModule ],
  controllers: [],
  providers  : []
})
export class AppModule {
}
