import axios from 'axios';
import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import roles from '../../data/json/champRole.json';
import names from '../../data/json/nameslol.json';
import { embedBuilder } from '../util/getEmbed';

export class LoreleagueoflegendsCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('lorelol')
         .setDescription('loreleagueoflegends')
         .addStringOption((options) =>
            options
               .setName('champion')
               .setRequired(true)
               .setDescription('nome do champ')
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const champ = commandMessage.content.replace('*lorelol ', '');
      try {
         if (champ) {
            const lore = await this.getLoreChampionLeagueOfLegends(champ);
            return commandMessage.reply({ embeds: [lore] });
         }
      } catch (error) {
         return;
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const champ = commandSlash.options.getString('champion');
      if (champ) {
         const lore = await this.getLoreChampionLeagueOfLegends(
            champ.toLowerCase()
         );
         return commandSlash.reply({ embeds: [lore] });
      }
   }
   capitalizeChampionName(champName: any) {
      const nameChamp = names;
      let x;
      if (champName in names) {
         let finder: keyof typeof names = champName;
         x = nameChamp[finder];
      }

      function capitalizeFirstLetter(inputString: string) {
         if (typeof inputString !== 'string' || inputString.length === 0) {
            return inputString;
         }

         return (
            inputString.charAt(0).toUpperCase() +
            inputString.slice(1).toLowerCase()
         );
      }

      let champ = capitalizeFirstLetter(champName);
      if (x) {
         champ = x;
      }
      return champ;
   }

   async getLoreChampionLeagueOfLegends(champName: string) {
      const version = await axios.get(
         'https://ddragon.leagueoflegends.com/api/versions.json'
      );

      const champ = this.capitalizeChampionName(champName);

      const json = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/data/pt_BR/champion/${champ}.json`;

      const icone = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/img/champion/${champ}.png`;

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

      champName = champdata[champ].name;

      return embedBuilder(
         `****Lore de ${champName} ${title}****`,
         `
           **Se quiser saber as skill's**
           *skill ${champName}
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
         champName,
         loading,
         splash
      );
   }
}
