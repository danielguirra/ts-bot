import { GuildTextBasedChannel } from 'discord.js';

import { sendDolarDaily } from './sendDolarDaily';
import { sendLoveMessageDaily } from './sendLoveMessageDaily';
import { sendDaily } from './sendDaily';
import { logDate } from '../../util/logDate';

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
         console.log(logDate() + 'Dolar enviado');
         await sendLoveMessageDaily(channelLove);
         console.log(logDate() + 'Lovely enviado');
         await sendDaily(channelDaily);
         console.log(logDate() + 'Motivacional enviado');
         return true;
      } catch (error) {
         console.error(error);
         return false;
      }
   else {
      return false;
   }
}
