import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const hour = {
  data: new SlashCommandBuilder().setName('hour').setDescription('hour'),
  async executeMessageCommand(commandMessage: Message) {
    return commandMessage.reply({ embeds: [embedBuilder('', '')] });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};
