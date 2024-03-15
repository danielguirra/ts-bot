import { TextBasedChannel } from 'discord.js';

export async function channelItsGuildTextChannel(
   channel: any
): Promise<TextBasedChannel> {
   const channelText: TextBasedChannel = channel;
   return channelText;
}
