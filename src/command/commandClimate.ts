// import {
//   CommandInteraction,
//   EmbedBuilder,
//   Interaction,
//   Message,
//   SlashCommandBuilder,
// } from 'discord.js';
// import { type } from 'os';

// import { sendClimateCurrentTime } from '../service/send/sendClimate';
// import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
// import { loadinCreator } from '../util/loadin';
// import { Command } from './Builder';

// /**
//  * Don't forget to export
//  * Não esqueça de exportar
//  * @param climate
//  * @danielguirra
//  */
// export const climate:Command = {
//   data: new SlashCommandBuilder()
//     .setName('clima')
//     .setDescription('retorna o clima da cidade fornecida')
//     .addStringOption(options =>
//       options
//         .setName('city')
//         .setDescription('cidade para retornar')
//         .setRequired(true),
//     ),
//   async executeMessageCommand(commandMessage: Message) {
//     const channelToSendClimate = await channelItsGuildTextChannel(
//       commandMessage.channel,
//     );
//     if (channelToSendClimate) {
//       const city: string = commandMessage.content.replace('*clima ', '');
//       const climate = await sendClimateCurrentTime(channelToSendClimate, city);
//       return climate;
//     }

//     return
//   },
//   async executeSlashCommand(commandSlash: CommandInteraction) {
//     if (!commandSlash.isChatInputCommand()) return;
//     const city: any = commandSlash.options.getString('city') || 'franca';
//     const channelToSendClimate = commandSlash.channel || undefined;
//     if (channelToSendClimate) {
//       return commandSlash.reply('Carregando...').then(message => {
//         const sender = loadinCreator(commandSlash, {
//           channel: channelToSendClimate,
//           func: sendClimateCurrentTime(city),
//         });
//       });
//     }

//     return
//   },
// };
