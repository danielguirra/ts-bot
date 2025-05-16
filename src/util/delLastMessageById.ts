import { TextBasedChannel } from 'discord.js';

export async function deleter(
   channel: TextBasedChannel,
   idMessageToSearch: string
) {
   const messageForDelete = await channel.messages.fetch(idMessageToSearch);
   const itsdelete = await messageForDelete.delete();
   if (itsdelete) return true;
   return false;
}
