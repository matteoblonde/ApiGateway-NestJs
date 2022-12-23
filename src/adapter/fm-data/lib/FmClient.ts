import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

import type { FmGetRecordsResponse } from '../interfaces/generics';
import type { FmSessionResponse } from '../interfaces/Auth';
import { encodeToBase64 } from '../../../utils';


export default class FmClient {


  /* --------
   * Default Data
   * -------- */
  private static readonly FM_ADMIN_USER: string = 'UTENTEWEB';

  private static readonly FM_ADMIN_PASSWORD: string = '5U1U3RDH';

  private static readonly FM_API_BASE_URL: string = 'https://serverfm.sandeza.com';

  private static readonly FM_TOKEN_EXP_TIME_MIN: number = 14;


  /* --------
   * Client Instance Pool
   * -------- */
  private static clients: Map<string, FmClient> = new Map<string, FmClient>();


  public static forDatabase(database: string): FmClient {
    /** Verify an instance of FmClient has already been created */
    if (FmClient.clients.has(database)) {
      return FmClient.clients.get(database) as FmClient;
    }

    /** If not, create a new instance related to requested database */
    const newClient = new FmClient(this.FM_API_BASE_URL, database, this.FM_ADMIN_USER, this.FM_ADMIN_PASSWORD);

    /** Add the client to pool */
    FmClient.clients.set(database, newClient);

    return newClient;
  }


  /* --------
   * Client Properties
   * -------- */
  private readonly _host: string;

  private readonly _username: string;

  private readonly _password: string;

  private readonly _database: string;

  private _layout: string | undefined;

  private _version = '1';


  /* --------
   * Token Utilities
   * -------- */
  private authToken: string | undefined;

  private authTimeout: NodeJS.Timeout = setTimeout(() => {
    this.tokenExpired = true;
  }, FmClient.FM_TOKEN_EXP_TIME_MIN * 60 * 1000);

  private tokenExpired = true;


  /* --------
   * Constructor
   * -------- */
  private constructor(host: string, database: string, username: string, password: string) {
    this._host = host;
    this._database = database;
    this._username = username;
    this._password = password;
  }


  /* --------
   * Public Getters
   * -------- */
  public get databaseUrl(): string {
    return `${this._host}/fmi/data/v${this._version}/databases/${this._database}`;
  }


  public get layoutUrl(): string {
    /** Assert layout has been defined */
    if (!this._layout) {
      throw new Error('Layout for FmClient is undefined');
    }

    return `${this.databaseUrl}/layouts/${this._layout}`;
  }


  /* --------
   * Public Modifiers
   * -------- */
  public database(name: string): FmClient {
    return FmClient.forDatabase(name);
  }


  public layout(name: string): FmClient {
    this._layout = name;
    return this;
  }


  public version(identifier: string): FmClient {
    this._version = identifier;
    return this;
  }


  /* --------
   * Auth Token Methods
   * -------- */

  private async getAuthToken(): Promise<string> {
    /** Get a new auth token only if previous one is expired or undefined */
    if (!this.authToken || this.tokenExpired) {
      try {
        const response = await axios.post<FmSessionResponse>(`${this.databaseUrl}/sessions`, {}, {
          headers: {
            Authorization: `Basic ${encodeToBase64(`${this._username}:${this._password}`)}`
          }
        });

        this.authToken = response.data.response.token;
        this.tokenExpired = false;
      }
      catch (error) {
        throw error;
      }
    }

    /** Refresh the auth token invalidator */
    this.authTimeout.refresh();

    /** Return the token */
    return this.authToken as string;
  }


  /* --------
   * Requests Methods
   * -------- */
  private async request<Response>(config: AxiosRequestConfig): Promise<Response> {
    try {
      /** Make the axios request using provided config */
      const response = await axios({
        baseURL: this.layoutUrl,
        ...config,
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.getAuthToken()}`,
          ...config.headers
        }
      });

      return response.data as Response;
    }
    catch (error) {
      // TODO
      throw error;
    }
  }


  public find<Response>(config: Omit<AxiosRequestConfig, 'baseURL' | 'url'>): Promise<FmGetRecordsResponse<Response>> {
    return this.request<FmGetRecordsResponse<Response>>({
      ...config,
      url: '/_find'
    });
  }

}
