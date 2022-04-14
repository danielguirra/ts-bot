import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction, Message } from "discord.js";
import { embedBuilder } from "../util/getEmbed";
import { CommandBuilder } from "./commandBuilder";





export const ping = {
    data: new SlashCommandBuilder().setName('ts').setDescription('teste tyscript slash'),
    async execute(interaction: any) {
        console.log('foi opa comando')
        if (interaction.type === 'DEFAULT') {
            console.log('foi message')
            return interaction.reply({ embeds: [embedBuilder('TypeScript', "UgaTeste")] })
        } else {
            console.log('foi interaction')
            return interaction.reply({ embeds: [embedBuilder('TypeScript', "UgaTeste")] })
        }
    }
}

