import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const qrpass = {
   data: new SlashCommandBuilder()
      .setName('qrcodepass')
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
      return commandMessage.reply({
         content: 'use em slash',
      });
   },
   async executeSlashCommand(commandSlash: Interaction) {
      if (!commandSlash.isChatInputCommand()) return;

      const size = commandSlash.options.getInteger('length');
      if (!size) return;

      return commandSlash.reply({
         content: `http://140.238.179.202:4575/file/${size}`,
         ephemeral: true,
      });
   },
};
