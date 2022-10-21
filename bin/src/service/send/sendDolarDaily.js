"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDolarDaily = void 0;
const axios_1 = __importDefault(require("axios"));
const getEmbed_1 = require("../../util/getEmbed");
const sendDolarDaily = async (channelDolar, commandEmbed) => {
    if (commandEmbed) {
        const data = await axios_1.default.get(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`);
        const moeda = data.data;
        const dolar = moeda['USDBRL']['ask'];
        const euro = moeda['EURBRL']['ask'];
        return {
            embeds: [
                (0, getEmbed_1.embedBuilder)('Dolar e Euro Atual', `   1 Dolar em R$:${dolar}💵
                1 Euro em R$:${euro}💶
      `),
            ],
        };
    }
    else {
        const data = await axios_1.default.get(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`);
        const moeda = data.data;
        const dolar = moeda['USDBRL']['ask'];
        const euro = moeda['EURBRL']['ask'];
        channelDolar.send({
            embeds: [
                (0, getEmbed_1.embedBuilder)('Dolar e Euro Atual', `   1 Dolar em R$:${dolar}💵
                1 Euro em R$:${euro}💶
      `),
            ],
        });
    }
};
exports.sendDolarDaily = sendDolarDaily;
