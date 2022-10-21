"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../util/getEmbed");
exports.ping = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ts')
        .setDescription('teste tyscript slash')
        .addStringOption(options => options.setName('teste').setDescription('bananasplit')),
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const result = commandSlash.options.getString('teste') || '';
        return commandSlash.reply({ embeds: [(0, getEmbed_1.embedBuilder)('TypeScript', result)] });
    },
    async executeMessageCommand(commandMessage) {
        const result = commandMessage.content.replace('*ts ', ' ');
        return commandMessage.reply({
            embeds: [(0, getEmbed_1.embedBuilder)('TypeScript', result)],
        });
    },
};
