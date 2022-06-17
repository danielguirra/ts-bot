import { CronJob } from 'cron';
import dotenv from 'dotenv';

import { client } from '../client/client';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { dateLastItsTrue } from '../util/dateLastItsTrue';
import { dailySender } from './dailySender';

dotenv.config();

const token = process.env.BOTTOKEN;
<<<<<<< HEAD
const hour: any = process.env.HORA || 0;
=======
const hour:any = process.env.HORA || 0
>>>>>>> 9b6347b8a5ca97e5fabcaac3a922ae3fffccc330
export const on = client.on('ready', async () => {
  const guildID = await client.guilds.fetch(process.env.GUILD || '');
  const channelDaily = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.DIA || ''),
  );
  const channelLove = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.LOVE || ''),
  );
  const channelDolar = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.DOLAR || ''),
  );
  const channelClimate = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.CLIMA || ''),
  );
  const lastMessageIdChannelClimate = channelClimate.lastMessageId;
  const lastMessageChannelClimate = await channelClimate.messages.fetch(
    lastMessageIdChannelClimate || '',
  );
  const dateLastMessageChannelClimateItsTrue = dateLastItsTrue(
    lastMessageChannelClimate,
  );
  if (dateLastMessageChannelClimateItsTrue) {
    console.log('Clima diário não enviado');
    dailySender({
      
      channelDolar,
      channelLove,
      channelDaily,
    });
  } else {
    console.log('Clima será enviado');
    new CronJob(`00 00 08 * * *`, () => {
      dailySender({
        
        channelDolar,
        channelLove,
        channelDaily,
      });
    }).start();
  }
});

client.login(token);
