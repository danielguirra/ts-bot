import { GuildTextBasedChannel } from 'discord.js';

import users from '../../users.json';
import { client } from '../client/client';
import { channelItsGuildTextChannel } from './channelItsGuildTextChannel';
import { sendClimate } from './sendClimate';
import { sendDaily } from './sendDaily';
import { sendDolarDaily } from './sendDolarDaily';
import { sendLoveMessageDaily } from './sendLoveMessageDaily';

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

    for (const user of users) {
      const userSend = await client.users.fetch(user.id);
      const userChannel = await channelItsGuildTextChannel(userSend);

      userSend.send(await sendClimate(userChannel, user.cidade));
    }

    return true;
  } catch (error) {
    return false;
  }
}
