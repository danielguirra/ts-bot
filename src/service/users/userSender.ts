import { client } from '../../client/client';
import { UserDB } from '../../database/users/user.class';
import { channelItsGuildTextChannel } from '../../util/channelItsGuildTextChannel';
import { dateLastItsTrue } from '../../util/dateLastItsTrue';
import { logDate } from '../logDate';
import { sendClimate, sendClimateToUserDM } from '../send/sendClimate';
import { users } from './usersDatabase';

export async function userCheckSendClimate() {
   const users = await UserDB.getUsersIDsToSendClimate();
   if (users.length < 1) return;
   const itsTimeToSendClimate: boolean[] = [];
   for (const user of users) {
      if (typeof user === 'string') throw new Error(user);
      const userDiscord = await client.users.fetch(user.idDiscord);
      const dmChannel = await userDiscord.createDM(true);

      const lastMessage = await dmChannel.messages.fetch(
         dmChannel.lastMessageId!
      );

      itsTimeToSendClimate.push(dateLastItsTrue(lastMessage));
   }
   const itsOnlyTrue = itsTimeToSendClimate.every((user) => user == true);
   if (itsOnlyTrue) {
      await sendClimateToUserDM();
   }
}
