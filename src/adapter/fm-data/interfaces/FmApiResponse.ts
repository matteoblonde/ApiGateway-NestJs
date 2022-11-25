/**
 * Api Response Type
 */
import { UserAuthData } from "./Auth";


export type UserLoginResponse = FmApiResponse<LayoutResponse<UserAuthData>>

export type SessionApiResponse = FmApiResponse<{token: string}>;

export interface FmApiResponse<TData> {
  response: TData;

  messages: FmApiResponseMessage[];

}

export interface LayoutResponse<TData> {
  data: {
    fieldData: TData;
  }[]
}

export type FmApiResponseMessage = SuccessfulMessage | ErrorMessage;

type SuccessfulMessage = { code: '0', message: 'OK' }
type ErrorMessage = { code: '1', message: 'ERROR' }
