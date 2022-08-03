import { client } from '../../client/client';
import { channelItsGuildTextChannel } from '../../util/channelItsGuildTextChannel';
import { sendClimate } from '../send/sendClimate';
import { users } from './usersDatabase';

export async function userSender() {
  const usersObjc: any = await users();
  for (const user of usersObjc) {
    const userSend = await client.users.fetch(user.id);
    const userChannel = await channelItsGuildTextChannel(userSend);

    if (userChannel) {
      const climateToSend = await sendClimate(
        userChannel,
        user.userClimate.city,
      );
      if (typeof climateToSend === 'object') {
        userSend.send(climateToSend);
      }
    }
  }
}
