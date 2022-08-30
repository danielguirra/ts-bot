import { CronJob } from 'cron';
import { Channel } from 'discord.js';
import dotenv from 'dotenv';

import { client } from '../client/client';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { dateLastItsTrue } from '../util/dateLastItsTrue';
import { dailySender } from './dailySender';

dotenv.config();

const token = process.env.BOTTOKEN;

const hour: any = process.env.HORA || 0;

export const on = client.on('ready', async () => {
  const guildID = await client.guilds.fetch(process.env.GUILD || '');
  const channelDaily: Channel | null = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.DIA || ''),
  );
  const channelLove: Channel | null = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.LOVE || ''),
  );
  const channelDolar: Channel | null = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.DOLAR || ''),
  );

  if (channelDolar && channelLove && channelDaily) {
    // const lastMessageIdChannelClimate = channelClimate.lastMessageId;
    // const lastMessageChannelClimate = await channelClimate.messages.fetch(
    //   lastMessageIdChannelClimate || '',
    // );
    // const dateLastMessageChannelClimateItsTrue = dateLastItsTrue(
    //   lastMessageChannelClimate,
    // );

    try {
      console.log('Clima diário será enviado');
      new CronJob(`59 59 07 * * *`, () => {
        dailySender({
          channelDolar,
          channelLove,
          channelDaily,
        });
        console.log('Clima diário foi enviado');
      }).start();
    } catch (error) {
      console.log(`Erro ao enviar o as diárias tentando novamente`);
      try {
        dailySender({
          channelDolar,
          channelLove,
          channelDaily,
        });
      } catch (error) {
        console.log(`Erro ao enviar novamente`);
      }
      console.log(error);
    }
  }
});

client.login(token);
