import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdapterModule } from '../../adapter/adapter.module';


@Module({
  controllers: [ AuthController ],
  imports    : [ AdapterModule ]
})
export class AuthModule {
}
