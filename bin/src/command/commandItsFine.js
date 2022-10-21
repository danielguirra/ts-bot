"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itsfine = void 0;
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
exports.itsfine = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('itsfine')
        .setDescription('está tudo ótimo')
        .addUserOption(option => option
        .setName('user')
        .setDescription('cidadão que está bem mesmo no inferno')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user = commandMessage.mentions.users.first();
        if (user) {
            const avatar = user.displayAvatarURL({ extension: 'png' });
            const image = await createCanvasItsFine(avatar);
            commandMessage.reply({ files: [image] });
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const user = commandSlash.options.getUser('user');
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (user && channel) {
            return (0, loadin_1.loadin)(commandSlash)?.then(async () => {
                const avatar = user.displayAvatarURL({ extension: 'png' });
                const image = await createCanvasItsFine(avatar);
                if (image) {
                    await (0, senderSlash_1.senderSlash)(channel, image, user);
                }
            });
        }
    },
};
async function createCanvasItsFine(avatar) {
    const canvas = (0, canvas_1.createCanvas)(640, 306);
    const context = canvas.getContext('2d');
    const background = await (0, canvas_1.loadImage)('https://i.im.ge/2021/09/24/TxnjQh.jpg');
    const avatarUser = await (0, canvas_1.loadImage)(avatar);
    context.drawImage(avatarUser, 240, 70, 90, 90);
    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), {
        name: 'fine.png',
    });
    return attachment;
}
