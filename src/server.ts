import express from 'express';

import { run } from '.';
import { env } from './envs';
import { logDate } from './util/logDate';

const port = env.PORT;
const app = express();

app.get('/', (_, res) => res.send('Servidor online'));

app.listen(port, () =>
   console.log(logDate() + 'O bot está rodando na porta ' + port)
);

run;
