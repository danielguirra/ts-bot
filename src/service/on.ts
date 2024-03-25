import { CronJob } from 'cron';
import { Channel } from 'discord.js';

import { client } from '../client/client';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { logDate } from '../util/logDate';
import { userCheckSendClimate } from './senders/climateDMSender';
import { dailySender } from './senders/dailySender';
import { env } from '../envs';

const token = env.BOTTOKEN;

export const on = client.on('ready', async () => {
   const guildID = await client.guilds.fetch(env.GUILD || '');
   const channelDaily: Channel | null = await channelItsGuildTextChannel(
      guildID.channels.resolve(env.DIA || '')
   );
   const channelLove: Channel | null = await channelItsGuildTextChannel(
      guildID.channels.resolve(env.LOVE || '')
   );
   const channelDolar: Channel | null = await channelItsGuildTextChannel(
      guildID.channels.resolve(env.DOLAR || '')
   );
   if (channelDolar && channelLove && channelDaily) {
      try {
         console.log(logDate() + 'Clima diário será enviado');

         new CronJob(`00 00 10 * * *`, () => {
            userCheckSendClimate().then(() => {});
            dailySender({
               channelDolar,
               channelLove,
               channelDaily,
            })
               .then((v) => {
                  if (v) console.log(logDate() + 'Foi enviado tudo');
               })
               .catch((v) => {
                  if (v)
                     throw new Error(
                        `${logDate()}  Erro ao enviar o as diárias tentando novamente`
                     );
               });
         }).start();
      } catch (error) {
         console.error(error);
         try {
            await userCheckSendClimate();

            await dailySender({
               channelDolar,
               channelLove,
               channelDaily,
            });
         } catch (error) {
            console.error(logDate + `Erro ao enviar novamente`);
         }
         console.log(logDate());
      }
   }
});

client.login(token);
