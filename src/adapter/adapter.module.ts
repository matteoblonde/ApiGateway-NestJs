import { Module } from '@nestjs/common';
import { FmDataModule } from './fm-data/fm-data.module';


@Module({
  imports: [ FmDataModule ],
  exports: [ FmDataModule ]
})
export class AdapterModule {
}
