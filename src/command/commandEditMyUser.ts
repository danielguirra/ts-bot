import { CommandInteraction, Message, SlashCommandBuilder } from "discord.js";

import { embedBuilder } from "../../src/util/getEmbed";
import { Command } from "./Builder";
import { UserDB } from "../database/users/user.class";

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const editUser: Command = {
   data: new SlashCommandBuilder()
      .setName("editabanco")
      .setDescription("edita seu usuário do banco")

      .addStringOption((options) =>
         options
            .setName("cidade")
            .setDescription("sua cidade")
            .setRequired(true)
      ).addStringOption((options) =>
         options
            .setName("pais")
            .setDescription("seu pais")
            .setRequired(true)
      ).addBooleanOption((options) =>
         options
            .setName("clima")
            .setDescription("quer o clima diário?")
            .setRequired(true)
      )
   ,
   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply('usa comando em /')

   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const pais = commandSlash.options.getString("pais");
      const city = commandSlash.options.getString("cidade");
      const climateDaily = commandSlash.options.getBoolean("clima");
      const user = commandSlash.user;


      if (user && pais && city && climateDaily) {
         const result = await UserDB.updateUserInfo({
            idDiscord: user.id,
            nickname: user.tag,
            username: user.username,
            city: city,
            country: pais,
            dollarDaily: true,
            climateDaily
         })
         const resultString = `${result}`;
         return commandSlash.reply({
            embeds: [
               embedBuilder(
                  "Banco de Dados Capivareis",
                  resultString,
                  "",
                  "",
                  "",
                  "",
                  "Green"
               ),
            ],
            ephemeral: true
         },);
      }
      return commandSlash.reply('Erro');
   }
}
