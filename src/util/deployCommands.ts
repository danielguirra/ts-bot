import { REST } from '@discordjs/rest';
import {
   RESTPostAPIChatInputApplicationCommandsJSONBody,
   Routes,
} from 'discord.js';

import { commands } from '../command/build';
import { env } from '../envs';
import { logDate } from './logDate';

const clientId = env.CLIENTID;
const guildId = env.GUILD;
const rest = new REST({ version: '10' }).setToken(env.BOTTOKEN || '');

const allComands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

for (const key of commands) {
   allComands.push(key[1].toJSON());
}

export const deployCommand = async () => {
   if (typeof clientId !== 'string' || typeof guildId !== 'string') {
      throw new Error('verify envs');
   }

   try {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
         body: allComands,
      });
      return console.log(logDate() + 'Os Comandos Foram Atualizados');
   } catch (message_2) {
      return console.error(message_2);
   }
};
