import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const avatar = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(
      'Obtenha a URL do avatar do usuário selecionado ou do seu próprio avatar.',
    )
    .addUserOption(options =>
      options
        .setName('user')
        .setDescription('usuário para retornar')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first();
    if (user) {
      return commandMessage.reply(user.displayAvatarURL({ extension: 'png' }));
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const user: any = commandSlash.options.getUser('user');
    if (user) {
      return commandSlash.reply(user.displayAvatarURL({ extension: 'png' }));
    }
  },
};
