import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const youburro = {
   data: new SlashCommandBuilder()
      .setName('youburro')
      .setDescription('youburro'),
   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply({ embeds: [embedBuilder('', '')] });
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      return commandSlash.reply({ embeds: [embedBuilder('', '')] });
   },
};
