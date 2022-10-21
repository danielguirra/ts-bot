"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailySender = void 0;
const sendDaily_1 = require("./send/sendDaily");
const sendDolarDaily_1 = require("./send/sendDolarDaily");
const sendLoveMessageDaily_1 = require("./send/sendLoveMessageDaily");
const userSender_1 = require("./users/userSender");
async function dailySender({ channelDolar, channelLove, channelDaily, }) {
    if (channelDaily && channelDolar && channelLove)
        try {
            await (0, sendDolarDaily_1.sendDolarDaily)(channelDolar);
            await (0, sendLoveMessageDaily_1.sendLoveMessageDaily)(channelLove);
            await (0, sendDaily_1.sendDaily)(channelDaily);
            await (0, userSender_1.userSender)();
            return true;
        }
        catch (error) {
            return false;
        }
    else {
        return false;
    }
}
exports.dailySender = dailySender;
