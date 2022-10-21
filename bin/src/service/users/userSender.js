"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSender = void 0;
const client_1 = require("../../client/client");
const channelItsGuildTextChannel_1 = require("../../util/channelItsGuildTextChannel");
const sendClimate_1 = require("../send/sendClimate");
const usersDatabase_1 = require("./usersDatabase");
async function userSender() {
    const usersObjc = await (0, usersDatabase_1.users)();
    for (const user of usersObjc) {
        const userSend = await client_1.client.users.fetch(user.id);
        const userChannel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(userSend);
        if (userChannel) {
            const climateToSend = await (0, sendClimate_1.sendClimate)(userChannel, user.userClimate.city);
            if (typeof climateToSend === 'object') {
                userSend.send(climateToSend);
            }
        }
    }
}
exports.userSender = userSender;
