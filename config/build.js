const { exec } = require('child_process');
const { users } = require('../util/fileUsers/users');
const fs = require('fs');
const { prompt } = require('prompt');
const { envs } = require('../util/fileEnv/env');
const dir = './bin';
const env = '/.env';
envs();
// users();

if (!fs.existsSync(dir)) {
  //Efetua a criação do diretório

  fs.mkdirSync(dir);
}
exec('npx tsc', f => {
  if (f) console.log(f.message);
  else console.log('Build Ok');
});
// console.log('Olá qual seu nome ?');
// process.stdin.on('data', f => {
//   console.log('Prazer ' + f);
//   console.log(process.resourceUsage());
// });
