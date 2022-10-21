"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserStatus = void 0;
const axios_1 = __importDefault(require("axios"));
const nameslol_json_1 = __importDefault(require("../../data/json/nameslol.json"));
const client_1 = require("../client/client");
const commandHour_1 = require("../command/commandHour");
const channelItsGuildTextChannel_1 = require("./channelItsGuildTextChannel");
const getEmbed_1 = require("./getEmbed");
exports.verifyUserStatus = client_1.client.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (oldPresence?.equals(newPresence))
        return;
    const guildId = process.env.GUILD;
    if (guildId === undefined)
        return;
    try {
        if (oldPresence &&
            newPresence &&
            !oldPresence.user?.bot &&
            oldPresence.guild?.id === guildId) {
            if (oldPresence?.userId) {
                const userSend = await client_1.client.users.fetch(oldPresence.userId);
                if (newPresence.activities.length > 0 &&
                    newPresence.activities[0].details) {
                    const activities = newPresence.activities;
                    await hours(userSend, activities);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
const hours = async (user, activities) => {
    var { getNameWeek, dia_sem, str_data, str_hora } = (0, commandHour_1.hourNow)();
    if (activities[0].assets?.largeText &&
        activities[0].name === 'League of Legends') {
        const guildID = await client_1.client.guilds.fetch(process.env.GUILD || '');
        const channelLeague = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.LEAGUE || ''));
        const { icone, splash, loading, champ, porofessorUrl } = await leagueoflegendsChamp(activities[0].assets.largeText);
        if (!channelLeague)
            return;
        const messageEdited = channelLeague.send({
            embeds: [
                (0, getEmbed_1.embedBuilder)(`Builds para ` + activities[0].assets.largeText, ` ${user}
          
          ${activities[0].details}
          Estado: ${activities[0].state}
          **Clique no titulo para abrir porofessor**
              são : ${str_hora}
              `, icone, champ, loading, undefined, 'Random', porofessorUrl),
            ],
        });
        // (await messageEdited).react('✅');
        // client.on('messageReactionAdd', async (reaction, userReact) => {
        //   if (user != userReact) return;
        //   if (reaction.message.id != (await messageEdited).id) return;
        //   if (reaction.partial) {
        //     try {
        //       await reaction.fetch();
        //     } catch (error) {
        //       console.error(
        //         'Something went wrong when fetching the message:',
        //         error,
        //       );
        //       return;
        //     }
        //   }
        //   if (reaction.emoji.name === '✅') {
        //     const usersNicks: any = await users();
        //     for (const userNick of usersNicks) {
        //       let u: IUser = userNick;
        //       u.nickLol;
        //       if (user.id === userNick.id) {
        //         channelLeague.send(
        //           `https://porofessor.gg/pt/live/br/${u.nickLol.replace(
        //             / /g,
        //             '%20',
        //           )}`,
        //         );
        //       } else {
        //         return;
        //       }
        //     }
        //   }
        // });
        return;
    }
    async function leagueoflegendsChamp(champ) {
        const nameChamp = nameslol_json_1.default;
        const x = nameChamp[champ.toLowerCase()];
        if (x) {
            champ = x;
        }
        else {
            champ = champ.split(' ').join('');
        }
        const version = await axios_1.default.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const icone = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/img/champion/${champ}.png`;
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
