const fs = require('fs');
const base64Data = "";
const arquivoSQLite = 'dump_decodificado.sqlite';

const bufferData = Buffer.from(base64Data, 'base64');


fs.writeFile(arquivoSQLite, bufferData, (err) => {
   if (err) {
      console.error('Erro ao escrever o arquivo SQLite:', err);
      return;
   }

   console.log('Arquivo SQLite decodificado salvo com sucesso:', arquivoSQLite);
});
