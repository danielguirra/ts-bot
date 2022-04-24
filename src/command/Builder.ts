import { Collection } from 'discord.js';

import { advice } from './commandAdvice';
import { avatar } from './commandAvatar';
import { ban } from './commandBan';
import { buzz } from './commandBuzz';
import { clearChannel } from './commandClearChannel';
import { climate } from './commandClimate';
import { climateDaily } from './commandClimateDaily';
import { coins } from './commandCoins';
import { confiaWill } from './commandConfiaWill';
import { day } from './commandDay';
import { help } from './commandHelp';
import { ping } from './commandPing';
import { saveUser } from './commandSaveUser';

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
  coins,
  confiaWill,
  day,
  saveUser,
};

export const commands: any = new Collection();

for (const key in allComands) {
  if (Object.prototype.hasOwnProperty.call(allComands, key)) {
    const element = allComands[key];
    commands.set(element.data.name, element);
  }
}
