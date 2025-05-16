import {
   AttachmentBuilder,
   CommandInteraction,
   EmbedBuilder,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { load } from 'cheerio';
import { embedBuilder } from '../../src/util/getEmbed';
import { Command } from '../interfaces/Command';
import { createCanvas, loadImage } from 'canvas';

export const ot: Command = {
   data: new SlashCommandBuilder()
      .setName('ot')
      .setDescription('pesquisa na wiki do otpokemon o pokemon passado')
      .addStringOption((options) =>
         options
            .setName('pokemon')
            .setDescription('o pokemon a ser pesquisado')
            .setRequired(true)
      ),

   async executeMessageCommand(commandMessage: Message) {
      const pokeName = commandMessage.content.replace('*ot', '');

      try {
         const pokeData = await otpokemonWiki(pokeName!);

         const embed_files: any = await embedFiles(pokeData);
         return commandMessage.reply(embed_files);
      } catch (error) {
         console.log(error);
         return;
      }
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      // if (!commandSlash.isChatInputCommand()) return;
      // const pokeName = commandSlash.options.getString('pokemon');
      // const pokeData = await otpokemonWiki(pokeName!);
      // const emb = embed(pokeData);
      // return commandSlash.reply({ embeds: await embed(pokeData) });
   },
};

const canvasPokemonTypeUnion = async (type1: string, type2: string) => {
   try {
      const img1 = await loadImage(type1);
      const img2 = await loadImage(type2);

      const canvasWidth = img1.width + img2.width;
      const canvasHeight = Math.max(img1.height, img2.height);

      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img1, 0, 0);
      ctx.drawImage(img2, img1.width, 0);

      const attachment = new AttachmentBuilder(canvas.toBuffer(), {
         name: 'types.png',
      });
      return attachment;
   } catch (err) {
      console.error('Erro ao processar as imagens:', err);
   }
};

const embed = async (pokeData: any) => {
   const embeds = [];

   const skills = {
      name: 'Skills',
      value: pokeData.skills.toString(),
   };

   const level = {
      name: 'Treinador Level',
      value: pokeData.level,
   };

   const types = {
      name: 'Tipos',
      value: pokeData.types.map((type: any) => type.name).toString(),
   };

   if (pokeData.types.length > 1) {
      embeds.push(
         new EmbedBuilder()
            .setColor('Random')
            .setTitle(pokeData.name)
            .setDescription(null)
            .setFooter(null)
            .setThumbnail(pokeData.image)
            .setImage('attachment://types.png')
            .setURL(null)
            .addFields(level)
            .addFields(pokeData.status)
            .addFields(skills)
            .addFields(types)
      );
   } else {
      embeds.push(
         new EmbedBuilder()
            .setColor('Random')
            .setTitle(pokeData.name)
            .setDescription(null)
            .setFooter(null)
            .setThumbnail(pokeData.image)
            .setImage(pokeData.types[0].image)
            .setURL(null)
            .addFields(level)
            .addFields(pokeData.status)
            .addFields(skills)
            .addFields(types)
      );
   }

   if (pokeData.evolves.length > 0) {
      for (let index = 0; index < pokeData.evolves.length; index++) {
         for (const key in pokeData.evolves[index]) {
            if (
               Object.prototype.hasOwnProperty.call(
                  pokeData.evolves[index],
                  key
               )
            ) {
               const form = pokeData.evolves[index][key];

               if (!form.types[0]) {
                  form.types = pokeData.types;
               }

               const typesForm = {
                  name: 'Tipos',
                  value: form.types.map((type: any) => type.name).toString(),
               };

               if (form.name == pokeData.name) continue;
               if (form.playerLevel == undefined) form.playerLevel = '1';
               if (form.evolveItem == undefined) form.evolveItem = 'Nada';

               let intPlayerLevel = Number(
                  form.playerLevel.replace('Nível ', '')
               );
               let stringTitle = 'Evolui para ' + form.name;

               if (intPlayerLevel < Number(pokeData.level)) {
                  if (!form.name.startsWith('Shiny'))
                     stringTitle = stringTitle.replace('para', 'de');
               }

               if (form.types.length > 1) {
                  await canvasPokemonTypeUnion(
                     form.types[0].image,
                     form.types[1].image
                  );

                  embeds.push(
                     new EmbedBuilder()
                        .setColor('Random')
                        .setTitle(stringTitle)
                        .setDescription(null)
                        .setFooter(null)
                        .setThumbnail(form.image)
                        .setImage('attachment://types.png')
                        .setURL(null)
                        .addFields({
                           name: 'Treinador Level',
                           value: form.playerLevel,
                        })
                        .addFields({
                           name: 'Item',
                           value: form.evolveItem,
                        })
                        .addFields(typesForm)
                  );
               } else {
                  embeds.push(
                     new EmbedBuilder()
                        .setColor('Random')
                        .setTitle(stringTitle)
                        .setDescription(null)
                        .setFooter(null)
                        .setThumbnail(form.image)
                        .setImage(form.types[0].image)
                        .setURL(null)
                        .addFields({
                           name: 'Treinador Level',
                           value: form.playerLevel,
                        })
                        .addFields({
                           name: 'Item',
                           value: form.evolveItem,
                        })
                        .addFields(typesForm)
                  );
               }
            }
         }
      }
   }

   return {
      embeds,
      types: pokeData.types,
   };
};

