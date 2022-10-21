"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = void 0;
const discord_js_1 = require("discord.js");
const nodemailer_1 = __importDefault(require("nodemailer"));
const getEmbed_1 = require("../../src/util/getEmbed");
const client_1 = require("../client/client");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
const emailbody = [];
const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.email = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('email')
        .setDescription('envia um email"')
        .addStringOption(options => options
        .setName('destinatário')
        .setDescription('email que vai receber')
        .setRequired(true))
        .addStringOption(options => options
        .setName('texto')
        .setDescription('texto a ser enviado')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const email = commandMessage.content.replace('*email ', '');
        if (!regex.test(email))
            return commandMessage.reply('Verifique o email');
        const filter = (m) => m.author.id === commandMessage.author.id;
        commandMessage.channel
            .send({
            embeds: [
                (0, getEmbed_1.embedBuilder)('Email ativado', `Será enviado para ${email} 
        não esqueça de usar *texto 
        `),
            ],
        })
            .then(async () => {
            await commandMessage.channel
                .awaitMessages({
                filter,
                time: 10000,
                errors: ['time'],
            })
                .catch(async (m) => {
                const messageFirst = m.first();
                const text = messageFirst.content.replace('*texto ', '');
                await textFunction({ text, email }, commandMessage, commandMessage.author);
            });
        });
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const text = commandSlash.options.getString('texto') || '';
        const email = commandSlash.options.getString('destinatário') || '';
        if (!regex.test(email))
            return commandSlash.reply('Verifique o email');
        const filter = (m) => m.author.id === commandSlash.client.user?.id;
        commandSlash.channel?.send({
            embeds: [
                (0, getEmbed_1.embedBuilder)('Email ativado', `Será enviado para ${email} 
        não esqueça de usar *texto 
        `),
            ],
        });
        if (commandSlash.channel)
            await textFunction({ text, email }, commandSlash, commandSlash.user);
    },
};
async function textFunction(emailbody, commandMessage, author) {
    if (emailbody.text && commandMessage.channel) {
        const messageSendOrEdit = commandMessage.channel.send({
            embeds: [
                (0, getEmbed_1.embedBuilder)(`Opa`, `${author}
                    O texto foi capturado com sucesso 
                    se deseja enviar precione: ✅ 
                    agora se deseja revisar 🤔`),
            ],
        });
        const messageReact = await messageSendOrEdit;
        messageReact.react('✅');
        messageReact.react('🤔');
        const resul = await messageReactionAddConstructorForEmail(messageReact.id, emailbody.text, author, emailbody.email);
    }
}
function sendAfterReaction(message, email, messageChannel) {
    emailbody.push({
        text: message,
        email,
    });
    if (emailbody.length >= 2) {
        if (emailbody[0].text === emailbody[1].text &&
            emailbody[0].email === emailbody[1].email)
            return emailbody.pop();
    }
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS, //Your password
        },
    });
    const mailOptions = {
        from: `${email}`,
        to: `${email}`,
        subject: 'Email via Discord',
        text: `${message}`,
    };
    messageChannel.send('Tentando enviar');
    const sender = transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            messageChannel.send('Email não Enviado erro ' + error);
            return;
        }
        else {
            messageChannel.send('Enviado');
            console.log('Email enviado ' + email);
            return;
        }
        return;
    });
    return;
}
async function messageReactionAddConstructorForEmail(reactionId, text, userSender, email) {
    let idMessageForDelete;
    client_1.client.on('messageReactionAdd', async (reaction, user) => {
        if (user != userSender)
            return;
        if (reaction.message.id != reactionId)
            return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        if (reaction.emoji.name === '✅') {
            const cha = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(reaction.message.channel);
            if (cha) {
                const sender = sendAfterReaction(text, email, cha);
            }
            else {
                console.log(cha);
            }
        }
        if (reaction.emoji.name === '🤔') {
            const teste = await reaction.message.channel.send({
                embeds: [
                    (0, getEmbed_1.embedBuilder)('Texto do email', `${text}
        
        se para fechar precione novamente no 🤔`),
                ],
            });
            idMessageForDelete = teste.id;
        }
    });
    client_1.client.on('messageReactionRemove', async (reaction, user) => {
        if (user != userSender)
            return;
        if (reaction.message.id != reactionId)
            return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        if (reaction.emoji.name === '🤔') {
            const cha = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(reaction.message.channel);
            if (cha) {
                const channelMessage = cha.messages;
                const messageForDelete = channelMessage.resolve(idMessageForDelete);
                messageForDelete?.delete();
            }
        }
    });
}
