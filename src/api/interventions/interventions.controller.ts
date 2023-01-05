import { Controller, Get } from "@nestjs/common";
import { InterventionsService } from "../../adapter/fm-data/interventions.service";


@Controller('interventions')
export class InterventionsController {

  constructor(private readonly interventionsService: InterventionsService) {
  }


  /**
   * Get Interventions Calendar List
   */
  @Get('/calendar/all')
  public getInterventionsCalendar(): Promise<any> {
    return this.interventionsService.getAllInterventions();
  }

}
