import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const bible = {
  data: new SlashCommandBuilder()
    .setName('bible')
    .setDescription('bible')
    .addStringOption(options =>
      options
        .setName('version')
        .setDescription('arc = ALMEIDA, kja = KING JAMES')
        .setRequired(true),
    )
    .addStringOption(options =>
      options
        .setName('book')
        .setRequired(true)
        .setDescription('book for search'),
    )
    .addIntegerOption(options =>
      options
        .setName('chapter')
        .setRequired(true)
        .setDescription('chapter for search'),
    )
    .addIntegerOption(options =>
      options
        .setName('verse')
        .setRequired(true)
        .setDescription('verse for search'),
    ),
  async executeMessageCommand(commandMessage: Message) {
    return commandMessage.reply('Use somente no slash');
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const BibleVersion = commandSlash.options.getString('version');
    const BibleBook = commandSlash.options.getString('book');
    const BibleChapter = commandSlash.options.getInteger('chapter');
    const BibleVerse = commandSlash.options.getInteger('verse');

    if (BibleVersion && BibleBook && BibleChapter && BibleVerse) {
      const bible = new Bible();
      bible.book = BibleBook;
      bible.chapter = BibleChapter;
      bible.verse = BibleVerse;
      bible.version = BibleVersion;
      const respo = bible.geter();
      respo?.then(f => {
        return commandSlash.reply({
          embeds: [
            embedBuilder(
              'Biblia Sagrada',
              f.data,
              undefined,
              `${BibleBook} ${BibleChapter} ${BibleVerse}`,
            ),
          ],
        });
      });
    }
  },
};

export class Bible {
  private urlForGet: string | undefined = process.env.URLBIBLE;
  version: string | undefined;
  book: string | undefined;
  chapter: number | undefined;
  verse: number | undefined;
  geter = () => {
    if (
      this.urlForGet &&
      this.verse &&
      this.version &&
      this.book &&
      this.chapter
    ) {
      const get = axios.get(
        `${this.urlForGet}/${this.version}/${this.book}/${this.chapter}/${this.verse}`,
      );

      return get;
    }
  };
}
