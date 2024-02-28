"use strict";

import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from "../util/getEmbed";

export const torrentdownloader = {
  data: new SlashCommandBuilder()
    .setName('torrentdownloader')
    .setDescription('torrentdownloader')
    .addStringOption((options) => options
      .setName("magnetlink")
      .setRequired(true)
      .setDescription("linkfor download")),
  async executeMessageCommand(commandMessage: any) {
    return commandMessage.reply({ embeds: [embedBuilder('', '')] });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    if (!commandSlash.isChatInputCommand())
      return;
    const magnetLink = commandSlash.options.getString("magnetLink");
    Torrent.download(magnetLink!);
    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};

class Torrent {
  static async download(link: string | undefined) {
    const { default: WebTorrent } = await import("webtorrent");
    const client = new WebTorrent();
    client.add(link!, { path: "./downloads" }, (torrent: any) => {
      console.log("Downloading: " + torrent.name);
      let percent = 0;
      let progressBar = "";
      torrent.on("download", () => {
        const newPercent = Math.round(torrent.progress * 100);
        if (newPercent !== percent) {
          percent = newPercent;
          progressBar =
            "[" + "=".repeat(percent / 2) + ">".padEnd(50 - percent / 2) + "]";
          console.log("Progress: " + progressBar + " " + percent + "%");
        }
      });
      torrent.on("done", () => {
        console.log("Download completed!");
        process.exit();
      });
      torrent.on("error", (err: any) => {
        console.log("Error:", err);
      });
    });
  }
  static getNameOfFileOrFiles(link: string | undefined) {
    // Implement this method if needed
  }
}
