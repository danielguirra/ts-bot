import { GuildTextBasedChannel } from 'discord.js';

import { client } from '../client/client';
import { channelItsGuildTextChannel } from './channelItsGuildTextChannel';
import { sendClimate } from './sendClimate';
import { sendDaily } from './sendDaily';
import { sendDolarDaily } from './sendDolarDaily';
import { sendLoveMessageDaily } from './sendLoveMessageDaily';
import { users } from './usersDatabase';

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

    const usersObjc: any = await users();
    for (const user of usersObjc) {
      const userSend = await client.users.fetch(user.id);
      const userChannel = await channelItsGuildTextChannel(userSend);

      userSend.send(await sendClimate(userChannel, user.userClimate.city));
    }

    return true;
  } catch (error) {
    return false;
  }
}
