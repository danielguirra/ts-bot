import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';

import { commands } from '../command/commandBuilder';

dotenv.config();
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILD;
const rest = new REST({ version: '9' }).setToken(process.env.BOTTOKEN || '');

const allComands = [];
for (const key of commands) {
  allComands.push(key[1].data.toJSON());
}
export const deployCommand = rest
  .put(Routes.applicationGuildCommands(clientId || '', guildId || ''), {
    body: allComands,
  })
  .then(() => console.log('É O REGISTRAS'))
  .catch(console.error);
