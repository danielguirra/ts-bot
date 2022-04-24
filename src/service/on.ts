import { CronJob } from 'cron';
import dotenv from 'dotenv';

import { client } from '../client/client';
import { channelItsGuildTextChannel } from './channelItsGuildTextChannel';
import { dailySender } from './dailySender';
import { dateLastItsTrue } from './dateLastItsTrue';

dotenv.config();

const token = process.env.BOTTOKEN;

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
      channelClimate,
      channelDolar,
      channelLove,
      channelDaily,
    });
  } else {
    console.log('Clima será enviado');
    new CronJob('00 00 11 * * *', () => {
      dailySender({
        channelClimate,
        channelDolar,
        channelLove,
        channelDaily,
      });
    }).start();
  }
});

client.login(token);
