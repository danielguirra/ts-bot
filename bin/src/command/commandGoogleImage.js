"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ime = void 0;
const discord_js_1 = require("discord.js");
const googleImage_1 = require("../../googleImage");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
exports.ime = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('image')
        .setDescription('image')
        .addStringOption(option => option.setName('text').setDescription('imagem').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const text = commandMessage.content.replace('*image ', '');
        if (text) {
            await sendSearch(text, commandMessage.channel, commandMessage);
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const text = commandSlash.options.getString('text');
        if (text) {
            await sendSearch(text, commandSlash.channel, commandSlash);
        }
    },
};
async function sendSearch(text, channel, command) {
    const channela = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(channel);
    if (channela) {
        const men = command.reply('Pensquisando ...').then(async () => {
            const id = channela.lastMessageId;
            if (id) {
                const mensage = await channela.messages.fetch(id);
                (0, googleImage_1.googleImage)(text, channela, mensage);
            }
        });
    }
}
