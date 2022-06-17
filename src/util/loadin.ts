import { CommandInteraction, GuildTextBasedChannel, Message } from 'discord.js';

import { deleter } from './delLastMessageById';

export async function loadinCreator(
  command: Message | CommandInteraction,
  exec: image,
) {
  command.reply('Carregando...').then(async () => {
    const last = exec.channel;
    if (last) {
      const deletera = await deleter(last);
      const imageSender = await exec.image;
    }
  });
}

interface image {
  channel: GuildTextBasedChannel;
  image: any;
}
