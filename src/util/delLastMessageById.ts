import { GuildTextBasedChannel } from 'discord.js';

export async function deleter(
  channel: GuildTextBasedChannel,
): Promise<boolean> {
  const idMessage = await channel.lastMessageId;
  if (idMessage) {
    const messageForDelete = await channel.messages.fetch(idMessage);
    const itsdelete = await messageForDelete.delete();
    if (itsdelete) return true;
  }

  return false;
}
