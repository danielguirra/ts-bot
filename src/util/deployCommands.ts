import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import dotenv from 'dotenv';

import { commands } from '../command/Builder';
import { logDate } from '../service/logDate';

dotenv.config();
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILD;
const rest = new REST({ version: '10' }).setToken(process.env.BOTTOKEN || '');

const allComands = [];

for (const key of commands) {
  allComands.push(key[1].data.toJSON());
}
export const deployCommand = rest
  .put(Routes.applicationGuildCommands(clientId || '', guildId || ''), {
    body: allComands,
  })
  .then(() => console.log(logDate + 'Os Comandos Foram Atualizados'))
  .catch(console.error);
