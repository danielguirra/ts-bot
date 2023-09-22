import {
  CommandInteraction,
  GuildTextBasedChannel,
  Message,
  MessageCreateOptions,
  MessagePayload,
  TextBasedChannel,
} from 'discord.js';

import { deleter } from './delLastMessageById';

export async function loadinCreator(
  command: Message | CommandInteraction,
  exec: func,
  sender?: any,
) {
  command.reply('Carregando...').then(async () => {
    const last: TextBasedChannel | null = exec.channel;
    if (last && !sender) {
      await deleter(last);
      await exec.func;
    }
    if (sender && last) {
      await deleter(last);
      const imageSender: string | MessagePayload | MessageCreateOptions = exec.func;
      sender.send({ attachments: [imageSender] });
    }
  });
}

interface func {
  channel: GuildTextBasedChannel | TextBasedChannel | null;
  func: any;
}
