"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleter = void 0;
async function deleter(channel) {
    if (!channel)
        return false;
    const idMessage = channel.lastMessageId;
    if (idMessage) {
        const messageForDelete = await channel.messages.fetch(idMessage);
        const itsdelete = await messageForDelete.delete();
        if (itsdelete)
            return true;
    }
    return false;
}
exports.deleter = deleter;
