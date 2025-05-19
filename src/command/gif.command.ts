import axios from 'axios';
import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

const tenor = process.env.TENORKEY;

export class GifCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('gif')
         .setDescription('procura no tenor por gif')
         .addStringOption((option) =>
            option
               .setName('text')
               .setDescription('digite algo')
               .setRequired(true)
         );
   }
   async executeMessageCommand(commandMessage: Message) {
      const gifText = commandMessage.content.replace('*gif ', '');
      const gif = await this.getGif(gifText);

      return commandMessage.reply(gif);
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const text = commandSlash.options.getString('text') || undefined;
      const gif = await this.getGif(text);

      return commandSlash.reply(gif);
   }

   async getGif(text: string = 'capivara') {
      let url = `https://g.tenor.com/v1/search?q=${text}&key=${tenor}&ContentFilter=G`;
      let response = (await axios.get(url)).data;
      const random = Math.floor(Math.random() * response.results.length);

      const result: string = response.results[random].url;
      return result;
   }
}
