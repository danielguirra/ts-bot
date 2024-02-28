// import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

// import { sendClimate } from '../service/send/sendClimate';
// import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
// import { Command } from './Builder';

// /**
//  * Don't forget to export
//  * Não esqueça de exportar
//  * @param Command
//  * @danielguirra
//  */
// export const climateDaily: Command = {
//    data: new SlashCommandBuilder()
//       .setName('climadiario')
//       .setDescription('retorna o clima diário das 00:00 até as 21:00')
//       .addStringOption(options =>
//          options
//             .setName('cidade')
//             .setDescription('cidade a ser retornada')
//             .setRequired(true),
//       ),
//    async executeMessageCommand(commandMessage: Message) {
//       return
//    },
//    async executeSlashCommand(commandSlash) {
//       if (!commandSlash.isChatInputCommand()) return;
//       const city = commandSlash.options.get('cidade')
//       const channel = await channelItsGuildTextChannel(commandSlash.channel);
//       if (channel && city && 'value' in city && typeof city.value === 'string') {
//          const clima: any = await sendClimate(channel, city.value);

//          return commandSlash.reply({ embeds: [clima] });
//       }
//    },
// };
