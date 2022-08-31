import { InteractionType } from 'discord.js';

import { client } from '../client/client';
import { commands } from '../command/Builder';
import { logDate } from './logDate';

export const interactionCreate = client.on(
  'interactionCreate',

  async interaction => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      if (!interaction.isChatInputCommand()) return;
      const command: any = commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.executeSlashCommand(interaction);

        console.log(
          logDate +
            'Comando Slash: ' +
            (await command.data.name) +
            ' foi usado',
        );
      } catch (error) {
        return;
      }
    }
  },
);
