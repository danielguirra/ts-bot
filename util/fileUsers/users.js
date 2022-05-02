const fs = require('fs');
const a = [
  {
    id: '000000000000000',
    username: 'bot',
    discriminator: '00000000000000',
    guildUser: {
      id: '00000000000000000',
      name: '000000000000000000',
      members: 0,
    },
    hour: '8',
    cidade: 'city',
  },
];
function users() {
  try {
    const file = fs.readFileSync('./users.json');
    console.log('Arquivo users.json ok');
  } catch (error) {
    console.log('Será criado o arquivo users.json');
    try {
      fs.writeFileSync('./users.json', JSON.stringify(a), 'utf-8');
      console.log('Criado com sucesso');
    } catch (err) {
      console.log('erro ao criar users.json' + err);
    }
  }
}

exports.users = users;
