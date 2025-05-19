import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { sendClimate } from '../service/senders/sendClimate';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

export class ClimateOnDayCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('climadiario')
         .setDescription('retorna o clima diário das 00:00 até as 21:00')
         .addStringOption((options) =>
            options
               .setName('cidade')
               .setDescription('cidade a ser retornada')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply('Use por barra');
   }
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const city = commandSlash.options.get('cidade');
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (
         channel &&
         city &&
         'value' in city &&
         typeof city.value === 'string'
      ) {
         const clima = await sendClimate(city.value);
         if (clima && typeof clima !== 'string') {
            return commandSlash.reply({ embeds: clima.embeds });
         }
      }
   }
}
