const fs = require('fs');
const prompt = require('prompt');
const commandBase = fs.readFileSync('./util/commandBaseTs/command.ts', 'utf-8');
const allComandsBase = fs.readFileSync('./src/command/allComands.ts', 'utf-8');
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
    const fileAllCommand = './src/command/allComands.ts';
    const name = result.name.toLowerCase();
    const variableName = commandBase.replace('newCommand', name);
    const setName = variableName.replace(`.setName('')`, `.setName('${name}')`);
    const setDescription = setName.replace(
      `setDescription('')`,
      `setDescription('${name}')`,
    );
    const remove = allComandsBase.substr(
      allComandsBase.length * -1,
      allComandsBase.length - 4,
    );

    fs.writeFile(
      fileAllCommand,
      remove.concat(`${name}};
    import {${name}} from './command${result.name}'`),
      err => {
        if (err) throw err;
        console.log('O arquivo atualizado! ' + fileAllCommand);
      },
    );

    fs.writeFile(local, setDescription, err => {
      if (err) throw err;
      console.log('O arquivo foi criado! ' + local);
    });

    console.log('O comando foi ' + result.name);
  },
);
