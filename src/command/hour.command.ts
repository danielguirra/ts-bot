import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';
import { embedBuilder } from '../util/getEmbed';

export class HourCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('hour').setDescription('retorna o horário de Brásilia');
   }
   getNameWeek = (x: number) => {
      return [
         'Domingo',
         'Segunda-Feira',
         'Terça-Feira',
         'Quarta-Feira',
         'Quinta-Feira',
         'Sexta-Feira',
         'Sábado',
      ][x];
   };

   async executeMessageCommand(commandMessage: Message) {
      commandMessage.reply(HourCommand.hourNow());
   }

   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;

      commandSlash.reply(HourCommand.hourNow());
   }

   public static hourNow() {
      const options: Intl.DateTimeFormatOptions = {
         timeZone: 'America/Sao_Paulo',
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         hour12: false,
      };

      const formatter = new Intl.DateTimeFormat('pt-BR', options);
      const parts = formatter.formatToParts(new Date());

      const getPart = (type: string) =>
         parts.find((p) => p.type === type)?.value || '00';

      const dia = getPart('day');
      const mes = getPart('month');
      const ano4 = getPart('year');
      const hora = getPart('hour');
      const min = getPart('minute');
      const seg = getPart('second');

      const str_data = `${dia}/${mes}/${ano4}`;
      const str_hora = `${hora}:${min}:${seg}`;

      const dia_sem = new Date().toLocaleDateString('pt-BR', {
         timeZone: 'America/Sao_Paulo',
         weekday: 'short',
      });

      return {
         embeds: [
            embedBuilder(
               'Hum no meu relógio são :',
               `Hoje é ${dia_sem}
       dia : ${str_data}
       são : ${str_hora}`
            ),
         ],
      };
   }
}
