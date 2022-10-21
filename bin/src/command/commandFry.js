"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fry = void 0;
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
exports.fry = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('fry')
        .setDescription('fry futurama take my money')
        .addUserOption(options => options
        .setName('target')
        .setDescription('cidadão burgues')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user = commandMessage.mentions.users.first();
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (user && channel) {
            const canvas = await canvasCreatorFry(user.displayAvatarURL({ extension: 'png' }), channel);
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const user = commandSlash.options.getUser('target');
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (user && channel) {
            return (0, loadin_1.loadin)(commandSlash)?.then(async () => {
                const canvas = await canvasCreatorFry(user.displayAvatarURL({ extension: 'png' }));
                if (canvas) {
                    await (0, senderSlash_1.senderSlash)(channel, canvas, user);
                }
            });
        }
    },
};
async function canvasCreatorFry(avatarUrl, channel) {
    const canvas = (0, canvas_1.createCanvas)(768, 480);
    const context = canvas.getContext('2d');
    const backgroud = await (0, canvas_1.loadImage)('https://ehacks.com.br/wp-content/uploads/167/17-shut-up-and-take-my-money-e1518817154986.jpg');
    context.drawImage(backgroud, 0, 0, canvas.width, canvas.height);
    const user = await (0, canvas_1.loadImage)(avatarUrl);
    context.drawImage(user, 260, 170, 180, 180);
    const attachment = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), {
        name: 'burgues.png',
    });
    if (!channel)
        return attachment;
    channel.send({ files: [attachment] });
}
