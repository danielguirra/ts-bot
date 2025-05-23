import axios from 'axios';
import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';
import * as fs from 'fs';

import { embedBuilder } from '../util/getEmbed';

export class Bible extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('bible')
         .setDescription('bible')
         .addStringOption((options) =>
            options
               .setName('version')
               .setDescription('arc = ALMEIDA, kja = KING JAMES')
               .setRequired(true)
               .addChoices(
                  {
                     name: 'Almeida corrigida fiel',
                     value: 'arc',
                  },
                  {
                     name: 'KING JAMES ATUALIZADA',
                     value: 'kja',
                  }
               )
         )
         .addStringOption((options) =>
            options
               .setName('book')
               .setRequired(true)
               .setDescription('se não souber os nomes use /biblelistbooks')
         )
         .addIntegerOption((options) =>
            options
               .setName('chapter')
               .setRequired(true)
               .setDescription('chapter for search')
         )
         .addIntegerOption((options) =>
            options
               .setName('verse')
               .setRequired(true)
               .setDescription('verse for search')
         );
   }

   private urlForGet: string =
      'https://raw.githubusercontent.com/danielguirra/bible-json/main';
   version!: string;
   book!: string;
   chapter!: number;
   verse!: number;

   static json: BibleJson = JSON.parse(
      fs.readFileSync('./data/json/newbible.json', 'utf-8')
   );

   static verifylengthOfBookBasedInName(bookName: string) {
      const finder = Bible.json[0].velho.filter(
         (book) =>
            book.name == bookName ||
            book.id == bookName ||
            book.name.includes(bookName) ||
            book.id.includes(bookName)
      );

      if (finder.length < 1) {
         const bookSearh = Bible.json[0].novo.filter(
            (book) =>
               book.name == bookName ||
               book.id == bookName ||
               book.name.includes(bookName) ||
               book.id.includes(bookName)
         );
         return bookSearh[0].capitulos.length;
      }

      return finder[0].capitulos.length;
   }

   static verifyBookExist(bookName: string) {
      const finder = Bible.json[0].velho.filter(
         (book) =>
            book.name == bookName ||
            book.id == bookName ||
            book.name.includes(bookName) ||
            book.id.includes(bookName)
      );
      if (finder.length < 1) {
         const bookSearh = Bible.json[0].novo.filter(
            (book) =>
               book.name == bookName ||
               book.id == bookName ||
               book.name.includes(bookName) ||
               book.id.includes(bookName)
         );
         if (bookSearh.length < 1) return false;
         return true;
      }
      return true;
   }

   static verifyLengthVersesOfChapter(id: string, chapter: number) {
      const finder = Bible.json[0].velho.filter(
         (book) => book.id == id || book.id.includes(id)
      );
      if (finder.length < 1) {
         const bookSearh = Bible.json[0].novo.filter(
            (book) => book.id == id || book.id.includes(id)
         );
         return bookSearh[0].capitulos[chapter - 1].length;
      }
      return finder[0].capitulos[chapter - 1].length;
   }

   async geter() {
      if (
         this.urlForGet &&
         this.verse &&
         this.version &&
         this.book &&
         this.chapter
      ) {
         const verifyBook = Bible.verifyBookExist(this.book);
         if (!verifyBook) return 'O livro não existe : **' + this.book + '**';
         const legnOfBook = Bible.verifylengthOfBookBasedInName(this.book);
         const legnOfChapter = Bible.verifyLengthVersesOfChapter(
            this.book,
            this.chapter
         );
         if (this.chapter > legnOfBook) {
            return (
               'O livro **' +
               this.book +
               '** possui apenas **' +
               legnOfBook +
               '** capitulos.'
            );
         }

         if (this.verse > legnOfChapter) {
            return (
               'O capitulo **' +
               this.chapter +
               '** do livro **' +
               this.book +
               '** possui apenas **' +
               legnOfChapter +
               '** versos.'
            );
         }

         const get = await axios.get(
            `${this.urlForGet}/${this.version}/${this.book}/${this.chapter}/${this.verse}.txt`
         );
         return get;
      }
   }

   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply('Use somente no slash');
   }

   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const BibleVersion = commandSlash.options.getString('version');
      const BibleBook = commandSlash.options.getString('book');
      const BibleChapter = commandSlash.options.getInteger('chapter') || 1;
      const BibleVerse = commandSlash.options.getInteger('verse') || 1;

      if (BibleVersion && BibleBook && BibleChapter && BibleVerse) {
         this.book = BibleBook;
         this.chapter = BibleChapter;
         this.verse = BibleVerse;
         this.version = BibleVersion;
         const respo = await this.geter();

         if (respo) {
            if (typeof respo == 'string') {
               return commandSlash.reply(respo);
            }

            return commandSlash.reply({
               embeds: [
                  embedBuilder(
                     'Biblia Sagrada ' + this.version,
                     respo.data,
                     undefined,
                     `${BibleBook.toUpperCase()} ${BibleChapter}-${BibleVerse}`
                  ),
               ],
            });
         }
      } else {
         return commandSlash.reply('Verifique os dados');
      }
   }
}

type BibleJson = [
   {
      velho: [
         {
            id: string;
            name: string;
            capitulos: string[];
         }
      ];
      novo: [
         {
            id: string;
            name: string;
            capitulos: string[];
         }
      ];
   }
];
