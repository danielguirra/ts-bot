const fs = require('fs');
const prompt = require('prompt');
const commandBase = fs.readFileSync('./util/commandBaseTs/command.ts', 'utf-8');
prompt.get(
  {
    properties: {
      name: {
        description: 'Name for Command',
      },
    },
  },
  function (err, result) {
    const local = `./src/command/command${result.name}.ts`;
    fs.writeFile(local, commandBase, err => {
      if (err) throw err;
      console.log('O arquivo foi criado! ' + local);
    });

    console.log('O comando foi ' + result.name);
  },
);
