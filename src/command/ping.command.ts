import {
   CommandInteraction,
   EmbedBuilder,
   Message,
   SlashCommandBuilder,
} from 'discord.js';
import https from 'https';
import { cpus, freemem, hostname, totalmem, uptime } from 'os';
import { performance } from 'perf_hooks';

export class PingCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('ts')
         .setDescription('Teste TypeScript com informações do sistema')
         .addStringOption((options) =>
            options.setName('teste').setDescription('Texto de teste')
         );
   }

   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;

      const input = commandSlash.options.getString('teste') || '';
      const embed = await this.getSystemEmbed(input);
      return commandSlash.reply({ embeds: [embed] });
   }

   async executeMessageCommand(commandMessage: Message) {
      const input = commandMessage.content.replace('*ts ', '');
      const embed = await this.getSystemEmbed(input);
      return commandMessage.reply({ embeds: [embed] });
   }

   private async getSystemEmbed(input: string): Promise<EmbedBuilder> {
      const uptimeSeconds = uptime();
      const uptimeString = this.formatUptime(uptimeSeconds);

      const cpuModel = cpus()[0].model;
      const cpuUsage = await this.getAverageUsage();
      const totalMemMB = (totalmem() / 1024 / 1024).toFixed(2);
      const freeMemMB = (freemem() / 1024 / 1024).toFixed(2);

      const discordPing = await this.pingDiscord();

      const embed = new EmbedBuilder()
         .setTitle('📊 Informações do Sistema')
         .setColor('Orange')
         .addFields(
            { name: '🖥️ Host', value: hostname(), inline: true },
            { name: '⏱️ Uptime', value: uptimeString, inline: true },
            { name: '💾 RAM Total', value: `${totalMemMB} MB`, inline: true },
            { name: '💡 RAM Livre', value: `${freeMemMB} MB`, inline: true },
            { name: '🧠 CPU', value: `${cpuModel} ${cpuUsage}`, inline: false },
            {
               name: '🏓 Ping com discord.com',
               value: `${discordPing}ms`,
               inline: true,
            }
         )
         .setFooter({ text: input || 'Executado com sucesso!' })
         .setTimestamp();

      return embed;
   }

   private formatUptime(seconds: number): string {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      return `${h}h ${m}m ${s}s`;
   }

   private pingDiscord(): Promise<number> {
      return new Promise((resolve) => {
         const start = performance.now();
         https
            .get('https://discord.com', (res) => {
               res.on('data', () => {});
               res.on('end', () => {
                  const end = performance.now();
                  resolve(Math.round(end - start));
               });
            })
            .on('error', () => resolve(-1));
      });
   }

   private async getAverageUsage(): Promise<string> {
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

      const cpusBefore = cpus();

      await delay(100);

      const cpusAfter = cpus();

      const usagePerCore = cpusAfter.map((cpu, i) => {
         const oldTimes = cpusBefore[i].times;
         const newTimes = cpu.times;

         const idleDelta = newTimes.idle - oldTimes.idle;
         const totalDelta =
            Object.values(newTimes).reduce((a, b) => a + b, 0) -
            Object.values(oldTimes).reduce((a, b) => a + b, 0);

         const usage = 1 - idleDelta / totalDelta;
         return usage;
      });

      const avgUsage =
         usagePerCore.reduce((a, b) => a + b, 0) / usagePerCore.length;
      return `${(avgUsage * 100).toFixed(2)}%`;
   }
}
