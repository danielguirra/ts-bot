import { Interaction, Message, SlashCommandBuilder } from 'discord.js';
import { getPokemon, Pokemon } from 'pkmonjs';

import { embedBuilder } from '../../src/util/getEmbed';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const pokedex = {
  data: new SlashCommandBuilder()
    .setName('pokedex')
    .setDescription('pokedex')
    .addStringOption(option =>
      option
        .setDescription('pokemon name')
        .setName('pokemon')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const poke = commandMessage.content.replace('*pokedex ', '');
    try {
      const pokedex = await getPokemon(poke);
      const embed = embedBuilderPokedex(pokedex);

      return commandMessage.reply({ embeds: [embed] });
    } catch (error) {
      return commandMessage.reply('verify pokemon name');
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const poke = commandSlash.options.getString('pokemon');

    if (poke) {
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (channel) {
        const sender = commandSlash.reply('Pesquisando...').then(async () => {
          const last = channel.lastMessage;
          try {
            const pokedex = await getPokemon(poke);
            const embed = embedBuilderPokedex(pokedex);
            last?.edit({ embeds: [embed] });
          } catch (error) {
            last?.edit('verify pokemon name');
          }
        });
      }
    }
  },
};

function embedBuilderPokedex(pokemon: Pokemon) {
  return embedBuilder(
    pokemon.name.toLocaleUpperCase(),
    `${pokemon.description}
   
    *Status:*
    Hit-points:${pokemon.stats.hp}❤
    Attack:${pokemon.stats.attack}⚔
    Defense:${pokemon.stats.defense}🛡
    Special Attack:${pokemon.stats.specialAttack}☄
    Special Defense:${pokemon.stats.specialDefense}🌟
    Speed:${pokemon.stats.speed}💨
    Height:${pokemon.stats.height}🏔
    Weight:${pokemon.stats.weight}⚖

    Habitat:${pokemon.habitat.name}

    Generation:${pokemon.generation.name}

    `,
    pokemon.image.default,
    pokemon.name,
    pokemon.image.default,
    pokemon.image.default,
    'Red',
    'https://www.pokemon.com/br/pokedex/' + pokemon.name,
  );
}
