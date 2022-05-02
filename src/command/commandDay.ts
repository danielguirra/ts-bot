import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { channelItsGuildTextChannel } from '../service/channelItsGuildTextChannel';
import { dailySender } from '../service/dailySender';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const day = {
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
            'YELLOW',
          ),
        ],
      });
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
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
            'YELLOW',
          ),
        ],
      });
    }
  },
};

async function getChannels(client: Client) {
  const guildID = await client.guilds.fetch(process.env.GUILD || '');

  const climateObjc = {
    channelDaily: await channelItsGuildTextChannel(
      guildID.channels.resolve(process.env.DIA || ''),
    ),
    channelLove: await channelItsGuildTextChannel(
      guildID.channels.resolve(process.env.LOVE || ''),
    ),
    channelDolar: await channelItsGuildTextChannel(
      guildID.channels.resolve(process.env.DOLAR || ''),
    ),
    channelClimate: await channelItsGuildTextChannel(
      guildID.channels.resolve(process.env.CLIMA || ''),
    ),
  };
  return climateObjc;
}
