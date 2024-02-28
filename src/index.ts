import UserModel from './database/users/user.model';
import { guildMemberAdd } from './service/guildMemberAdd';
import { interactionCreate } from './service/interactionCreate';
import { messageCreate } from './service/messageCreate';
import { on } from './service/on';
import { deployCommand } from './util/deployCommands';
// import { verifyUserItsOnline } from './util/verifyBossOnline';
import { verifyUserStatusLeagueofLegends } from './util/verifyUserPlayingGame';

export const run = {
  on,
  guildMemberAdd,
  deployCommand: deployCommand().then(() => { }),
  interactionCreate,
  messageCreate,
  verifyUserStatusLeagueofLegends,


};

UserModel.sync().then(() => {

})