import { Collection, Interaction, Message } from 'discord.js';

import { advice } from './commandAdvice';
import { avatar } from './commandAvatar';
import { ban } from './commandBan';
import { buzz } from './commandBuzz';
import { clearChannel } from './commandClearChannel';
import { climate } from './commandClimate';
import { climateDaily } from './commandClimateDaily';
import { help } from './commandHelp';
import { ping } from './commandPing';

export class CommandBuilder {
  public Inteaction = Interaction.prototype;
  public Message = Message.prototype;
}

const allComands: any = {
  ping,
  climate,
  advice,
  help,
  avatar,
  ban,
  buzz,
  climateDaily,
  clearChannel,
};

export const commands: any = new Collection();

for (const key in allComands) {
  if (Object.prototype.hasOwnProperty.call(allComands, key)) {
    const element = allComands[key];
    commands.set(element.data.name, element);
  }
}
