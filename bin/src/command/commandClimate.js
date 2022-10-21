"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.climate = void 0;
const discord_js_1 = require("discord.js");
const sendClimate_1 = require("../service/send/sendClimate");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
const loadin_1 = require("../util/loadin");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param climate
 * @danielguirra
 */
exports.climate = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('clima')
        .setDescription('retorna o clima da cidade fornecida')
        .addStringOption(options => options
        .setName('city')
        .setDescription('cidade para retornar')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const channelToSendClimate = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (channelToSendClimate) {
            const city = commandMessage.content.replace('*clima ', '');
            const climate = await (0, sendClimate_1.sendClimateCurrentTime)(channelToSendClimate, city);
            return climate;
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const city = commandSlash.options.getString('city') || 'franca';
        const channelToSendClimate = commandSlash.channel || undefined;
        if (channelToSendClimate) {
            return commandSlash.reply('Carregando...').then(message => {
                const sender = (0, loadin_1.loadinCreator)(commandSlash, {
                    channel: channelToSendClimate,
                    func: (0, sendClimate_1.sendClimateCurrentTime)(city),
                });
            });
        }
    },
};
