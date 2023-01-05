import { Module } from "@nestjs/common";
import { AdapterModule } from "../../adapter/adapter.module";
import { InterventionsController } from "./interventions.controller";


@Module({
  controllers: [ InterventionsController ],
  imports: [ AdapterModule ]
})
export class InterventionsModule {

}
