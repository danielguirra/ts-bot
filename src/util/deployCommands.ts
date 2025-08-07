import { REST } from '@discordjs/rest';
import {
   RESTPostAPIChatInputApplicationCommandsJSONBody,
   Routes,
} from 'discord.js';

import { console } from 'inspector';
import { commands } from '../command/builder';
import { env } from '../envs';
import { logDate } from './logDate';

export class Deploy {
   private _clientId: string = env.CLIENTID;
   private _guildId: string = env.GUILD;
   private _rest: REST = new REST({ version: '10' }).setToken(
      env.BOTTOKEN || ''
   );
   private _commandsToDeployOnJSON: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
      [];

   constructor() {
      if (!this._clientId) throw new Error('Verify Envs');
      this.ListCommands();
      this.PostCommands()
         .then(() => {
            console.log(
               logDate() + 'Comandos globais registrados (disponíveis em DMs)'
            );
         })
         .catch((err) => console.error(err));
   }

   ListCommands() {
      for (const commad of commands) {
         this._commandsToDeployOnJSON.push(commad[1].toJSON());
      }
   }

   async PostCommands() {
      await this._rest.put(Routes.applicationCommands(this._clientId), {
         body: this._commandsToDeployOnJSON,
      });
   }
}
