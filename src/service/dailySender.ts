import { GuildTextBasedChannel } from 'discord.js';

import { sendClimate } from './send/sendClimate';
import { sendDaily } from './send/sendDaily';
import { sendDolarDaily } from './send/sendDolarDaily';
import { sendLoveMessageDaily } from './send/sendLoveMessageDaily';
import { userSender } from './users/userSender';

export async function dailySender({
  channelClimate,
  channelDolar,
  channelLove,
  channelDaily,
}: {
  channelClimate: GuildTextBasedChannel;
  channelDolar: GuildTextBasedChannel;
  channelLove: GuildTextBasedChannel;
  channelDaily: GuildTextBasedChannel;
}): Promise<boolean> {
  try {
    sendDolarDaily(channelDolar);
    sendLoveMessageDaily(channelLove);
    sendClimate(channelClimate, 'franca');
    sendDaily(channelDaily);

    await userSender();

    return true;
  } catch (error) {
    return false;
  }
}
