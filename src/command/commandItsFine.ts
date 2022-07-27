import { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const itsfine = {
  data: new SlashCommandBuilder()
    .setName('itsfine')
    .setDescription('está tudo ótimo')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('cidadão que está bem mesmo no inferno'),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first();
    if (user) {
      const avatar = user.displayAvatarURL({ extension: 'png' });
      const image = await createCanvasItsFine(avatar);
      commandMessage.reply({ files: [image] });
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user = commandSlash.options.getUser('user');
    if (user) {
      const avatar = user.displayAvatarURL({ extension: 'png' });
      const image = await createCanvasItsFine(avatar);
      commandSlash.reply({ files: [image] });
    }
  },
};

async function createCanvasItsFine(avatar: string) {
  const canvas = createCanvas(640, 306);
  const context = canvas.getContext('2d');
  const background = await loadImage('https://i.im.ge/2021/09/24/TxnjQh.jpg');
  const avatarUser = await loadImage(avatar);
  context.drawImage(avatarUser, 240, 70, 90, 90);
  const attachment = new AttachmentBuilder(canvas.toBuffer(), {
    name: 'fine.png',
  });
  return attachment;
}
