import axios from 'axios';
import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { embedBuilder } from '../util/getEmbed';
import { translateText } from '../util/translate';

export class AdviceCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('conselho').setDescription('Conselho aletório');
   }

   async executeMessageCommand(commandMessage: Message) {
      const avatar = commandMessage.author.displayAvatarURL({
         extension: 'png',
      });
      const tag = commandMessage.author.username;
      const advice = await this.getRandomAdvice();

      return commandMessage.reply({
         embeds: [embedBuilder('Conselho', advice, avatar, tag)],
      });
   }

   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const avatar = commandSlash.user.displayAvatarURL({ extension: 'png' });
      const tag = commandSlash.user.username;
      const advice = await this.getRandomAdvice();

      return commandSlash.reply({
         embeds: [embedBuilder('Conselho', advice, avatar, tag)],
      });
   }

   async getRandomAdvice() {
      const url = `https://api.adviceslip.com/advice`;
      const advice = await axios.get(url);
      const text = advice.data.slip.advice;
      const result = (await translateText(text)).text || '';
      return result;
   }
}
