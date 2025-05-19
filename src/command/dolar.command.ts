import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { sendDolarDaily } from '../service/senders/sendDolarDaily';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

export class DolarCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('dolar').setDescription('retorna valor do dolar atual');
   }

   async executeMessageCommand(commandMessage: Message) {
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (!channel) return;
      const embed = await sendDolarDaily(channel, true);
      await commandMessage.reply(embed || '');
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (!channel) return;
      const embed = await sendDolarDaily(channel, true);
      await commandSlash.reply(embed || '');
   }
}
