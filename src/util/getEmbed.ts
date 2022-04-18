import { ColorResolvable, MessageEmbed } from 'discord.js';

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
  if (!authorAvatarURL) {
    authorAvatarURL =
      'https://cdn.discordapp.com/avatars/811255307673010246/8f145d7279847a9a6e46efd5ee3df6bf.webp';
  }
  if (!nickname) {
    nickname = 'Capivara do TI';
  }
  if (!thumbimage) {
    thumbimage = authorAvatarURL;
  }
  if (!color) {
    color = 'ORANGE';
  }

  const footer = {
    text: nickname,
    iconURL: authorAvatarURL,
  };

  let embed = new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
    .setThumbnail(thumbimage)
    .setImage(image || '')
    .setURL(url || '');
  return embed;
}
