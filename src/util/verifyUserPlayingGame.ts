import axios from "axios";
import { Activity, Channel, User } from "discord.js";

import names from "../../data/json/nameslol.json";
import { client } from "../client/client";
import { hourNow } from "../command/commandHour";
import { channelItsGuildTextChannel } from "./channelItsGuildTextChannel";
import { embedBuilder } from "./getEmbed";

export const verifyUserStatus = client.on(
  "presenceUpdate",
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
      console.error(error);
    }
  }
);

const hours = async (user: User, activities: Array<Activity>) => {
  let { str_hora } = hourNow();
  if (user.username == "danielguirra") {
    if (
      activities[0].assets?.largeText &&
      activities[0].name === "League of Legends"
    ) {
      const guildID = await client.guilds.fetch(process.env.GUILD || "");
      const channelLeague: Channel | null = await channelItsGuildTextChannel(
        guildID.channels.resolve(process.env.LEAGUE || "")
      );
      const { icone, splash, loading, champ, porofessorUrl } =
        await leagueoflegendsChamp(activities[0].assets.largeText);
      if (!channelLeague) return;
      await channelLeague.send({
        embeds: [
          embedBuilder(
            `Builds para ` + activities[0].assets.largeText,
            ` ${user}
          
          ${activities[0].details}
          Estado: ${activities[0].state}
          **Clique no titulo para abrir porofessor**
              são : ${str_hora}
              `,

            icone,
            champ,
            loading,
            undefined,
            "Random",
            porofessorUrl
          ),
        ],
      });

      await user.send({
        embeds: [
          embedBuilder(
            `Builds para ` + activities[0].assets.largeText,
            ` ${user}
          
          ${activities[0].details}
          Estado: ${activities[0].state}
          **Clique no titulo para abrir porofessor**
              são : ${str_hora}
              `,

            icone,
            champ,
            loading,
            undefined,
            "Random",
            porofessorUrl
          ),
        ],
      });

      return;
    }
  }

  async function leagueoflegendsChamp(champ: string) {
    const nameChamp: any = names;
    const x = nameChamp[champ.toLowerCase()];
    if (x) {
      champ = x;
    } else {
      champ = champ.split(" ").join("");
    }

    const version = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const icone = `http://ddragon.leagueoflegends.com/cdn/${version["data"][0]}/img/champion/${champ}.png`;
    const loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champ}_0.jpg`;
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
