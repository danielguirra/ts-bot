import { Message, SlashCommandBuilder } from 'discord.js';
import { embedBuilder } from '../../src/util/getEmbed';
import { Command } from '../interfaces/Command';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const hour: Command = {
   data: new SlashCommandBuilder()
      .setName('hour')
      .setDescription('retorna o horário de Brásilia'),
   async executeMessageCommand(commandMessage: Message) {
      var { getNameWeek, dia_sem, str_data, str_hora } = hourNow();
      return commandMessage.reply({
         embeds: [
            embedBuilder(
               'Hum no meu relógio são :',
               `Hoje é ${getNameWeek(dia_sem)}
       dia : ${str_data}
       são : ${str_hora}`
            ),
         ],
      });
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      var { getNameWeek, dia_sem, str_data, str_hora } = hourNow();
      return commandSlash.reply({
         embeds: [
            embedBuilder(
               'Hum no meu relógio são :',
               `Hoje é ${getNameWeek(dia_sem)}
       dia : ${str_data}
       são : ${str_hora}`
            ),
         ],
      });
   },
};

export function hourNow() {
   var data = new Date();
   var dia = data.getDate(); // 1-31
   var dia_sem = data.getDay(); // 0-6 (zero=domingo)
   var mes = data.getMonth(); // 0-11 (zero=janeiro)
   var ano4 = data.getFullYear(); // 4 dígitos
   var hora = data.getHours();
   var min = data.getMinutes(); // 0-59
   var seg = data.getSeconds(); // 0-59

   // Formata a data e a hora (note o mês + 1)
   var str_data = dia + '/' + (mes + 1) + '/' + ano4;
   var str_hora = hora + ':' + min + ':' + seg;
   return { getNameWeek, dia_sem, str_data, str_hora };
}

export const getNameWeek = (x: number) => {
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
