import { Interaction } from 'discord.js';

export function loadin(commandSlash: Interaction) {
  if (!commandSlash.isChatInputCommand()) return;
  return commandSlash.reply('Carregando');
}
