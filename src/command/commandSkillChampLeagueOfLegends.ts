import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const skillchampleagueoflegends = {
  data: new SlashCommandBuilder()
    .setName('skillchampleagueoflegends')
    .setDescription('skillchampleagueoflegends'),
  async executeMessageCommand(commandMessage: Message) {
    return commandMessage.reply({ embeds: [embedBuilder('', '')] });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};
