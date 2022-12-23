import { Injectable } from '@nestjs/common';

import type { UserAuthData } from './interfaces/Auth';

import { DATABASES } from './constants';

import FmClient from './lib/FmClient';


@Injectable()
export class FmDataService {

  /**
   * Check username and password and return the UserId
   * @param username
   * @param password
   */
  public async validateUserLogin(username: string, password: string): Promise<string> {
    /** Create the client */
    const client = FmClient.forDatabase(DATABASES.USER_DATA).layout('UtenteLoginDto');

    const userDataResponse = await client.find<UserAuthData>({
      data: {
        query: [
          {
            PasswordUtente: password,
            TxtUtente     : username
          }
        ]
      }
    });

    // If no data, throw
    if (!userDataResponse.response.data.length) {
      throw new Error('No Auth');
    }

    // If too many records, throw
    if (userDataResponse.response.data.length > 1) {
      throw new Error('Too many identities');
    }

    // Return the user id
    return userDataResponse.response.data[0].fieldData.IdUtente;
  }

}
