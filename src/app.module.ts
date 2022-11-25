import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AdapterModule } from './adapter/adapter.module';

@Module({
  imports: [ApiModule, AdapterModule],
})
export class AppModule {}
