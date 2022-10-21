const { exec } = require('child_process');

const fs = require('fs');

const dir = './bin';

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
