import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { getLeroLero } from '../util/lerolero';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const lerolero = {
  data: new SlashCommandBuilder()
    .setName('lerolero')
    .setDescription('lerolero'),
  async executeMessageCommand(commandMessage: Message) {
    return commandMessage.reply(embed);
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    return commandSlash.reply(embed);
  },
};

const embed = {
  embeds: [
    embedBuilder(
      'Lero Lero',
      getLeroLero(),
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU',
      'Ovelha',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU',
      '',
      '#ffffff',
    ),
  ],
};
