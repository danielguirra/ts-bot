import { Collection, Interaction, Message } from 'discord.js';

import { advice } from './commandAdvice';
import { climate } from './commandClimate';
import { ping } from './commandPing';

export class CommandBuilder {
  public Inteaction = Interaction.prototype;
  public Message = Message.prototype;
}

const allComands: any = {
  ping,
  climate,
  advice,
};

export const commands: any = new Collection();

for (const key in allComands) {
  if (Object.prototype.hasOwnProperty.call(allComands, key)) {
    const element = allComands[key];
    commands.set(element.data.name, element);
  }
}
