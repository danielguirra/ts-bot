"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelItsGuildTextChannel = void 0;
async function channelItsGuildTextChannel(channel) {
    if (channel?.type === 'GUILD_TEXT') {
        const channelText = channel;
        return channelText;
    }
    return channel;
}
exports.channelItsGuildTextChannel = channelItsGuildTextChannel;
