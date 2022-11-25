import { Injectable } from '@nestjs/common';

import axios from 'axios';
import { DATABASES } from "./constants";
import { UserLoginResponse } from "./interfaces/FmApiResponse";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeCache = require('node-cache');

/**
 * Caching Object
 */
const authTokenCache = new NodeCache({
  checkperiod: 30,
  deleteOnExpire: true,
});

@Injectable()
export class FmDataService {
  /**
   * Some configurations Params
   */
  private static readonly FM_ADMIN_USER: string = 'UTENTEWEB'; // process.env.<<Variable su CapRover>>

  private static readonly FM_ADMIN_PASSWORD: string = '5U1U3RDH';

  private static readonly FM_ADMIN_BASE_URL: string = 'serverfm.sandeza.com';

  private static readonly  FM_TOKEN_EXP_TIME_MIN: number = 14;

  /**
   * Internal Variables
   */
  private readonly _client = axios.create({
    baseURL: `https://${FmDataService.FM_ADMIN_BASE_URL}/fmi/data/vLatest/databases`,
  });

  /**
   * Return FileMaker Server Token to make Api Request
   * Token will be cached t be reused
   * @private
   */
  private async getToken(database: string): Promise<string> {

    // Check if a valid token has already been cached
    if (authTokenCache.has(database)) {
      return authTokenCache.get(database)
    }

    // Make an api request to session endpoint to generate FileMaker Token
    try {
      const response = await this._client.post(`/${database}/sessions`,{}, {
        headers: {
          Authorization: 'Basic ' + btoa(`${FmDataService.FM_ADMIN_USER}:${FmDataService.FM_ADMIN_PASSWORD}`)
        },
      });

      // Cache the Token
      authTokenCache.set(database, response.data.response.token, FmDataService.FM_TOKEN_EXP_TIME_MIN * 60);

      // Return the token
      return response.data.response.token;
    }
    catch (e) {
      throw e;
    }
  }


  /**
   * Check username and password and return the login
   * @param username
   * @param password
   */
  public async validateUserLogin(username: string, password: string): Promise<string> {

    // Get the Token
    const token = await this.getToken(DATABASES.USER_DATA);

    // Search the user on database layout
    const userDataResponse = await this._client.post<UserLoginResponse>(`${DATABASES.USER_DATA}/layouts/UtenteLoginDto/_find`, {
      query: [
        {
          PasswordUtente: password,
          TxtUtente: username
        }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // If no data, throw error
    if (!userDataResponse.data.response.data.length) {
      throw new Error('No Auth')
    }

    // If too many records, throw
    if (userDataResponse.data.response.data.length > 1) {
      throw new Error('Too many identities')
    }

    return userDataResponse.data.response.data[0].fieldData.IdUtente;

  }

}
