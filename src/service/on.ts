import { CronJob } from 'cron';
import { Client, GuildTextBasedChannel } from 'discord.js';
import UserModel from '../database/users/user.model';
import { env } from '../envs';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { logDate } from '../util/logDate';
import { userCheckSendClimate } from './senders/climateDMSender';
import { dailySender } from './senders/dailySender';

export class DailyScheduler {
   private token: string;
   private client: Client;
   private guildId: string;
   private channelIds: { daily: string; love: string; dolar: string };

   private channels: {
      channelDaily: GuildTextBasedChannel | null;
      channelLove: GuildTextBasedChannel | null;
      channelDolar: GuildTextBasedChannel | null;
   } = {
      channelDaily: null,
      channelLove: null,
      channelDolar: null,
   };

   constructor(client: Client, token: string) {
      this.client = client;
      this.token = token;
      this.guildId = env.GUILD || '';
      this.channelIds = {
         daily: env.DIA || '',
         love: env.LOVE || '',
         dolar: env.DOLAR || '',
      };
   }

   public async init() {
      this.client.once('ready', async () => {
         console.log(logDate(), 'Bot pronto! Inicializando envio diário...');
         try {
            await this.fetchChannels();
            this.scheduleJob();
         } catch (error) {
            console.error(
               logDate(),
               'Erro na inicialização dos canais:',
               error
            );
            await this.tryImmediateSend();
         }
      });

      await this.client.login(this.token);
      await UserModel.sync();
   }

   private async fetchChannels() {
      const guild = await this.client.guilds.fetch(this.guildId);
      const { daily, love, dolar } = this.channelIds;

      this.channels.channelDaily = await channelItsGuildTextChannel(
         guild.channels.resolve(daily)
      );
      this.channels.channelLove = await channelItsGuildTextChannel(
         guild.channels.resolve(love)
      );
      this.channels.channelDolar = await channelItsGuildTextChannel(
         guild.channels.resolve(dolar)
      );

      const allChannelsReady =
         this.channels.channelDaily &&
         this.channels.channelLove &&
         this.channels.channelDolar;

      if (!allChannelsReady)
         throw new Error('Um ou mais canais não foram encontrados.');
   }

   private scheduleJob() {
      console.log(logDate(), 'Agendando tarefa diária às 10:00');
      new CronJob('00 00 10 * * *', async () => {
         await this.sendDailyMessages();
      }).start();
   }

   private async sendDailyMessages() {
      const { channelDaily, channelLove, channelDolar } = this.channels;
      if (!channelDaily || !channelLove || !channelDolar) return;

      try {
         await userCheckSendClimate();

         const result = await dailySender({
            channelDolar,
            channelLove,
            channelDaily,
         });

         if (result) {
            console.log(logDate(), 'Mensagens diárias enviadas com sucesso.');
         }
      } catch (error) {
         console.error(logDate(), 'Erro ao enviar mensagens diárias:', error);
      }
   }

   private async tryImmediateSend() {
      console.log(logDate(), 'Tentando envio imediato após falha...');
      try {
         //DM desabilitado devido limatação de banda de rede
         //await userCheckSendClimate();
         await dailySender({
            channelDolar: this.channels.channelDolar!,
            channelLove: this.channels.channelLove!,
            channelDaily: this.channels.channelDaily!,
         });
         console.log(logDate(), 'Envio imediato realizado com sucesso.');
      } catch (error) {
         console.error(logDate(), 'Erro no envio imediato:', error);
      }
   }
}
