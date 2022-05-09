const { exec } = require('child_process');
const { users } = require('../util/fileUsers/users');
const fs = require('fs');
const { envs } = require('../util/fileEnv/env');
const dir = './bin';
const env = '/.env';
envs();
users();

if (!fs.existsSync(dir)) {
  //Efetua a criação do diretório

  fs.mkdirSync(dir);
}
exec('npx tsc', f => {
  if (f) console.log(f.message);
  else console.log('Build Ok');
});