const getImage = (src: string): string => {
   return `https://wiki.otpokemon.com${src}`;
};

const otpokemonWiki = async (pokeName: string) => {
   const response = await fetch(
      `https://wiki.otpokemon.com/index.php/` + pokeName
   );

   const html = await response.text();

   const $ = load(html);

   const pokemon = {
      name: $('table:first tr:first td:first').text().trim(),
      pokedexNumber: $('table:first tr:first td:nth-child(4)').text().trim(),
      level: $('table:first tr:first td:nth-child(4)').text().trim(),
      image: getImage(
         $('table:first tr:nth-child(2) td:nth-child(1) img').attr('src')!
      ),
      types: $('table:first tr:nth-child(2) td:nth-child(3) a')
         .toArray()
         .map((el) => ({
            name: $(el).attr('title'),
            image: getImage($(el).find('img').attr('src')!),
         })),
      skills: $('table:first tr:nth-child(5) td')
         .text()
         .trim()
         .split(/, | e /),
      experienceGroup: $('table:first tr:nth-child(9) td').text().trim(),
      status: $('h2:has(#Status) + table')
         .find('tr:gt(0)')
         .toArray()
         .map((el) => ({
            name: $(el).find('td').eq(0).text().trim(),
            value: $(el).find('td').eq(2).text().trim(),
         })),
      evolves: $('table')
         .eq(1)
         .nextUntil(':not(table,p)')
         .addBack()
         .filter('table')
         .toArray()
         .map((el) => {
            const length = $(el).find('tr:first td').toArray().length;

            const pokes = [];

            let pos = 0;
            for (let i = 0; i < length; i++) {
               if ((i + 1) % 3 !== 1) continue;

               pokes.push({
                  name: $(el).find('tr:first td').eq(i).text().trim(),
                  pokedexNumber: $(el)
                     .find('tr:first td')
                     .eq(i + 1)
                     .text()
                     .trim(),
                  image: getImage(
                     $(el)
                        .find('tr:nth-child(2) td')
                        .eq(pos * 2)
                        .find('img')
                        .attr('src')!
                  ),
                  types: $(el)
                     .find('tr:nth-child(5) td:nth-child(odd)')
                     .eq(pos)
                     .find('a')
                     .toArray()
                     .map((el) => ({
                        name:
                           $(el).attr('title') ||
                           $(el)
                              .attr('href')!
                              .match(/Arquivo:(\w+)-type/)![1],
                        image: getImage($(el).find('img').attr('src')!),
                     })),
                  playerLevel:
                     $(el)
                        .find('tr:nth-child(2) td')
                        .eq(pos * 2 - 1)
                        .text()
                        .trim() || undefined,
                  evolveItem:
                     (pos - 1 >= 0 &&
                        $(el)
                           .find(`tr:nth-child(4) td`)
                           .eq(pos - 1)
                           .text()
                           .trim()) ||
                     undefined,
               });

               pos++;
            }

            return pokes;
         }),
   };
   return pokemon;
};

const embedFiles = async (pokeData: any) => {
   if (pokeData.types.length > 1) {
      const attachment = await canvasPokemonTypeUnion(
         pokeData.types[0].image,
         pokeData.types[1].image
      );
      return {
         embeds: (await embed(pokeData)).embeds,
         files: [attachment],
      };
   }
   return { embeds: (await embed(pokeData)).embeds };
};
