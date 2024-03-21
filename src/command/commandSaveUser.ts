import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { UserDB } from '../database/users/user.class';
import { Command } from '../interfaces/Command';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const saveUser: Command = {
   data: new SlashCommandBuilder()
      .setName('salvabanco')
      .setDescription('salva o seu usuário no banco de dados do bot')

      .addStringOption((options) =>
         options
            .setName('cidade')
            .setDescription('sua cidade')
            .setRequired(true)
      )
      .addStringOption((options) =>
         options.setName('pais').setDescription('seu pais').setRequired(true)
      )
      .addBooleanOption((options) =>
         options
            .setName('clima')
            .setDescription('quer o clima diário?')
            .setRequired(true)
      ),

   async executeMessageCommand(commandMessage: Message) {
      commandMessage.reply('usa de /');
   },

   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const pais = commandSlash.options.getString('pais');
      const city = commandSlash.options.getString('cidade');
      const climateDaily = commandSlash.options.getBoolean('clima');
      const user = commandSlash.user;

      if (user && pais && city && climateDaily) {
         const result = await UserDB.saveNewUser({
            idDiscord: user.id,
            nickname: user.tag,
            username: user.username,
            city: city,
            country: pais,
            dollarDaily: true,
            climateDaily,
         });
         const resultString = `${result}`;
         return commandSlash.reply({
            embeds: [
               embedBuilder(
                  'Banco de Dados Capivareis',
                  resultString,
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
      return commandSlash.reply('Erro');
   },
};
