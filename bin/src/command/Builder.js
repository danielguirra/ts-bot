"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const discord_js_1 = require("discord.js");
const allComands_1 = require("./allComands");
exports.commands = new discord_js_1.Collection();
for (const key in allComands_1.allComands) {
    if (Object.prototype.hasOwnProperty.call(allComands_1.allComands, key)) {
        const element = allComands_1.allComands[key];
        exports.commands.set(element.data.name, element);
    }
}
