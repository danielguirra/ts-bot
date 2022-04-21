import dotenv from 'dotenv';

import { client } from '../client/client';
import { commands } from '../command/Builder';

dotenv.config();

const prefix = process.env.PREFIX;

export const messageCreate = client.on('messageCreate', async message => {
  const args: any = message.content.slice(prefix?.length).trim().split(/ +/);
  const command = args[0].toLowerCase();
  if (!command) return;
  try {
    await commands.get(command).executeMessageCommand(message);
  } catch (error) {
    return;
  }
});
