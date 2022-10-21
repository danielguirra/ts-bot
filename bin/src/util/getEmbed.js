"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedBuilder = void 0;
const discord_js_1 = require("discord.js");
function embedBuilder(title, description, authorAvatarURL, nickname, thumbimage, image, color, url) {
    if (!authorAvatarURL || authorAvatarURL === '') {
        authorAvatarURL =
            'https://cdn.discordapp.com/avatars/811255307673010246/8f145d7279847a9a6e46efd5ee3df6bf.webp';
    }
    if (!nickname || nickname === '') {
        nickname = 'Capivara do TI';
    }
    if (!thumbimage || thumbimage === '') {
        thumbimage = authorAvatarURL;
    }
    if (!color) {
        color = 'Orange';
    }
    const footer = {
        text: nickname,
        iconURL: authorAvatarURL,
    };
    let embed = new discord_js_1.EmbedBuilder()
        .setColor(color || null)
        .setTitle(title || null)
        .setDescription(description || null)
        .setFooter(footer || null)
        .setThumbnail(thumbimage || null)
        .setImage(image || null)
        .setURL(url || null);
    return embed;
}
exports.embedBuilder = embedBuilder;
