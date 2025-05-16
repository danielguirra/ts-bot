import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { Command } from '../../src/interfaces/Command';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const newCommand: Command = {
   data: new SlashCommandBuilder().setName('').setDescription(''),
   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply({ embeds: [embedBuilder('', '')] });
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      return commandSlash.reply({ embeds: [embedBuilder('', '')] });
   },
};
