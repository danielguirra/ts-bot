import { DMChannel, User } from 'discord.js';
import { client } from '../../client/client';
import { UserDB } from '../../database/users/user.class';
import { dateLastItsTrue } from '../../util/dateLastItsTrue';
import { sendClimateToUserDM } from '../send/sendClimate';

export type UserToSendClimate = {
   userDiscord: User;
   dmChannel: DMChannel;
   city: string;
   timeSendClimate: boolean;
};

export async function userCheckSendClimate() {
   const users = await UserDB.getUsersIDsToSendClimate();

   if (users.length < 1) return;
   const itsTimeToSendClimate: UserToSendClimate[] = [];
   for (const user of users) {
      if (typeof user === 'string') throw new Error(user);
      const userDiscord = await client.users.fetch(user.idDiscord);
      const dmChannel = await userDiscord.createDM(true);

      const lastMessage = await dmChannel.messages.fetch(
         dmChannel.lastMessageId!
      );

      itsTimeToSendClimate.push({
         userDiscord,
         dmChannel,
         city: user.city,
         timeSendClimate: dateLastItsTrue(lastMessage),
      });
   }
   const itsOnlyTrue = itsTimeToSendClimate.every(
      (user) => user.timeSendClimate == true
   );
   if (!itsOnlyTrue) {
      await sendClimateToUserDM(itsTimeToSendClimate);
   }
}
