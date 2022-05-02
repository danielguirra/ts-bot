import axios from 'axios';
import dotenv from 'dotenv';

import { IUser } from '../../../interfaces/User';
import { headers } from '../headers';
import { urlInsertOneApiMongoDb } from './urlInsertOneApiMongoDb';

dotenv.config();

export async function InsertOneUserApiMongoDb(userToSave: IUser) {
  const data = JSON.stringify({
    collection: process.env.DBCOLLECTION,
    database: process.env.DBDATABASE,
    dataSource: process.env.DBSOURCE,
    document: userToSave,
  });

  try {
    const save = await axios.post(urlInsertOneApiMongoDb || '', data, {
      headers: headers,
    });
    if (save) {
      console.log(save.data);
      return `Usuário ${userToSave.username}  salvo no banco com Sucesso!!`;
    }
  } catch (error) {
    return `Erro ao executar o post na Api para Salvar O Usuário \n
        Erro: ${error}`;
  }
}
