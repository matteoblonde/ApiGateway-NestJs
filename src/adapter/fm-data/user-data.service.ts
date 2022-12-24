import { Injectable } from "@nestjs/common";
import { single } from "rxjs";

import { DATABASES } from "./constants";
import { User } from "./interfaces/UserData/User";

import FmClient from "./lib/FmClient";


@Injectable()
export class UserDataService {

  /**
   * Get Users List
   */
  public async getAllUsers(): Promise<User[]> {

    /** Create the client */
    const client = FmClient.forDatabase(DATABASES.USER_DATA).layout('UtentiDto');

    const allUsersResponse = await client.get<User>({
      method: "GET"
    });

    // If no data, throw
    if (!allUsersResponse.response.data.length) {
      throw new Error('No Users');
    }

    return allUsersResponse.response.data.map(user => user.fieldData);
  }


  /**
   * Get Single User by ID
   */
  public async getSingleUser(id: string): Promise<User> {

    /** Create the client */
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

  }

}
