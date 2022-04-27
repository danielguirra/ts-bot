import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Guild, Message, User } from 'discord.js';
import dotenv from 'dotenv';

import { embedBuilder } from '../../src/util/getEmbed';
import { saveUserDb } from '../database/querys/user/saveUser';
import { verifyUser } from '../database/querys/user/verifyUser';
import { IClimate } from '../interfaces/Climate';
import { IDate } from '../interfaces/Date';
import { IGuild } from '../interfaces/Guild';
import { IUser } from '../interfaces/User';

dotenv.config();
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const saveUser = {
  data: new SlashCommandBuilder()
    .setName('salvabanco')
    .setDescription('salva o seu usuário no banco de dados do bot')
    .addIntegerOption(options =>
      options
        .setName('horas')
        .setDescription('hora para dm do clima')
        .setRequired(true),
    )
    .addStringOption(options =>
      options
        .setName('cidade')
        .setDescription('sua cidade meu nobre')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const city = commandMessage.content.replace('*salvabanco ', '');
    const user = commandMessage.author;
    const guild = commandMessage.guild;

    if (city && guild && user) {
      const result = await saveUserFunc(city, guild, user);
      const resultString = `${result}`;
      return commandMessage.reply({
        embeds: [
          embedBuilder(
            'Banco de Dados Capivareis',
            resultString,
            '',
            '',
            '',
            '',
            'GREEN',
          ),
        ],
      });
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const hour = commandSlash.options.getInteger('horas');
    const city = commandSlash.options.getString('cidade');
    const user = commandSlash.user;
    const guild = commandSlash.guild;

    if (city && guild && user) {
      const result = await saveUserFunc(city, guild, user, hour);
      const resultString = `${result}`;
      return commandSlash.reply({
        embeds: [
          embedBuilder(
            'Banco de Dados Capivareis',
            resultString,
            '',
            '',
            '',
            '',
            'GREEN',
          ),
        ],
      });
    }
    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};
async function saveUserFunc(
  city: string,
  guild: Guild,
  user: User,
  hour: any = 8,
  sendItsTrue: boolean = true,
) {
  const dateObjc: IDate = {
    hour: hour,
  };
  const userClimateObjc: IClimate = {
    city: city,
    hourSendClimate: dateObjc,
    sendItsTrue: sendItsTrue,
  };
  const guildObjc: IGuild = {
    id: guild?.id,
    name: guild?.name,
  };
  const userObjc: IUser = {
    id: user.id,
    guild: guildObjc,
    username: user.username,
    discriminator: user.discriminator,
    userClimate: userClimateObjc,
  };

  const verify = await verifyUser(userObjc);
  if (!verify) {
    console.log(verify);
    const result = await saveUserDb(userObjc);
    return result;
  } else {
    console.log(verify);
    return `O usuário ${userObjc.username} já consta no banco `;
  }
}
