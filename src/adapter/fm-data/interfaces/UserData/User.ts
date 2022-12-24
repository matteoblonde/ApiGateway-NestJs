import type { FmBaseResponse } from '../generics';


export type FmSessionResponse = FmBaseResponse<{ token: string }>;

/* --------
 * Base Response
 * -------- */
export interface User {
  IdUtente: string;

  TxtTipoUtente: string;

  TxtUtente: string;

  PasswordUtente: string;

  IdTipoRuolo: string;

  IdTipoUtente: string;

  TxtAccountOperatore: string;

  ImgUtente: string;

}
