import { guildMemberAdd } from './service/guildMemberAdd';
import { interactionCreate } from './service/interactionCreate';
import { messageCreate } from './service/messageCreate';
import { on } from './service/on';
import { deployCommand } from './util/deployCommands';
import { verifyUserStatus } from './util/verifyUserPlayingGame';

export const run = {
  on,
  guildMemberAdd,
  deployCommand,
  interactionCreate,
  messageCreate,
  verifyUserStatus,
};
