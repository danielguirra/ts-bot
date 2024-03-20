import { Client, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { dailySender } from '../service/senders/dailySender';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { Command } from './Builder';
import { env } from '../envs';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const day: Command = {
   data: new SlashCommandBuilder()
      .setName('day')
      .setDescription('envia tudo do dia'),
   async executeMessageCommand(commandMessage: Message) {
      const channels = await getChannels(commandMessage.client);

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
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const channels = await getChannels(commandSlash.client);

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
   },
};

export async function getChannels(client: Client) {
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
