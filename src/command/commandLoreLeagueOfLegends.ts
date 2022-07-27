import axios from 'axios';
import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

import roles from '../../data/json/champRole.json';
import names from '../../data/json/nameslol.json';
import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const loreleagueoflegends = {
  data: new SlashCommandBuilder()
    .setName('loreleagueoflegends')
    .setDescription('loreleagueoflegends')
    .addStringOption(options =>
      options
        .setName('champion')
        .setRequired(true)
        .setDescription('nome do champ'),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const champ = commandMessage.content.replace('*lore ', '');
    if (champ) {
      const lore = await getLore(champ);
      return commandMessage.reply({ embeds: [lore] });
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const champ: any = commandSlash.options.get('champion');
    if (champ) {
      const lore = await getLore(champ);
      return commandSlash.reply({ embeds: [lore] });
    }
  },
};

async function getLore(champ: string) {
  const nameChamp: any = names;
  const x = nameChamp[champ];

  if (x) {
    champ = x;
  }
  champ = champ.at(0) + champ.substring(champ.length, 1);

  const version = await axios.get(
    'https://ddragon.leagueoflegends.com/api/versions.json',
  );
  const icone = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/img/champion/${champ}.png`;
  const json = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/data/pt_BR/champion/${champ}.json`;
  const loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg`;
  const splash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`;

  const response = await axios.get(json);
  const data = await response.data;
  const champdata = data.data;

  const lore = JSON.stringify(champdata[`${champ}`]['lore']);
  let role = JSON.stringify(champdata[`${champ}`]['tags'][0]);
  let role2 = JSON.stringify(champdata[`${champ}`]['tags'][1]);

  const rolesObjc: any = roles;

  role = role.substring(1);
  role = role.replace(/.$/, '');
  role = rolesObjc[role];

  if (role2) {
    //Caso o champ possua uma unica role
    role2 = role2.substring(1);
    role2 = role2.replace(/.$/, '');
    role2 = rolesObjc[role2];
  } else {
    role2 = 'Unica função';
  }
  let dica = JSON.stringify(champdata[`${champ}`]['allytips']);
  dica = dica.substring(1);
  dica = dica.replace(/.$/, '');
  let title = JSON.stringify(champdata[`${champ}`]['title']);
  title = title.substring(1);
  title = title.replace(/.$/, '');
  let fraqueza = JSON.stringify(champdata[`${champ}`]['enemytips']);
  fraqueza = fraqueza.substring(1);
  fraqueza = fraqueza.replace(/.$/, '');

  return embedBuilder(
    `****Lore de ${champ} ${title}****`,
    `
        **Se quiser saber as skill's**
        *skill ${champ}
        ---------------
        **Lore**: ${lore}
        ---------------
        **Posição**: **\n${role}\n${role2}**
        ---------------
        **Como Jogar**: ${dica}
        ---------------
        **Como enfrentar** : ${fraqueza}
        
        `,
    icone,
    champ,
    loading,
    splash,
  );
}
