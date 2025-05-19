import axios from 'axios';
import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';
import names from '../../data/json/nameslol.json';
import { loadinCreator } from '../util/loadin';

export class SkinsLolCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('skinlol')
         .setDescription(
            'Obtenha todas skins do personagem do jogo league of legends'
         )
         .addStringOption((options) =>
            options
               .setName('champion')
               .setDescription('Campeão do League retornar as skins')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const championName = commandMessage.content
         .replace('*skinlol', '')
         .trim();
      try {
         if (championName) {
            return loadinCreator(
               commandMessage,
               async () => {
                  return await LeagueOfLegendsSkins.SkinsBasedInChampName(
                     championName
                  );
               },
               undefined
            );
         }
      } catch (error) {
         commandMessage.reply('Erros');
      }
      return;
   }
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const championName = commandSlash.options.getString('champion');
      try {
         if (championName) {
            return loadinCreator(
               commandSlash,
               async () => {
                  return await LeagueOfLegendsSkins.SkinsBasedInChampName(
                     championName
                  );
               },
               undefined
            );
         }
         return;
      } catch (error) {
         await commandSlash.reply('tive um erro');
      }
   }
}

class LeagueOfLegendsSkins {
   static async SkinsBasedInChampName(champName: string) {
      try {
         const version = await axios.get(
            'https://ddragon.leagueoflegends.com/api/versions.json'
         );

         const champ = capitalizeChampionName(champName);

         const json = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/data/pt_BR/champion/${champ}.json`;

         const responseApi = await axios.get(json);
         const dataChampion = await responseApi.data.data;
         const key = Object.keys(dataChampion)[0];
         const skinsArray: Skin[] = dataChampion[key].skins;

         for (let index = 0; index < skinsArray.length; index++) {
            skinsArray[index].championName = dataChampion[key].name;
            const num = skinsArray[index].num;
            skinsArray[
               index
            ].skinUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${key}_${num}.jpg`;

            skinsArray[
               index
            ].loading = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${key}_${num}.jpg`;

            if (skinsArray[index].chromas) {
               skinsArray[index].chromas = 'A skin possui chromas';
            } else {
               skinsArray[index].chromas = 'A skin não possui chromas';
            }

            if (skinsArray[index].name == 'default') {
               skinsArray[index].name =
                  dataChampion[key].name + ' ' + dataChampion[key].title;
               skinsArray[
                  index
               ].chromas = `${dataChampion[key].name} possui um total de ${skinsArray.length} skins`;
            }
         }
         const icon = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/img/champion/${champ}.png`;
         return {
            icon,
            skinsArray,
         };
      } catch (error) {
         console.error(error);
         return `Não foi possivel achar o Campeão **${champName}**`;
      }
   }
}
export type SkinChampToEmbed = {
   icon: string;
   skinsArray: Skin[];
};
type Skin = {
   championName: string;
   idSkin: string;
   num: number;
   name: string;
   chromas: string;
   skinUrl: string;
   loading: string;
};

function capitalizeChampionName(champName: any) {
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
