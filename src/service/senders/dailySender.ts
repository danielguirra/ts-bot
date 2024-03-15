import { GuildTextBasedChannel } from 'discord.js';

import { sendDolarDaily } from './sendDolarDaily';

export async function dailySender({
   channelDolar,
   channelLove,
   channelDaily,
}: {
   channelDolar: GuildTextBasedChannel | null;
   channelLove: GuildTextBasedChannel | null;
   channelDaily: GuildTextBasedChannel | null;
}): Promise<boolean> {
   if (channelDaily && channelDolar && channelLove)
      try {
         await sendDolarDaily(channelDolar);
         // await sendLoveMessageDaily(channelLove);recisa de uma nova api
         // await sendDaily(channelDaily);recisa de uma nova api
         return true;
      } catch (error) {
         console.error(error);
         return false;
      }
   else {
      return false;
   }
}
