import {
   AttachmentBuilder,
   ChatInputCommandInteraction,
   Embed,
   EmbedBuilder,
   Message,
} from 'discord.js';
// import { SkinChampToEmbed } from '../command/commandAllSkinsOfChampLol';
import { embedBuilder } from './getEmbed';

export async function loadinCreator(
   command: Message | ChatInputCommandInteraction,
   exec: Function = function () {},
   sender: Embed | Embed[] | string | AttachmentBuilder | undefined
) {
   if (command instanceof Message) {
      command.reply('Carregando...').then((messageToEdit) => {
         send(messageToEdit, sender, exec).then(() => {});
      });
   }
   if (command instanceof ChatInputCommandInteraction) {
      const intereactionResponse = await command.reply({
         content: 'Carregando',
         ephemeral: false,
      });

      const channel = intereactionResponse.interaction.channel;

      if (channel) {
         const collectionOfMessages = await channel.messages.fetch();
         if (collectionOfMessages) {
            const first = collectionOfMessages.first();
            if (first && first instanceof Message) {
               await send(first, sender, exec);
               if (command.commandName == 'news') await first.react('👎');
               return first;
            }
         }
         return;
      }
      return;
   }
}
async function send(message: Message, sender: any, exec: Function) {
   if (!sender) sender = await exec();

   if (typeof sender == 'string') {
      return await message.edit(sender);
   }
   if (sender instanceof AttachmentBuilder) {
      return await message.edit({ files: [sender] });
   }
   if (sender instanceof EmbedBuilder) {
      return (await message.edit({ embeds: [sender] })).react('👍');
   }
   if (sender && 'icon' in sender) {
      if (sender.skinsArray.length > 10) {
         return await embedChunk(sender, message);
      }
      return await message.edit({ embeds: await embedChunk(sender) });
   }
   return await message.edit({ embeds: sender });
}

async function embedChunk(skinChamp: any, message?: any) {
   const response: { total: number; embeds: EmbedBuilder[] } = {
      total: skinChamp.skinsArray.length,
      embeds: [],
   };

   if (response.total > 10) {
      const arrayIfMoreToTenSkins: any[] = [];
      for (let index = 0; index < skinChamp.skinsArray.length; index++) {
         const skin = skinChamp.skinsArray[index];
         arrayIfMoreToTenSkins.push(
            embedBuilder(
               skin.name,
               skin.chromas,
               skinChamp.icon,
               skin.championName,
               skin.loading,
               skin.skinUrl,
               undefined,
               undefined
            )
         );
      }

      await sendEmbedsInGroups(arrayIfMoreToTenSkins, message!);
      return;
   }

   async function sendEmbedsInGroups(
      embeds: string | any[],
      message: { channel: { send: (arg0: { embeds: any }) => any } }
   ) {
      const chunkSize = 10;
      for (let i = 0; i < embeds.length; i += chunkSize) {
         const embedChunk = embeds.slice(i, i + chunkSize);
         await message.channel.send({ embeds: embedChunk });
      }
   }

   for (const skin of skinChamp.skinsArray) {
      response.embeds.push(
         embedBuilder(
            skin.name,
            skin.chromas,
            skinChamp.icon,
            skin.championName,
            skin.loading,
            skin.skinUrl,
            undefined,
            undefined
         )
      );
   }
   return response.embeds;
}
