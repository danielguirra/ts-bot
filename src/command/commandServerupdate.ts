import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { att } from '../../util/server/update';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const serverupdate = {
  data: new SlashCommandBuilder()
    .setName('serverupdate')
    .setDescription('serverupdate')
    .addStringOption(options =>
      options
        .setName('hour')
        .setDescription('hour for update')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    if (commandMessage.author.id === process.env.MODID)
      return commandMessage
        .reply('Comando de atualizar foi disparado')
        .then((m: Message) => {
          m.channel.send(att('10'));
        });
    else {
      return commandMessage.reply('Vc não é o Mr.Daniel');
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const hour = commandSlash.options.getString('hour');
    if (!hour) return;
    if (commandSlash.user.id === process.env.MODID)
      return commandSlash
        .reply({
          content: 'Comando de atualizar foi disparado',
          ephemeral: true,
        })
        .then(() => {
          commandSlash.channel?.send({ content: att(hour) });
        });
    else {
      return commandSlash.reply({
        content: 'Vc não é o Mr.Daniel',
        ephemeral: true,
      });
    }
  },
};
