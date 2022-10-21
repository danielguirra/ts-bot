"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duel = void 0;
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
exports.duel = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('duelo')
        .setDescription('é hora do duelo')
        .addUserOption(option => option.setName('target').setDescription('o bocó').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user2 = commandMessage.mentions.users.first();
        const user = commandMessage.author;
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (channel) {
            const resul = await canvasDuel(user, user2);
            if (resul) {
                await channel.send({ files: [resul] });
            }
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const user2 = commandSlash.options.getUser('target');
        const user = commandSlash.user;
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (channel && user2) {
            return (0, loadin_1.loadin)(commandSlash)?.then(async () => {
                const canvas = await canvasDuel(user, user2);
                if (canvas) {
                    await (0, senderSlash_1.senderSlash)(channel, canvas, user2);
                }
            });
        }
    },
};
async function canvasDuel(user, user2) {
    const canvas = (0, canvas_1.createCanvas)(1980, 760);
    const context = canvas.getContext('2d');
    const background = await (0, canvas_1.loadImage)('./util/image/duelo.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const user1 = await (0, canvas_1.loadImage)(user.displayAvatarURL({ extension: 'png' }));
    context.drawImage(user1, 260, 200, 250, 250);
    if (!user2)
        return;
    const user2Image = await (0, canvas_1.loadImage)(user2.displayAvatarURL({ extension: 'png' }));
    context.drawImage(user2Image, 1460, 200, 250, 250);
    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), {
        name: 'duel.png',
    });
    return attachment;
}
