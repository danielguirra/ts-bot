import { Collection, SlashCommandBuilder } from 'discord.js';

import { Command } from '../interfaces/Command';
import { logDate } from '../util/logDate';
import { Commands } from './commands.module';

export const commands = new Collection() as Collection<string, Command>;

console.log('\x1b[31m INICIANDO O CARREGAMENTO DE COMANDOS\x1b[0m');

for (const command of Commands) {
   try {
      commands.set(command.name, command);
      console.log(
         logDate(),
         '\x1b[33mCommando Carregado :\x1b[0m',
         `\x1b[31m${command.name.toLocaleUpperCase()}\x1b[0m`,
         '\x1b[32mOK\x1b[0m'
      );
   } catch (error) {
      console.error('\x1b[31mUM COMANDO FALHOU\x1b[0m');
      console.error(error, {
         command,
         expected: {
            data: SlashCommandBuilder,
            executeMessageCommand: Promise<Function>,
            executeSlashCommand: Promise<Function>,
         },
      });
      break;
   }
}
