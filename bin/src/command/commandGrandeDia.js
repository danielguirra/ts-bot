"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grandedia = void 0;
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
exports.grandedia = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('grandedia')
        .setDescription('grandedia')
        .addUserOption(options => options.setName('mito').setDescription('a lenda').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        const user = commandMessage.mentions.users.first();
        if (user && channel) {
            const image = await createCanvasGrandeDia(user);
            if (image) {
                await channel.send({ files: [image] });
            }
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const user = commandSlash.options.getUser('mito');
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (user && channel) {
            return (0, loadin_1.loadin)(commandSlash)?.then(async () => {
                const canvas = await createCanvasGrandeDia(user);
                if (canvas) {
                    await (0, senderSlash_1.senderSlash)(channel, canvas, user);
                }
            });
        }
    },
};
async function createCanvasGrandeDia(user) {
    const canvas = (0, canvas_1.createCanvas)(1186, 590);
    const context = canvas.getContext('2d');
    const background = await (0, canvas_1.loadImage)('./util/image/grande.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const userImage = await (0, canvas_1.loadImage)(user.displayAvatarURL({ extension: 'png' }));
    context.drawImage(userImage, 60, 160, 210, 210);
    context.font = '38px comic';
    context.fillText(`${user.username}`, 280, 248);
    context.strokeText(`${user.username}`, 280, 248);
    context.font = '28px comic';
    context.fillStyle = '#808080';
    context.strokeStyle = '#808080';
    context.fillText(`@${user.username} Oficial`, 280, 298);
    context.strokeText(`@${user.username} Oficial`, 280, 298);
    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), {
        name: 'dia.png',
    });
    return attachment;
}
