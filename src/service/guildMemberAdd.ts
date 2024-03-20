import { RoleResolvable } from 'discord.js';

import { client } from '../client/client';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { embedBuilder } from '../util/getEmbed';
import { env } from '../envs';

export const guildMemberAdd = client.on('guildMemberAdd', async (newMember) => {
   const bem = await channelItsGuildTextChannel(
      newMember.guild.channels.cache.find((channel) =>
         channel.name.includes('bem-vindo')
      )
   );
   const regras = await channelItsGuildTextChannel(
      newMember.guild.channels.cache.find((channel) =>
         channel.name.includes('regras')
      )
   );
   const cargos = await channelItsGuildTextChannel(
      newMember.guild.channels.cache.find((channel) =>
         channel.name.includes('cargos')
      )
   );
   if (bem) {
      const sender = bem.send({
         embeds: [
            embedBuilder(
               `Seja Bem vindo ${newMember.displayName}`,
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
});
