import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { sendClimateCurrentTime } from '../service/senders/sendClimate';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

export class ClimateCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('clima')
         .setDescription('retorna o clima da cidade fornecida')
         .addStringOption((options) =>
            options
               .setName('cidade')
               .setDescription('cidade para retornar')
               .setRequired(true)
         )
         .addStringOption((options) =>
            options
               .setName('pais_ou_estado')
               .setDescription('pais para ajudar na pesquisa por padrao brasil')
               .setRequired(false)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply('Use de barra');
   }
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const city = commandSlash.options.getString('cidade') || 'franca';
      const country =
         commandSlash.options.getString('pais_ou_estado') || 'brazil';
      const channelToSendClimate = commandSlash.channel;
      if (channelToSendClimate) {
         return commandSlash.reply('Carregando...').then(async (msg) => {
            const channel = await channelItsGuildTextChannel(
               channelToSendClimate
            );
            if (channel) {
               await sendClimateCurrentTime(channel, city, undefined, country);
            }
         });
      }
   }
}
