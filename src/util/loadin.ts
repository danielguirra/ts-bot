import { Channel } from 'diagnostics_channel';
import {
  CommandInteraction,
  GuildTextBasedChannel,
  Message,
  TextBasedChannel,
} from 'discord.js';

import { deleter } from './delLastMessageById';

export async function loadinCreator(
  command: Message | CommandInteraction,
  exec: func,
  sender?: TextBasedChannel,
) {
  command.reply('Carregando...').then(async () => {
    const last: TextBasedChannel | null = exec.channel;
    if (last && !sender) {
      const deletera = await deleter(last);
      const imageSender = await exec.func;
    }
    if (sender && last) {
      const deletera = await deleter(last);
      const imageSender = exec.func;
      sender.send({ attachments: [imageSender] });
    }
  });
}

interface func {
  channel: GuildTextBasedChannel | TextBasedChannel | null;
  func: any;
}
