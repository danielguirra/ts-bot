import { CommandInteraction, GuildTextBasedChannel, Message, TextBasedChannel } from 'discord.js';

import { deleter } from './delLastMessageById';

export async function loadinCreator(
  command: Message | CommandInteraction,
  exec: image,
) {
  command.reply('Carregando...').then(async () => {
    const last: TextBasedChannel | null = exec.channel;
    if (last) {
      const deletera = await deleter(last);
      const imageSender = await exec.image;
    }
  });
}

interface image {
  channel: GuildTextBasedChannel | TextBasedChannel | null;
  image: any;
}
