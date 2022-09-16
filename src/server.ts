import dotenv from 'dotenv';
import express from 'express';

import { run } from '.';
import { logDate } from './service/logDate';

dotenv.config();
const port = process.env.PORT;
const app = express();

app.get('/', (req, res) => res.send('Servidor online'));

app.listen(port, () =>
  console.log(logDate() + 'O bot está rodando na porta ' + port),
);

run;
