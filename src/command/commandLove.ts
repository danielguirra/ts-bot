import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const love = {
  data: new SlashCommandBuilder().setName('love').setDescription('love'),
  async executeMessageCommand(commandMessage: Message) {
    return commandMessage.reply({ embeds: [embedBuilder('', '')] });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};
