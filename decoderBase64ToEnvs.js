const fs = require('fs');
const base64Data = ''; // Insira sua string base64 aqui

const arquivoJson = 'envs-decoder.json';

const bufferData = Buffer.from(base64Data, 'base64');


fs.writeFile(arquivoJson, bufferData, (err) => {
   if (err) {
      console.error('Erro ao escrever o arquivo Envs.json:', err);
      return;
   }

   console.log('Arquivo JSON decodificado salvo com sucesso:', arquivoJson);
});
