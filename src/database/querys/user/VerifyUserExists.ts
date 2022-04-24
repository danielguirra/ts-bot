import axios from 'axios';
import dotenv from 'dotenv';

import { IUser } from '../../../interfaces/User';
import { headers } from '../headers';
import { urlFindOneApiMongoDb } from './urlFindOneApiMongoDb';

dotenv.config();

export async function verifyUserExists(user: IUser) {
  const data = JSON.stringify({
    collection: process.env.DBCOLLECTION,
    database: process.env.DBDATABASE,
    dataSource: process.env.DBSOURCE,
    filter: {
      id: user.id,
    },
  });

  try {
    const ver = await axios.post(urlFindOneApiMongoDb || '', data, {
      headers: headers,
    });
    if (ver.data.findIndex((f: string) => f === user.id)) {
      console.log('Verify executado retornou ' + ver);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }

  return false;
}
