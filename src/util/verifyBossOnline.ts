import axios from 'axios';
import { Activity, Channel, User } from 'discord.js';

// import names from "../../data/json/nameslol.json";
// import { client } from "../client/client";
// import { hourNow } from "../command/commandHour";
// import { channelItsGuildTextChannel } from "./channelItsGuildTextChannel";
// import { embedBuilder } from "./getEmbed";

// export const verifyUserItsOnline = client.on(
//    "presenceUpdate",
//    async (oldPresence, newPresence) => {
//       if (oldPresence?.equals(newPresence)) return;
//       const guildId = process.env.GUILD;
//       if (guildId === undefined) return;
//       try {
//          if (
//             oldPresence &&
//             newPresence &&
//             !oldPresence.user?.bot &&
//             oldPresence.guild?.id === guildId
//          ) {
//             if (oldPresence?.userId) {
//                const userSend = await client.users.fetch(oldPresence.userId);
//                if (
//                   newPresence.activities.length > 0 &&
//                   newPresence.activities[0].details
//                ) {
//                   if (oldPresence.status === 'offline') {
//                      userSend.send('opa')
//                   }
//                }
//             }
//          }
//       } catch (error) {
//          console.error(error);
//       }
//    }
// );
