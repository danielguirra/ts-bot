import { Collection } from 'discord.js';

import { allComands } from './allComands';

export const commands: any = new Collection();

for (const key in allComands) {
  if (Object.prototype.hasOwnProperty.call(allComands, key)) {
    const element = allComands[key];
    commands.set(element.data.name, element);
  }
}
