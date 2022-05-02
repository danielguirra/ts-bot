import { GuildTextBasedChannel } from 'discord.js';

export async function channelItsGuildTextChannel(
  channel: any,
): Promise<GuildTextBasedChannel> {
  if (channel?.type === 'GUILD_TEXT') {
    const channelText: GuildTextBasedChannel = channel;
    return channelText;
  }
  return channel;
}
