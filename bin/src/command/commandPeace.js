"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.peace = void 0;
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
exports.peace = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('peace')
        .setDescription('retona uma imagem')
        .addUserOption(options => options.setName('target').setDescription('cidadão').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user = commandMessage.mentions.users.first();
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (user && channel) {
            const image = await getCanvasPeace(user);
            if (image) {
                await channel.send({ files: [image] });
            }
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const user = commandSlash.options.getUser('target');
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (user && channel) {
            return (0, loadin_1.loadin)(commandSlash)?.then(async () => {
                const canvas = await getCanvasPeace(user);
                if (canvas) {
                    await (0, senderSlash_1.senderSlash)(channel, canvas, user);
                }
            });
        }
    },
};
async function getCanvasPeace(user) {
    const canvas = (0, canvas_1.createCanvas)(1000, 600);
    const context = canvas.getContext('2d');
    const background = await (0, canvas_1.loadImage)('https://i.im.ge/2021/09/24/T3b3qM.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await (0, canvas_1.loadImage)(user.displayAvatarURL({ extension: 'png' }));
    context.drawImage(avatar, 690, 320, 230, 230);
    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), {
        name: 'paz-image.png',
    });
    return attachment;
}
