import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';

import { commands } from '../command/Builder';

dotenv.config();
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILD;
const rest = new REST({ version: '9' }).setToken(process.env.BOTTOKEN || '');

const allComands = [];
for (const key of commands) {
  console.log(key[1].data);
  allComands.push(key[1].data.toJSON());
}
export const deployCommand = rest
  .put(Routes.applicationGuildCommands(clientId || '', guildId || ''), {
    body: allComands,
  })
  .then(() => console.log('Os Comandos Foram Atualizados'))
  .catch(console.error);
