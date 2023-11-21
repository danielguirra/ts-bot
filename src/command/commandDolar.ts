import { CommandInteraction, Message, SlashCommandBuilder } from "discord.js";

import { sendDolarDaily } from "../service/send/sendDolarDaily";
import { channelItsGuildTextChannel } from "../util/channelItsGuildTextChannel";
import { Command } from "./Builder";

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const dolar: Command = {
  data: new SlashCommandBuilder()
    .setName("dolar")
    .setDescription("retorna valor do dolar atual"),
  async executeMessageCommand(commandMessage: Message) {
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    if (channel) {
      const embed = await sendDolarDaily(channel, true);
      return commandMessage.reply(embed || "");
    }

    return;
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    if (!commandSlash.isChatInputCommand()) return;
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (channel) {
      const embed = await sendDolarDaily(channel, true);
      return commandSlash.reply(embed || "");
    }

    return;
  },
};
