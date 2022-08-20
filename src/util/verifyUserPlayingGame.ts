import axios from 'axios';
import { Activity, Channel, User } from 'discord.js';

import names from '../../data/json/nameslol.json';
import { client } from '../client/client';
import { getNameWeek, hourNow } from '../command/commandHour';
import { IUser } from '../interfaces/User';
import { users } from '../service/users/usersDatabase';
import { channelItsGuildTextChannel } from './channelItsGuildTextChannel';
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
        if (oldPresence?.userId) {
          const userSend = await client.users.fetch(oldPresence.userId);
          if (
            newPresence.activities.length > 0 &&
            newPresence.activities[0].details
          ) {
            const activities = newPresence.activities;
            await hours(userSend, activities);
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

  if (
    activities[0].assets?.largeText &&
    activities[0].name === 'League of Legends'
  ) {
    const guildID = await client.guilds.fetch(process.env.GUILD || '');
    const channelLeague: Channel | null = await channelItsGuildTextChannel(
      guildID.channels.resolve(process.env.LEAGUE || ''),
    );
    const {
      icone,
      splash,
      loading,
      champ,
      porofessorUrl,
    } = await leagueoflegendsChamp(activities[0].assets.largeText);
    if (!channelLeague) return;
    const messageEdited = channelLeague.send({
      embeds: [
        embedBuilder(
          'Builds para ' + activities[0].assets.largeText,
          ` ${activities[0].details}
          Estado: ${activities[0].state}
          **Clique no titulo para abrir porofessor**
              são : ${str_hora}
              selecione para pegar a fila do porofessor '✅'
              `,

          icone,
          champ,
          loading,
          splash,
          'Random',
          porofessorUrl,
        ),
      ],
    });
    (await messageEdited).react('✅');
    channelLeague.send(`${user}`);
    client.on('messageReactionAdd', async (reaction, userReact) => {
      if (user != userReact) return;
      if (reaction.message.id != (await messageEdited).id) return;
      if (reaction.partial) {
        try {
          await reaction.fetch();
        } catch (error) {
          console.error(
            'Something went wrong when fetching the message:',
            error,
          );
          return;
        }
      }
      if (reaction.emoji.name === '✅') {
        const usersNicks: any = await users();
        for (const userNick of usersNicks) {
          let u: IUser = userNick;
          u.nickLol;

          if (user.id === userNick.id) {
            channelLeague.send(
              `'https://porofessor.gg/pt/live/br/${u.nickLol.replace(
                / /g,
                '%20',
              )}'`,
            );
          } else {
            return;
          }
        }
      }
    });

    return;
  }

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
    const loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg`;
    const splash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`;

    const porofessorUrl = `https://www.leagueofgraphs.com/pt/champions/builds/${champ.toLowerCase()}`;

    return {
      icone,
      loading,
      splash,
      champ,
      porofessorUrl,
    };
  }
};
