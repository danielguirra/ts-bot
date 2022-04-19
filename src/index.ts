import { deployCommand } from './service/deployCommands';
import { guildMemberAdd } from './service/guildMemberAdd';
import { interactionCreate } from './service/interactionCreate';
import { messageCreate } from './service/messageCreate';
import { on } from './service/on';

export const run = {
  on,
  guildMemberAdd,
  deployCommand,
  interactionCreate,
  messageCreate,
};
