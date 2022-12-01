import { client } from '../../client/client';
import { channelItsGuildTextChannel } from '../../util/channelItsGuildTextChannel';
import { logDate } from '../logDate';
import { sendClimate } from '../send/sendClimate';
import { users } from './usersDatabase';

export async function userSender() {
  try {
    const usersObjc: any = await users();
    for (const user of usersObjc) {
      const userSend = await client.users.fetch(user.id);
      const userChannel = await channelItsGuildTextChannel(userSend);

      if (!userChannel) throw new Error('User Channel its null')

      const climateToSend = await sendClimate(
        userChannel,
        user.userClimate.city,
      );
      if (typeof climateToSend != 'object')
        throw new Error(`${logDate()} 'No climate to send' 'climateToSend its : ${climateToSend}`);
      userSend.send(climateToSend);
    }
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}
