import axios from 'axios';
import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const pass = {
   data: new SlashCommandBuilder()
      .setName('pass')
      .setDescription('password encriptado em qrcode')
      .addIntegerOption((options) =>
         options
            .setMinValue(8)
            .setMaxValue(30)
            .setRequired(true)
            .setName('length')
            .setDescription('length for password')
      ),
   async executeMessageCommand(commandMessage: Message) {
      if (commandMessage.content.startsWith('*pass')) {
         const password = await axios.get(
            `http://140.238.179.202:4575/noqr/16`
         );
         return commandMessage.author.send({
            content: password.data,
         });
      }
      return;
   },
   async executeSlashCommand(commandSlash: Interaction) {
      if (!commandSlash.isChatInputCommand()) return;

      const size = commandSlash.options.getInteger('length');
      if (!size) return;
      const password = await axios.get(
         `http://140.238.179.202:4575/noqr/${size}`
      );
      return commandSlash.reply({
         content: password.data,
         ephemeral: true,
      });
   },
};
