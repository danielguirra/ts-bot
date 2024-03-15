import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { getLeroLero } from '../util/lerolero';
import { Command } from './Builder';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const lerolero: Command = {
   data: new SlashCommandBuilder()
      .setName('lerolero')
      .setDescription('lerolero'),
   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply({ embeds: embed(getLeroLero()).embeds });
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      return commandSlash.reply({ embeds: embed(getLeroLero()).embeds });
   },
};

const embed = (lero: string) => {
   return {
      embeds: [
         embedBuilder(
            'Lero Lero',
            lero,
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU',
            'Ovelha',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU',
            undefined,
            '#ffffff',
            undefined
         ),
      ],
   };
};
