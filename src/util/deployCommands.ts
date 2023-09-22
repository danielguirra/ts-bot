import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import dotenv from 'dotenv';

import { commands } from '../command/Builder';
import { logDate } from '../service/logDate';

dotenv.config();
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILD;
const rest = new REST({ version: '10' }).setToken(process.env.BOTTOKEN || '');

const allComands: any[] = [];

for (const key of commands) {
  allComands.push(key[1].data.toJSON());
}


export const deployCommand = async () => {
  if (typeof clientId !== 'string' || typeof guildId !== 'string') {
    throw new Error('verify envs')
  }

  try {
    await rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: allComands,
      });
    return console.log(logDate() + 'Os Comandos Foram Atualizados');
  } catch (message_2) {
    return console.error(message_2);
  }

}
