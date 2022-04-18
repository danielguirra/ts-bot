import { client } from '../client/client';
import { commands } from '../command/commandBuilder';

export const interactionCreate = client.on('interaction', async interaction => {
  if (!interaction.isCommand()) return;
  const command: any = commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.executeSlashCommand(interaction);
  } catch (error) {
    return;
  }
});
