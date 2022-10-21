"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdl = void 0;
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
exports.pdl = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('pdl')
        .setDescription('pdlzada bora')
        .addUserOption(options => options.setName('target').setDescription('cidadão').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user = commandMessage.mentions.members?.first();
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (user && channel) {
            const avatar = await getCanvasPdl(user);
            if (avatar) {
                await channel.send({ files: [avatar] });
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
                const canvas = await getCanvasPdl(user);
                if (canvas) {
                    await (0, senderSlash_1.senderSlash)(channel, canvas, user);
                }
            });
        }
    },
};
async function getCanvasPdl(user) {
    const canvas = (0, canvas_1.createCanvas)(720, 681);
    const context = canvas.getContext('2d');
    const background = await (0, canvas_1.loadImage)('./util/image/pdl.jpg');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    let avatar;
    try {
        avatar = await (0, canvas_1.loadImage)(user.displayAvatarURL({ extension: 'png' }));
    }
    catch (error) {
        return;
    }
    context.drawImage(avatar, 240, 70, 230, 230);
    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), {
        name: 'fine.png',
    });
    return attachment;
}
