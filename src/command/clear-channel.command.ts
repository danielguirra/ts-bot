import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { embedBuilder } from '../util/getEmbed';

export class ClearChannelCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('cls')
         .setDescription('apaga mensagem de ate 15 dias')
         .addIntegerOption((options) =>
            options
               .setName('value')
               .setDescription('valor a ser deletedo')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const numberMessageToDelete: number = parseInt(
         commandMessage.content.replace('*cls ', '')
      );
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (channel) {
         const del = await channel.bulkDelete(numberMessageToDelete);
         if (del) {
            commandMessage.reply('Foi apagado ' + numberMessageToDelete);
            const time = await new Promise((f) => setTimeout(f, 1000));
            channel.bulkDelete(1);
         }
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const numberMessageToDelete = commandSlash.options.getInteger('value');

      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (channel && numberMessageToDelete) {
         const del = await channel.bulkDelete(numberMessageToDelete);
         if (del) {
            commandSlash.reply('Foi apagado ' + numberMessageToDelete);
            const time = await new Promise((f) => setTimeout(f, 1000));
            channel.bulkDelete(1);
         }
      }
      return commandSlash.reply({ embeds: [embedBuilder('', '')] });
   }
}
