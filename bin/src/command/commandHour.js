"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameWeek = exports.hourNow = exports.hour = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const getEmbed_1 = require("../../src/util/getEmbed");
dotenv_1.default.config();
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.hour = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('hour')
        .setDescription('retorna o horário de Brásilia'),
    async executeMessageCommand(commandMessage) {
        var { getNameWeek, dia_sem, str_data, str_hora } = hourNow();
        return commandMessage.reply({
            embeds: [
                (0, getEmbed_1.embedBuilder)('Hum no meu relógio são :', `Hoje é ${getNameWeek(dia_sem)}
       dia : ${str_data}
       são : ${str_hora}`),
            ],
        });
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        var { getNameWeek, dia_sem, str_data, str_hora } = hourNow();
        return commandSlash.reply({
            embeds: [
                (0, getEmbed_1.embedBuilder)('Hum no meu relógio são :', `Hoje é ${getNameWeek(dia_sem)}
       dia : ${str_data}
       são : ${str_hora}`),
            ],
        });
    },
};
function hourNow() {
    var env = process.env.HORA;
    var data = new Date();
    var dia = data.getDate(); // 1-31
    var dia_sem = data.getDay(); // 0-6 (zero=domingo)
    var mes = data.getMonth(); // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear(); // 4 dígitos
    var hora = data.getHours();
    var min = data.getMinutes(); // 0-59
    var seg = data.getSeconds(); // 0-59
    // Formata a data e a hora (note o mês + 1)
    var str_data = dia + '/' + (mes + 1) + '/' + ano4;
    var str_hora = hora + ':' + min + ':' + seg;
    return { getNameWeek: exports.getNameWeek, dia_sem, str_data, str_hora };
}
exports.hourNow = hourNow;
const getNameWeek = (x) => {
    return [
        'Domingo',
        'Segunda-Feira',
        'Terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado',
    ][x];
};
exports.getNameWeek = getNameWeek;
