import axios from 'axios';
import striptags from 'striptags';

import { IPensador } from '../interfaces/PensadorMessage';

const urlPensador = 'https://www.pensador.com/blog.php';

export const pensador = {
  getFromCollection: async (collection: any) => {
    const co = await getByParams({
      t: 'co',
      username: collection,
    });
    return co;
  },
  getFromAmor: async () => {
    const amor = await getByParams({
      t: 'fa',
    });
    return amor;
  },
  getFromMotivacionais: async () => {
    const motivacao = await getByParams({
      t: 'fm',
    });
    return motivacao;
  },
  getFromSoltas: async () => {
    const soltas = await getByParams({
      t: 'fs',
    });
    return soltas;
  },
};

async function getByParams(params: any) {
  const get = await axios.get(urlPensador, { params: params });
  const res: any = get.data;

  return transf2Object(res);
}

function transf2Object(text = '') {
  text = striptags(
    text
      .replace('document.write("', '')
      .replace('");', '')
      .replace('&quot;', '')
      .replace('“', '')
      .replace('”', '')
      .replace('” ', ''),
    ['br'],
  );
  let arr = text.split('<br/>');
  let obj: IPensador = {
    message: arr[0],
    author: arr[1],
  };
  if (arr.length > 2) {
    obj = {
      message: arr[0],
      author: arr[2],
    };
  }
  return obj;
}
