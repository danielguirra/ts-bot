import { client } from '../client/client';
import { commands } from '../command/Builder';

export const interactionCreate = client.on(
  'interactionCreate',
  async interaction => {
    if (!interaction.isCommand()) return;
    const command: any = commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.executeSlashCommand(interaction);
      console.log('Comando : ' + (await command.data.name) + ' foi usado');
    } catch (error) {
      return;
    }
  },
);
