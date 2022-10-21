"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buzz = void 0;
const canvas_1 = require("canvas");
const discord_js_1 = require("discord.js");
const loadin_1 = require("../service/send/loadin");
const senderSlash_1 = require("../service/send/senderSlash");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.buzz = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('buzz')
        .setDescription('buzz ele é')
        .addUserOption(option => option.setName('target').setDescription('cidadão').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user1 = commandMessage.mentions.users
            .first()
            ?.displayAvatarURL({ extension: 'png' });
        const user2 = commandMessage.author.displayAvatarURL({ extension: 'png' });
        const channel = commandMessage.channel;
        if (user1 && user2) {
            const image = await buzzImageCanvasBuilder(user1, user2);
            if (image) {
                await channel.send({ files: [image] });
            }
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const user1 = commandSlash.options
            .getUser('target')
            ?.displayAvatarURL({ extension: 'png' });
        const user2 = commandSlash.user.displayAvatarURL({ extension: 'png' });
        const user = commandSlash.options.getUser('target');
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (user1 && user2 && channel && user) {
            return (0, loadin_1.loadin)(commandSlash)?.then(async () => {
                const canvas = await buzzImageCanvasBuilder(user1, user2);
                if (canvas) {
                    await (0, senderSlash_1.senderSlash)(channel, canvas, user);
                }
            });
        }
    },
};
async function buzzImageCanvasBuilder(user1, user2) {
    const canvas = (0, canvas_1.createCanvas)(500, 250);
    const context = canvas.getContext('2d');
    const buzzImage = await (0, canvas_1.loadImage)('./util/image/buzz.png');
    context.drawImage(buzzImage, 250, 0, 250, 255);
    const raibowImage = await (0, canvas_1.loadImage)('./util/image/arco.png');
    context.drawImage(raibowImage, 0, 0, 250, 250);
    const user1Image = await (0, canvas_1.loadImage)(user1);
    context.drawImage(user1Image, 90, 130, 66, 66);
    const user2Image = await (0, canvas_1.loadImage)(user2);
    context.drawImage(user2Image, 400, 18, 66, 66);
    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), {
        name: 'guei.png',
    });
    return attachment;
}
