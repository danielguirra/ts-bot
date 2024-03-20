import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { Command } from './Builder';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const allSkinsLol: Command = {
   data: new SlashCommandBuilder()
      .setName('avatar')
      .setDescription(
         'Obtenha a URL do avatar do usuário selecionado ou do seu próprio avatar.'
      )
      .addUserOption((options) =>
         options
            .setName('user')
            .setDescription('usuário para retornar')
            .setRequired(true)
      ),
   async executeMessageCommand(commandMessage: Message) {
      const user = commandMessage.mentions.users.first();
      if (user) {
         return commandMessage.reply(
            user.displayAvatarURL({ extension: 'png' })
         );
      }
      return;
   },
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user = commandSlash.options.getUser('user');
      if (user) {
         return commandSlash.reply(user.displayAvatarURL({ extension: 'png' }));
      }
      return;
   },
};
