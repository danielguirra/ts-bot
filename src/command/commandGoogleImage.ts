import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { googleImage } from '../../googleImage';

export const ime = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('image')
    .addStringOption(option =>
      option.setName('text').setDescription('imagem').setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const text = commandMessage.content.replace('*image ', '');
    googleImage(text, logResults);
    function logResults(error: any, results: any) {
      if (error) {
        console.log(error);
      } else {
        const response = results.__wrapped__[0][0].url;
        return commandMessage.reply(response);
      }
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const text = commandSlash.options.getString('text');
    if (text) {
      googleImage(text, logResults);
      function logResults(error: any, results: any) {
        if (error) {
          console.log(error);
        } else {
          const response = results.__wrapped__[0][0].url;
          return commandSlash.reply(response);
        }
      }
    }
  },
};
