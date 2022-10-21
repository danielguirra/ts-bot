"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confiaWill = void 0;
const canvas_1 = __importStar(require("canvas"));
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
exports.confiaWill = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('confia')
        .setDescription('confia po')
        .addUserOption(option => option.setName('target').setDescription('cidadão').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user = commandMessage.mentions.users.first();
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (user && channel) {
            const file = await confiaWillGetCanvas(user);
            if (file) {
                await channel.send({ files: [file] });
            }
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const user = commandSlash.options.getUser('target');
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (user && channel && typeof user === 'object') {
            return (0, loadin_1.loadin)(commandSlash)?.then(async () => {
                const canvas = await confiaWillGetCanvas(user);
                if (canvas) {
                    await (0, senderSlash_1.senderSlash)(channel, canvas, user);
                }
            });
        }
    },
};
async function confiaWillGetCanvas(user) {
    const canvas = canvas_1.default.createCanvas(302, 167);
    const context = canvas.getContext('2d');
    const background = await canvas_1.default.loadImage('https://i.im.ge/2021/08/13/wuwi4.jpg');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await (0, canvas_1.loadImage)(user.displayAvatarURL({ extension: 'png' }));
    context.drawImage(avatar, 60, 30, 150, 90);
    const file = new discord_js_1.AttachmentBuilder(canvas.toBuffer(), { name: 'confia.png' });
    return file;
}
