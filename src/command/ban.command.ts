import {
   CommandInteraction,
   Guild,
   Interaction,
   Message,
   SlashCommandBuilder,
   User,
} from 'discord.js';

export class BanCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('ban')
         .setDescription('Bane o mencionado')
         .addUserOption((options) =>
            options
               .setName('target')
               .setDescription('cara a ser banido')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const guild = commandMessage.guild;
      const user = commandMessage.mentions.users.first();

      const ban = await this.banUser(user, guild);

      if (ban) {
         return commandMessage.reply({
            content: `${user} foi banido com sucesso por ${commandMessage.author.tag}`,
         });
      } else {
         return commandMessage.reply({ content: `não posso banir o :${user}` });
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const guild = commandSlash.guild;
      const user = commandSlash.options.getUser('target') || undefined;

      const ban = await this.banUser(user, guild);

      if (ban) {
         return commandSlash.reply({
            content: `${user} foi banido com sucesso por ${commandSlash.user}`,
         });
      } else {
         return commandSlash.reply({ content: `não posso banir o :${user}` });
      }
   }

   async banUser(user: User | undefined, guild: Guild | null) {
      if (user && guild) {
         const ban = await guild.members.ban(user);
         return true;
      } else {
         return false;
      }
   }
}
