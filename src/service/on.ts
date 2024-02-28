import { CronJob } from 'cron';
import { Channel } from 'discord.js';
import dotenv from 'dotenv';

import { client } from '../client/client';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { dailySender } from './dailySender';
import { logDate } from './logDate';
import { sendClimateToUserDM } from './send/sendClimate';

dotenv.config();

const token = process.env.BOTTOKEN;

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
    try {
      console.log(logDate() + 'Clima diário será enviado');
      new CronJob(`00 00 10 * * *`, () => {
        sendClimateToUserDM().then(() => {
          console.log(logDate() + 'Clima enviado')
        })

        dailySender({
          channelDolar,
          channelLove,
          channelDaily,
        }).then((v) => {
          if (v) console.log(logDate() + 'Foi enviado tudo')
        }).catch(v => {
          if (v) throw new Error(`${logDate()}  Erro ao enviar o as diárias tentando novamente`)
        });

      }).start();
    } catch (error) {
      console.log(error)
      try {
        await dailySender({
          channelDolar,
          channelLove,
          channelDaily,
        });
      } catch (error) {
        console.log(logDate + `Erro ao enviar novamente`);
      }
      console.log(logDate());
    }
  }
});

client.login(token);
