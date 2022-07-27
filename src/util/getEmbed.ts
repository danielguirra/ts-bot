import { ColorResolvable, EmbedBuilder } from 'discord.js';

export function embedBuilder(
  title: string,
  description: string,
  authorAvatarURL?: string,
  nickname?: string,
  thumbimage?: string,
  image?: string,
  color?: ColorResolvable,
  url?: string,
) {
  if (!authorAvatarURL || authorAvatarURL === '') {
    authorAvatarURL =
      'https://cdn.discordapp.com/avatars/811255307673010246/8f145d7279847a9a6e46efd5ee3df6bf.webp';
  }
  if (!nickname || nickname === '') {
    nickname = 'Capivara do TI';
  }
  if (!thumbimage || thumbimage === '') {
    thumbimage = authorAvatarURL;
  }
  if (!color) {
    color = 'Orange';
  }

  const footer = {
    text: nickname,
    iconURL: authorAvatarURL,
  };

  let embed = new EmbedBuilder()
    .setColor(color || null)
    .setTitle(title || null)
    .setDescription(description || null)
    .setFooter(footer || null)
    .setThumbnail(thumbimage || null)
    .setImage(image || null)
    .setURL(url || null);
  return embed;
}
