import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildTextBasedChannel, Message, PartialMessage, User } from 'discord.js';
import nodemailer from 'nodemailer';

import { embedBuilder } from '../../src/util/getEmbed';
import { client } from '../client/client';
import { channelItsGuildTextChannel } from '../service/channelItsGuildTextChannel';

const emailbody: { text: string; email: string }[] = [];
const regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
);
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const email = {
  data: new SlashCommandBuilder()
    .setName('email')
    .setDescription('envia um email"')
    .addStringOption(options =>
      options
        .setName('destinatário')
        .setDescription('email que vai receber')
        .setRequired(true),
    )
    .addStringOption(options =>
      options
        .setName('texto')
        .setDescription('texto a ser enviado')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const email = commandMessage.content.replace('*email ', '');
    if (!regex.test(email)) return commandMessage.reply('Verifique o email');
    const filter = (m: Message) => m.author.id === commandMessage.author.id;
    commandMessage.channel
      .send({
        embeds: [
          embedBuilder(
            'Email ativado',
            `Será enviado para ${email} 
        não esqueça de usar *texto 
        `,
          ),
        ],
      })
      .then(async () => {
        await commandMessage.channel
          .awaitMessages({
            filter,
            time: 10000,
            errors: ['time'],
          })
          .catch(async m => {
            const messageFirst: Message = m.first();
            const text = messageFirst.content.replace('*texto ', '');

            await textFunction(
              { text, email },
              commandMessage,
              commandMessage.author,
            );
          });
      });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const text = commandSlash.options.getString('texto') || '';
    const email = commandSlash.options.getString('destinatário') || '';
    if (!regex.test(email)) return commandSlash.reply('Verifique o email');
    const filter = (m: Message) => m.author.id === commandSlash.user.id;
    commandSlash.channel?.send({
      embeds: [
        embedBuilder(
          'Email ativado',
          `Será enviado para ${email} 
        não esqueça de usar *texto 
        `,
        ),
      ],
    });
    if (commandSlash.channel)
      await textFunction({ text, email }, commandSlash, commandSlash.user);
  },
};

async function textFunction(
  emailbody: { text: string; email: string },
  commandMessage: Message<boolean> | PartialMessage | CommandInteraction,
  author: User,
) {
  if (emailbody.text && commandMessage.channel) {
    const messageSendOrEdit = commandMessage.channel.send({
      embeds: [
        embedBuilder(
          `Opa`,
          `${author}
                    O texto foi capturado com sucesso 
                    se deseja enviar precione: ✅ 
                    agora se deseja revisar 🤔`,
        ),
      ],
    });
    const messageReact = await messageSendOrEdit;
    messageReact.react('✅');
    messageReact.react('🤔');
    const resul = await messageReactionAddConstructorForEmail(
      messageReact.id,
      emailbody.text,
      author,
      emailbody.email,
    );
  }
}

function sendAfterReaction(
  message: string,
  email: string,
  messageChannel: GuildTextBasedChannel,
) {
  emailbody.push({
    text: message,
    email,
  });
  if (emailbody.length >= 2) {
    if (
      emailbody[0].text === emailbody[1].text &&
      emailbody[0].email === emailbody[1].email
    )
      return emailbody.pop();
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, //Change this to your gmail email
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
    } else {
      messageChannel.send('Enviado');
      console.log('Email enviado ' + email);
      return;
    }
    return;
  });
  return;
}

async function messageReactionAddConstructorForEmail(
  reactionId: string,
  text: string,
  userSender: User | null,
  email: string,
) {
  let idMessageForDelete: string;
  client.on('messageReactionAdd', async (reaction, user) => {
    if (user != userSender) return;
    if (reaction.message.id != reactionId) return;
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        return;
      }
    }
    if (reaction.emoji.name === '✅') {
      const sender = sendAfterReaction(
        text,
        email,
        await channelItsGuildTextChannel(reaction.message.channel),
      );
    }
    if (reaction.emoji.name === '🤔') {
      const teste = await reaction.message.channel.send({
        embeds: [
          embedBuilder(
            'Texto do email',
            `${text}
        
        se para fechar precione novamente no 🤔`,
          ),
        ],
      });
      idMessageForDelete = teste.id;
    }
  });
  client.on('messageReactionRemove', async (reaction, user) => {
    if (user != userSender) return;
    if (reaction.message.id != reactionId) return;
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        return;
      }
    }
    if (reaction.emoji.name === '🤔') {
      const channelMessage = (
        await channelItsGuildTextChannel(reaction.message.channel)
      ).messages;
      const messageForDelete = await channelMessage.resolve(idMessageForDelete);
      messageForDelete?.delete();
    }
  });
}
