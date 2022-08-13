import axios from 'axios';
import { Activity, User } from 'discord.js';

import names from '../../data/json/nameslol.json';
import { client } from '../client/client';
import { getNameWeek, hourNow } from '../command/commandHour';
import { embedBuilder } from './getEmbed';

export const verifyUserStatus = client.on(
  'presenceUpdate',
  async (oldPresence, newPresence) => {
    if (oldPresence?.equals(newPresence)) return;
    const guildId = process.env.GUILD;
    if (guildId === undefined) return;
    try {
      if (
        oldPresence &&
        newPresence &&
        !oldPresence.user?.bot &&
        oldPresence.guild?.id === guildId
      ) {
        if (oldPresence?.userId === '409772439137026050') {
          const userSend = await client.users.fetch(oldPresence.userId);
          if (
            newPresence.activities.length > 0 &&
            newPresence.activities[0].details
          ) {
            const activities = newPresence.activities;
            await hours(userSend, activities);
            console.log('Foi enviado');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
);

const hours = async (user: User, activities: Array<Activity>) => {
  var { getNameWeek, dia_sem, str_data, str_hora } = hourNow();
  user.send({
    embeds: [
      embedBuilder(
        'Você está Jogando ' + activities[0].name,
        ` ${activities[0].details}
          Estado: ${activities[0].state}
              são : ${str_hora}`,
      ),
    ],
  });

  if (activities[0].assets?.largeText) {
    const {
      icone,
      splash,
      loading,
      champ,
      porofessorUrl,
    } = await leagueoflegendsChamp(activities[0].assets.largeText);
    user.send({
      embeds: [
        embedBuilder(
          'Você está Jogando ' +
            activities[0].name +
            ' Com ' +
            activities[0].assets.largeText,
          ` ${activities[0].details}
          Estado: ${activities[0].state}
          **Clique no titulo para abrir porofessor**
              são : ${str_hora}`,
          icone,
          champ,
          loading,
          splash,
          'Random',
          porofessorUrl,
        ),
      ],
    });
  }
  return;
};

async function leagueoflegendsChamp(champ: string) {
  const nameChamp: any = names;
  const x = nameChamp[champ];

  if (x) {
    champ = x;
  }
  champ = champ.split(' ').join('');

  const version = await axios.get(
    'https://ddragon.leagueoflegends.com/api/versions.json',
  );
  const icone = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/img/champion/${champ}.png`;
  const json = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/data/pt_BR/champion/${champ}.json`;
  const loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg`;
  const splash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`;

  const response = await axios.get(json);
  const data = await response.data;
  const porofessorUrl = `https://www.leagueofgraphs.com/pt/champions/builds/${champ.toLowerCase()}`;
  const champdata = data.data;

  return {
    icone,
    loading,
    splash,
    champ,
    porofessorUrl,
  };
}
