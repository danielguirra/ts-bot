import {
   GuildTextBasedChannel,
   Message,
   SlashCommandBuilder,
} from 'discord.js';
import * as fs from 'fs';

import { embedBuilder } from '../../src/util/getEmbed';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { Command } from '../interfaces/Command';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const queuqlol: Command = {
   data: new SlashCommandBuilder()
      .setName('queuqlol')
      .setDescription('queuqlol')
      .addStringOption((options) =>
         options
            .setName('nicklol')
            .setRequired(true)
            .setDescription('nick lol for queuq')
      )

      .addStringOption((options) =>
         options
            .setName('region')
            .setDescription('select region by default BR')
            .setRequired(true)
            .addChoices({
               name: 'BRASIL',
               value: 'br1',
            })
      )
      .addStringOption((options) =>
         options
            .setName('token')
            .setDescription('token for search')
            .setRequired(true)
      ),

   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply('somente em slash');
   },

   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const nick = commandSlash.options.getString('nicklol');
      let region = commandSlash.options.getString('region');

      if (region === null) {
         region = 'br1';
      }

      return commandSlash.reply('Carregando').then(async (f) => {
         if (nick === null) return;
         if (region === null) return;
         const ge = await getQueuq(nick, region);
         const channel = await channelItsGuildTextChannel(commandSlash.channel);
         if (channel === null) return;
         const sender = await embedBuilderForLol(ge, channel);
         const id = f.id;
         const delter = channel.messages.fetch(id);
         (await delter).delete();
      });
   },
};

async function getQueuq(nickLol: string, region: string) {
   // const getter = await axios.get(
   //   `http://localhost:3001/match/live/?region=${region}&nick=${nickLol}`,
   //   {
   //     headers: {
   //       api_key: "RGAPI-2f0be7b8-b999-4f2b-b9ff-a23db6a960a4",
   //     },
   //   }
   // );

   const getter = JSON.parse(fs.readFileSync('./queuq.json', 'utf-8'));
   return getter;
}

async function embedBuilderForLol(queuq: any, channel: GuildTextBasedChannel) {
   try {
      let players: any = [];
      let embeds: any[] = [];

      for (const player of queuq.participants) {
         players.push({
            nick: player.summonerName,
            championName: player.championInfo.champion.name,
            championMasteryPoints: player.championInfo.mastery.championPoints,
            championMasteryLevel: player.championInfo.mastery.championLevel,
            image: player.championInfo['champion'].image,
            rank: player.rank,
         });
      }

      for (let index = 0; index < 10; index++) {
         const iterator = players[index];
         let rank = queuq.participants[index].rank;
         if (rank.length > 1) {
            rank =
               `${rank[0].queueType}: ` +
               `**${rank[0].tier}**` +
               ' ' +
               `**${rank[0].rank}**` +
               `\n*W* - ${rank[0].wins}` +
               `\n*L* - ${rank[0].losses}` +
               `\n*PDL* - ${rank[0].leaguePoints}` +
               `
          \n${rank[1].queueType}: ` +
               `**${rank[1].tier}**` +
               ' ' +
               `**${rank[1].rank}**` +
               `\n*W* - ${rank[1].wins}` +
               `\n*L* - ${rank[1].losses}` +
               '\n ' +
               `*PDL* - ${rank[1].leaguePoints}`;
         } else {
            rank =
               `${rank[0].queueType}: ` +
               `**${rank[0].tier}**` +
               ' ' +
               `**${rank[0].rank}**` +
               `\n*W* - ${rank[0].wins}` +
               `\n*L* - ${rank[0].losses}` +
               `\n*PDL* - ${rank[0].leaguePoints}`;
         }
         if (index < 5) {
            embeds.push(
               embedBuilder(
                  `${iterator.nick}`,
                  `
            *Champ*: **${iterator.championName}**
            *Mastery Level*: **${iterator.championMasteryLevel}**
            *Mastery Points*: **${iterator.championMasteryPoints}**
            \n
            ${rank}`,
                  iterator.image.small,
                  iterator.nick,
                  iterator.image.small,
                  undefined,
                  'Blue',
                  undefined
               )
            );
         } else {
            embeds.push(
               embedBuilder(
                  `${iterator.nick}`,
                  `
            *Champ*: **${iterator.championName}**
            *Mastery Level*: **${iterator.championMasteryLevel}**
            *Mastery Points*: **${iterator.championMasteryPoints}**
            \n
            ${rank}`,
                  iterator.image.small,
                  iterator.nick,
                  iterator.image.small,
                  undefined,
                  'Red',
                  undefined
               )
            );
         }
      }

      return channel.send({ embeds });
   } catch (error) {
      console.error(error);
   }
}
