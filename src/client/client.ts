import { Client, GatewayIntentBits, Partials } from 'discord.js';

export const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,
   ],
   partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
