import {
   Client,
   CommandInteraction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { env } from '../envs';
import { dailySender } from '../service/senders/dailySender';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

export class DailyCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('day').setDescription('envia tudo do dia');
   }

   async executeMessageCommand(commandMessage: Message) {
      const channels = await this.getChannels(commandMessage.client);

      const day = await dailySender(channels);
      if (day) {
         return commandMessage.reply({
            embeds: [
               embedBuilder(
                  'Tudo enviado',
                  `Tenha um bom dia ${commandMessage.author}`,
                  '',
                  '',
                  '',
                  '',
                  'Yellow'
               ),
            ],
         });
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const channels = await this.getChannels(commandSlash.client);

      const day = await dailySender(channels);
      if (day) {
         return commandSlash.reply({
            embeds: [
               embedBuilder(
                  'Tudo enviado',
                  `Tenha um bom dia ${commandSlash.user}`,
                  '',
                  '',
                  '',
                  '',
                  'Yellow'
               ),
            ],
         });
      }
   }

   async getChannels(client: Client) {
      const guildID = await client.guilds.fetch(env.GUILD || '');

      const climateObjc = {
         channelDaily: await channelItsGuildTextChannel(
            guildID.channels.resolve(env.DIA || '')
         ),
         channelLove: await channelItsGuildTextChannel(
            guildID.channels.resolve(env.LOVE || '')
         ),
         channelDolar: await channelItsGuildTextChannel(
            guildID.channels.resolve(env.DOLAR || '')
         ),
         channelClimate: await channelItsGuildTextChannel(
            guildID.channels.resolve(env.CLIMA || '')
         ),
      };
      return climateObjc;
   }
}
