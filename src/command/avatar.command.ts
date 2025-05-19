import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

export class AvatarCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('avatar')
         .setDescription('Pega o Avatar do Usuario')
         .addUserOption((userOption) =>
            userOption
               .setName('user')
               .setDescription('cidadão')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const user = commandMessage.mentions.users.first();
      if (user) {
         return commandMessage.reply(
            user.displayAvatarURL({ extension: 'png' })
         );
      }
      return;
   }

   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;

      const user = commandSlash.options.getUser('user');

      if (user) {
         return commandSlash.reply(user.displayAvatarURL({ extension: 'png' }));
      }
      return;
   }
}
