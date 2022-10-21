"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const guildMemberAdd_1 = require("./service/guildMemberAdd");
const interactionCreate_1 = require("./service/interactionCreate");
const messageCreate_1 = require("./service/messageCreate");
const on_1 = require("./service/on");
const deployCommands_1 = require("./util/deployCommands");
const verifyUserPlayingGame_1 = require("./util/verifyUserPlayingGame");
exports.run = {
    on: on_1.on,
    guildMemberAdd: guildMemberAdd_1.guildMemberAdd,
    deployCommand: deployCommands_1.deployCommand,
    interactionCreate: interactionCreate_1.interactionCreate,
    messageCreate: messageCreate_1.messageCreate,
    verifyUserStatus: verifyUserPlayingGame_1.verifyUserStatus,
};
