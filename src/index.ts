import { guildMemberAdd } from "./service/guildMemberAdd";
import { on } from "./service/on";
import { deployCommand } from './service/deployCommands'
import { interactionCreate } from "./service/interactionCreate";
import { messageCreate } from "./service/messageCreate";
export const run = {
    on,
    guildMemberAdd,
    deployCommand,
    interactionCreate,
    messageCreate
}
