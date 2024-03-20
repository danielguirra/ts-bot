import express from 'express';

import { run } from '.';
import { logDate } from './util/logDate';
import { env } from './envs';

const port = env.PORT;
const app = express();

app.get('/', (req, res) => res.send('Servidor online'));

app.listen(port, () =>
   console.log(logDate() + 'O bot está rodando na porta ' + port)
);

run;
