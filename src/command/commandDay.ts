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
  data: new SlashCommandBuilder().setName('day').setDescription('envia tudo'),
  async executeMessageCommand(commandMessage: Message) {
    const daily = await sender(commandMessage.client);
    if (daily) {
      return commandMessage.reply({
        embeds: [embedBuilder('Sim', 'Pronto meu chapa')],
      });
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const daily = await sender(commandSlash.client);
    if (daily) {
      return commandSlash.reply({
        embeds: [embedBuilder('Sim', 'Pronto meu chapa')],
      });
    }
  },
};

async function sender(client: Client) {
  const guildID = await client.guilds.fetch(process.env.GUILD || '');
  const channelDaily = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.DIA || ''),
  );
  const channelLove = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.LOVE || ''),
  );
  const channelDolar = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.DOLAR || ''),
  );
  const channelClimate = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.CLIMA || ''),
  );
  const day = await dailySender({
    channelClimate,
    channelDolar,
    channelLove,
    channelDaily,
  });
  return day;
}
