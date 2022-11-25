import { Module } from '@nestjs/common';
import { FmDataService } from './fm-data.service';

@Module({
  providers: [FmDataService],
  exports: [FmDataService]
})
export class FmDataModule {}
