import { GuildTextBasedChannel, TextBasedChannel } from 'discord.js';

export async function deleter(
  channel: GuildTextBasedChannel | TextBasedChannel | null,
): Promise<boolean> {
  if (!channel) return false;
  const idMessage = channel.lastMessageId;
  if (idMessage) {
    const messageForDelete = await channel.messages.fetch(idMessage);
    const itsdelete = await messageForDelete.delete();
    if (itsdelete) return true;
  }

  return false;
}
