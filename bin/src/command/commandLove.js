"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.love = void 0;
const discord_js_1 = require("discord.js");
const sendLoveMessageDaily_1 = require("../service/send/sendLoveMessageDaily");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.love = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('love')
        .setDescription('envia uma messagem de amor no canal'),
    async executeMessageCommand(commandMessage) {
        const love = commandMessage.content.replace('*love ', '');
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (love && channel) {
            const loveSend = await (0, sendLoveMessageDaily_1.sendLoveMessageDaily)(channel);
        }
    },
    async executeSlashCommand(commandSlash) {
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (!commandSlash.isChatInputCommand())
            return;
        if (channel) {
            commandSlash.reply('❤').then(async () => {
                const loveSend = await (0, sendLoveMessageDaily_1.sendLoveMessageDaily)(channel);
            });
        }
    },
};
