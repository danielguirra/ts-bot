const fs = require('fs');
const a = fs.readFileSync('.envexemple');
function envs() {
  try {
    const file = fs.readFileSync('.env');
    console.log('Arquivo env ok');
  } catch (error) {
    console.log('Será criado o arquivo .env');
    try {
      fs.writeFileSync('.env', a, 'utf-8');
      console.log('Criado com sucesso');
    } catch (err) {
      console.log('erro ao criar .env ' + err);
    }
  }
}

exports.envs = envs;
