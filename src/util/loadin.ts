import {
   AttachmentBuilder,
   ChatInputCommandInteraction,
   Embed,
   Message,
} from 'discord.js';

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
      command.reply('carregando').then((interactionResponse) => {
         interactionResponse.interaction.channel?.messages
            .fetch()
            .then((CollectionOfMessages) => {
               const first = CollectionOfMessages.first();
               if (first instanceof Message) {
                  send(first, sender, exec).then(() => {});
               }
            });
      });
   }
}
async function send(
   message: Message,
   sender: Embed | Embed[] | string | AttachmentBuilder | undefined,
   exec: Function
) {
   if (!sender) sender = await exec();
   if (typeof sender == 'string') {
      return await message.edit(sender);
   }
   if (sender instanceof AttachmentBuilder) {
      return await message.edit({ files: [sender] });
   }
   if (sender instanceof Embed) {
      return await message.edit({ embeds: [sender] });
   }
   return await message.edit({ embeds: sender });
}
