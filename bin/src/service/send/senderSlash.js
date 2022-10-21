"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.senderSlash = void 0;
async function senderSlash(channel, canvas, user) {
    const messageToDelete = channel.lastMessageId;
    try {
        const sender = await channel.send({ files: [canvas] });
        if (sender && messageToDelete) {
            try {
                const messageDel = channel.messages.resolve(messageToDelete);
                if (messageDel) {
                    await messageDel.delete();
                    await channel.send(`${user}`);
                }
            }
            catch (error) {
                console.log('erro sender, messageDel' + process.report?.filename);
                return;
            }
        }
    }
    catch (error) {
        console.log('erro sender' + process.report?.filename);
        return;
    }
}
exports.senderSlash = senderSlash;
