import {
   CommandInteraction,
   Message,
   SlashCommandBuilder,
   TextBasedChannel,
} from 'discord.js';

import { googleImage } from '../util/googleImage';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { Command } from '../interfaces/Command';

export const ime: Command = {
   data: new SlashCommandBuilder()
      .setName('image')
      .setDescription('image')
      .addStringOption((option) =>
         option.setName('text').setDescription('imagem').setRequired(true)
      ),
   async executeMessageCommand(commandMessage: Message) {
      const text = commandMessage.content.replace('*image ', '');
      if (text) {
         await sendSearch(text, commandMessage.channel, commandMessage);
      }
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const text = commandSlash.options.getString('text');
      if (text && commandSlash.channel) {
         await sendSearch(text, commandSlash.channel, commandSlash);
      }
   },
};

async function sendSearch(
   text: string,
   channel: TextBasedChannel,
   command: CommandInteraction | Message
) {
   const channela = await channelItsGuildTextChannel(channel);
   if (channela) {
      command.reply('Pesquisando ...').then(async () => {
         const id = channela.lastMessageId;
         if (id) {
            const mensage = await channela.messages.fetch(id);
            await googleImage(text, channela, mensage);
         }
      });
   }
}
