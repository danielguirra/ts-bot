import {
   Guild,
   Interaction,
   Message,
   SlashCommandBuilder,
   User,
} from 'discord.js';
import dotenv from 'dotenv';

import { embedBuilder } from '../../src/util/getEmbed';
import { UserDatabase } from '../database/querys/user/user';
import { UserDB } from '../database/users/user.class';
import { IUser } from '../interfaces/User';

dotenv.config();
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const saveUser = {
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

   async executeSlashCommand(commandSlash: Interaction) {
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
async function saveUserFunc(guild: Guild, user: User, nickLol?: string) {
   if (!nickLol) nickLol = '';
   const userObjc: IUser = {
      id: user.id,
      guildId: guild.id,
      username: user.username,
      nickLol: nickLol,
   };

   const result = await new UserDatabase().saveNewUser(userObjc);
   return result;
}
