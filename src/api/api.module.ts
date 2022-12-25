import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RegistriesModule } from "./registries/registries.module";
import { UserDataModule } from "./user-data/user-data.module";


@Module({
  imports: [ AuthModule, UserDataModule, RegistriesModule ]
})
export class ApiModule {
}
