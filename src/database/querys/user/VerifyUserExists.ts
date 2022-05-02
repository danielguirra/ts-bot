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
    if (ver.data.document.id === user.id) {
      console.log('Verify executado retornou ' + ver.data.document.username);
      return true;
    }
  } catch (error) {
    console.log('Usuário novo sendo salvo no Banco ID:' + user.id);
    return false;
  }

  return false;
}
