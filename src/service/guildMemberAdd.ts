import { GuildMember } from 'discord.js';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { embedBuilder } from '../util/getEmbed';
import { logDate } from '../util/logDate';
import { env } from './../envs';

export class GuildMemberAdd {
   private _welcomeChannel: string = env.CHANNELWELCOMENAME || 'bem-vindo';
   private _rolesChannel: string = env.CHANNELROLESNAME || 'cargos';
   private _rulesChannel: string = env.CHANNELRULESNAME || 'regras';

   constructor(newMember: GuildMember) {
      this.SendWelcome(newMember).then(() => {
         console.log(
            logDate() +
               'Novo membro adicionado a Guilda!: ' +
               newMember.displayName
         );
      });
   }

   async SendWelcome(newMember: GuildMember) {
      const bem = await channelItsGuildTextChannel(
         newMember.guild.channels.cache.find((channel) =>
            channel.name.includes(this._welcomeChannel)
         )
      );
      const regras = await channelItsGuildTextChannel(
         newMember.guild.channels.cache.find((channel) =>
            channel.name.includes(this._rulesChannel)
         )
      );
      const cargos = await channelItsGuildTextChannel(
         newMember.guild.channels.cache.find((channel) =>
            channel.name.includes(this._rolesChannel)
         )
      );

      if (bem) {
         await bem.send({
            embeds: [
               embedBuilder(
                  `Seja Bem vindo ${newMember.user.username}`,
                  `${newMember}
    Nossa regras estão aqui:${regras}
    Precisar de ajuda digite *ajuda ou use /ajuda
    Não esqueça de pegar seu cargo no :${cargos}`,
                  newMember.user.avatarURL() || undefined,
                  newMember.user.tag,
                  newMember.user.avatarURL() || undefined,
                  'https://i.im.ge/2021/11/03/oN8EiT.png',
                  newMember.displayHexColor
               ),
            ],
         });
      }
   }
}
