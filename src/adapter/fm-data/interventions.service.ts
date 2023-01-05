import { Injectable } from "@nestjs/common";

import { DATABASES } from "./constants";
import { InterventionsCalendar } from "./interfaces/Interventions/InterventionsCalendar";

import FmClient from "./lib/FmClient";


@Injectable()
export class InterventionsService {

  /**
   * Get Interventions List
   */
  public async getAllInterventions(): Promise<InterventionsCalendar[]> {

    /** Create FM client */
    const client = FmClient.forDatabase(DATABASES.INTERVENTIONS).layout('CalendarioInterventiDto');

    const allInterventionsCalendar = await client.get<InterventionsCalendar>({
      method: "GET"
    });

    // If no data, throw
    if (!allInterventionsCalendar.response.data.length) {
      throw new Error('No Users');
    }

    return allInterventionsCalendar.response.data.map(calInt => calInt.fieldData);
  }


  /**
   * Get Single User by ID
   */
  /*public async getSingleUser(id: string): Promise<User> {

    /!** Create FM client *!/
    const client = FmClient.forDatabase(DATABASES.USER_DATA).layout('UtentiDto');

    const singleUserResponse = await client.find<User>({
      data: {
        query: [
          {
            IdUtente: id
          }
        ]
      }
    });

    // If no data, throw
    if (!singleUserResponse.response.data.length) {
      throw new Error('No User with the given ID');
    }

    // If too many records, throw
    if (singleUserResponse.response.data.length > 1) {
      throw new Error('Too many identities');
    }

    return singleUserResponse.response.data[0].fieldData;

  }*/

}
