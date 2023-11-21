import { GuildTextBasedChannel } from "discord.js";
import dotenv from "dotenv";

import { googleImagePensador } from "../../../googleImage";
import { IPensador } from "../../interfaces/PensadorMessage";
import { pensador } from "../../util/pensador";

dotenv.config();

export const sendLoveMessageDaily = async (
  channelLove: GuildTextBasedChannel
) => {
  try {
    const data: IPensador = await pensador.getFromAmor();
    await googleImagePensador(
      { embedTitle: data.author, embedColor: "#AF0F8F" },
      data,
      undefined,
      channelLove
    );
  } catch (error) {
    console.log(error);
  }
};
