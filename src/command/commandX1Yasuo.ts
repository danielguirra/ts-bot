import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const x1yasuo = {
  data: new SlashCommandBuilder().setName('x1yasuo').setDescription('x1yasuo'),
  async executeMessageCommand(commandMessage: Message) {
    return commandMessage.reply({ embeds: [embedBuilder('', '')] });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};
