import { Module } from '@nestjs/common';
import { FmDataModule } from "../../adapter/fm-data/fm-data.module";
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [FmDataModule]
})
export class AuthModule {}
