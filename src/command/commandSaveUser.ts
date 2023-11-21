import {
  Guild,
  Interaction,
  Message,
  SlashCommandBuilder,
  User,
} from "discord.js";
import dotenv from "dotenv";

import { embedBuilder } from "../../src/util/getEmbed";
import { UserDatabase } from "../database/querys/user/user";
import { IUser } from "../interfaces/User";

dotenv.config();
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const saveUser = {
  data: new SlashCommandBuilder()
    .setName("salvabanco")
    .setDescription("salva o seu usuário no banco de dados do bot")

    .addStringOption((options) =>
      options
        .setName("nicklol")
        .setDescription("seu nick league of legends")
        .setRequired(true)
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.author;
    const guild = commandMessage.guild;

    if (guild && user) {
      const result = await saveUserFunc(guild, user);
      const resultString = `${result}`;
      return commandMessage.reply({
        embeds: [
          embedBuilder(
            "Banco de Dados Capivareis",
            resultString,
            "",
            "",
            "",
            "",
            "Green"
          ),
        ],
      });
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const nickLol = commandSlash.options.getString("nicklol");
    const user = commandSlash.user;
    const guild = commandSlash.guild;

    if (guild && user && nickLol) {
      const result = await saveUserFunc(guild, user, nickLol);
      const resultString = `${result}`;
      return commandSlash.reply({
        embeds: [
          embedBuilder(
            "Banco de Dados Capivareis",
            resultString,
            "",
            "",
            "",
            "",
            "Green"
          ),
        ],
      });
    }
    return commandSlash.reply({ embeds: [embedBuilder("", "")] });
  },
};
async function saveUserFunc(guild: Guild, user: User, nickLol?: string) {
  if (!nickLol) nickLol = "";
  const userObjc: IUser = {
    id: user.id,
    guildId: guild.id,
    username: user.username,
    nickLol: nickLol,
  };

  const result = await new UserDatabase().saveNewUser(userObjc);
  return result;
}
