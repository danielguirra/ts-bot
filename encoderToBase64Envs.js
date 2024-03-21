const fs = require('fs');
const arquivoSQLite = 'envs.json';
fs.readFile(arquivoSQLite, (err, data) => {
   if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
   }
   const base64Data = Buffer.from(data).toString('base64');

   console.log('Arquivo codificado em base64:');
   console.log(base64Data);
});
