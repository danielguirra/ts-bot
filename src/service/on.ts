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
  const channelClimate: Channel | null = await channelItsGuildTextChannel(
    guildID.channels.resolve(process.env.CLIMA || ''),
  );
  if (channelClimate && channelDolar && channelLove && channelDaily) {
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
      new CronJob(`00 35 08 * * *`, () => {
        dailySender({
          channelDolar,
          channelLove,
          channelDaily,
        });
      }).start();
    }
  } else {
    let erro = {
      chDaily: channelDaily,
      chDolar: channelDolar,
      chLove: channelLove,
      chClimate: channelClimate,
    };
    console.log(`Erro verificar variáveis de ambiente ou 'channel' `);
    return console.log(erro);
  }
});

client.login(token);
