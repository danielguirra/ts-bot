import { GuildTextBasedChannel } from 'discord.js';

import { sendDaily } from './send/sendDaily';
import { sendDolarDaily } from './send/sendDolarDaily';
import { sendLoveMessageDaily } from './send/sendLoveMessageDaily';
import { userSender } from './users/userSender';

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
      await sendLoveMessageDaily(channelLove);
      await sendDaily(channelDaily);

      // await userSender(); precisa de uma nova api

      return true;
    } catch (error) {
      return false;
    }
  else {
    return false;
  }
}
