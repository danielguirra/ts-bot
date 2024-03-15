import { GuildTextBasedChannel } from "discord.js";

import { googleImagePensador } from "../../../googleImage";
import { IPensador } from "../../interfaces/PensadorMessage";
import { pensador } from "../../util/pensador";

export const sendDaily = async (channelDaily: GuildTextBasedChannel) => {
  try {
    const data: IPensador = await pensador.getFromMotivacionais();
    await googleImagePensador(
      { embedTitle: data.author },
      data,
      undefined,
      channelDaily
    );
  } catch (error) {
    console.log(error);
  }
};
