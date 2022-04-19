const { exec } = require('child_process');
const fs = require('fs');
const dir = './bin';

//Verifica se não existe
if (!fs.existsSync(dir)) {
  //Efetua a criação do diretório
  fs.mkdirSync(dir);
}
exec('npx tsc', f => {
  if (f) console.log(f);
});
