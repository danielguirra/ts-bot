import { Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { UserDB } from '../database/users/user.class';
import { Command } from './Builder';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const deleteUser: Command = {
   data: new SlashCommandBuilder()
      .setName('deletabanco')
      .setDescription('apaga seu usuário do banco'),

   async executeMessageCommand(commandMessage: Message) {
      const findUserByUserIdDiscord = await UserDB.getUserByUserIdDiscord(
         commandMessage.author.id
      );

      if (findUserByUserIdDiscord == 'Usuário não localizado ❌') {
         return commandMessage.reply({
            embeds: [
               embedBuilder(
                  'Banco de Dados Capivareis',
                  findUserByUserIdDiscord,
                  '',
                  '',
                  '',
                  '',
                  'Green'
               ),
            ],
         });
      }

      if (findUserByUserIdDiscord.id) {
         await UserDB.deleteUser(findUserByUserIdDiscord.id);
         return commandMessage.reply({
            embeds: [
               embedBuilder(
                  'Banco de Dados Capivareis',
                  'Usuário Apagadus ✅',
                  '',
                  '',
                  '',
                  '',
                  'Green'
               ),
            ],
         });
      }
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const findUserByUserIdDiscord = await UserDB.getUserByUserIdDiscord(
         commandSlash.user.id
      );
      if (findUserByUserIdDiscord == 'Usuário não localizado ❌') {
         return commandSlash.reply({
            embeds: [
               embedBuilder(
                  'Banco de Dados Capivareis',
                  findUserByUserIdDiscord,
                  '',
                  '',
                  '',
                  '',
                  'Green'
               ),
            ],

            ephemeral: true,
         });
      }

      if (findUserByUserIdDiscord.id) {
         await UserDB.deleteUser(findUserByUserIdDiscord.id);
         return commandSlash.reply({
            embeds: [
               embedBuilder(
                  'Banco de Dados Capivareis',
                  'Usuário Apagadus ✅',
                  '',
                  '',
                  '',
                  '',
                  'Green'
               ),
            ],

            ephemeral: true,
         });
      }
   },
};
