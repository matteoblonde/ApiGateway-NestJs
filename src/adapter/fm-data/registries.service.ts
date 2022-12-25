import { Injectable } from "@nestjs/common";

import { DATABASES } from "./constants";
import { Registry } from "./interfaces/Registries/Registry";

import FmClient from "./lib/FmClient";


@Injectable()
export class RegistriesService {

  /**
   * Get Registries List
   */
  public async getAllRegistries(): Promise<Registry[]> {

    /** Create FM Client */
    const client = FmClient.forDatabase(DATABASES.REGISTRIES).layout('AnagraficheDto')

    const allRegistriesResponse = await client.get<Registry>({
      method: "GET"
    })

    // If no data, throw
    if (!allRegistriesResponse.response.data.length) {
      throw new Error('No Registries')
    }

    return allRegistriesResponse.response.data.map(registry => registry.fieldData);

  }


  /**
   * Get Single Registry by ID
   */
  public async getSingleRegistry(id: string): Promise<Registry> {

    /** Create FM client */
    const client = FmClient.forDatabase(DATABASES.REGISTRIES).layout('AnagraficheDto');

    const singleRegistryResponse = await client.find<Registry>({
      data: {
        query: [
          {
            IdAccount: id
          }
        ]
      }
    });

    // If no data, throw
    if (!singleRegistryResponse.response.data.length) {
      throw new Error('No Registry with the given ID');
    }

    // If too many records, throw
    if (singleRegistryResponse.response.data.length > 1) {
      throw new Error('Too many identities');
    }

    return singleRegistryResponse.response.data[0].fieldData;

  }


  /**
   * Create New Registry
   */
  public async newRegistry(registry: Registry): Promise<string> {

    /** Create FM Client */
    const client = FmClient.forDatabase(DATABASES.REGISTRIES).layout('AnagraficheDto');

    const newRegistryResponse = await client.create({
      data: {
        fieldData: {
          TxtAccount: registry.TxtAccount,
          CodiceAccount: registry.CodiceAccount,
          CodiceFiscale: registry.CodiceFiscale,
          MailAziendale: registry.MailAziendale
        }
      }
    });

    // If no data, throw
    if (!newRegistryResponse.response) {
      throw new Error('No Registry has been created');
    }

    console.log(newRegistryResponse);

   return newRegistryResponse.response.recordId;

  }

}
