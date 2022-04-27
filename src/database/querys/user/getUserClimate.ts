import axios from 'axios';
import dotenv from 'dotenv';

import { headers } from '../headers';
import { urlFindApiMongoDb } from './urlFindApiMongoDb';

dotenv.config();

export async function getUserAllDatabase() {
  const data = JSON.stringify({
    collection: process.env.DBCOLLECTION,
    database: process.env.DBDATABASE,
    dataSource: process.env.DBSOURCE,
    filter: {},
  });

  try {
    const ver = await axios.post(urlFindApiMongoDb || '', data, {
      headers: headers,
    });

    const documents = ver.data.documents;

    return documents;
  } catch (error) {
    return console.log(error);
  }

  return false;
}
