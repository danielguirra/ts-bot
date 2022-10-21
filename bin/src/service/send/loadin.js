"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadin = void 0;
function loadin(commandSlash) {
    if (!commandSlash.isChatInputCommand())
        return;
    return commandSlash.reply('Carregando');
}
exports.loadin = loadin;
