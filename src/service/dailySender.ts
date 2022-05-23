import { GuildTextBasedChannel } from 'discord.js';

import { sendClimate } from './send/sendClimate';
import { sendDaily } from './send/sendDaily';
import { sendDolarDaily } from './send/sendDolarDaily';
import { sendLoveMessageDaily } from './send/sendLoveMessageDaily';
import { userSender } from './users/userSender';

export async function dailySender({
  channelDolar,
  channelLove,
  channelDaily,
}: {
  channelDolar: GuildTextBasedChannel;
  channelLove: GuildTextBasedChannel;
  channelDaily: GuildTextBasedChannel;
}): Promise<boolean> {
  try {
   await sendDolarDaily(channelDolar);
    await sendLoveMessageDaily(channelLove);
    await sendDaily(channelDaily);

    await userSender();

    return true;
  } catch (error) {
    return false;
  }
}
