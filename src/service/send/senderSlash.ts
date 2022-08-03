import { AttachmentBuilder, GuildTextBasedChannel, User } from 'discord.js';

export async function senderSlash(
  channel: GuildTextBasedChannel,
  canvas: AttachmentBuilder,
  user: User,
) {
  const messageToDelete = channel.lastMessageId;
  try {
    const sender = await channel.send({ files: [canvas] });
    if (sender && messageToDelete) {
      try {
        const messageDel = channel.messages.resolve(messageToDelete);
        if (messageDel) {
          await messageDel.delete();
          await channel.send(`${user}`);
        }
      } catch (error) {
        console.log('erro sender, messageDel' + process.report?.filename);
        return;
      }
    }
  } catch (error) {
    console.log('erro sender' + process.report?.filename);
    return;
  }
}
