import { Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../util/getEmbed';
import { Command } from './Builder';

export const ping: Command = {
   data: new SlashCommandBuilder()
      .setName('ts')
      .setDescription('teste tyscript slash')
      .addStringOption((options) =>
         options.setName('teste').setDescription('bananasplit')
      ),
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const result: string = commandSlash.options.getString('teste') || '';
      return commandSlash.reply({
         embeds: [embedBuilder('TypeScript', result)],
      });
   },
   async executeMessageCommand(commandMessage: Message) {
      const result: string = commandMessage.content.replace('*ts ', ' ');

      return commandMessage.reply({
         embeds: [embedBuilder('TypeScript', result)],
      });
   },
};
