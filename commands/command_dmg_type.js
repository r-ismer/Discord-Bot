import { SlashCommandBuilder } from "discord.js";
import champions from "../helper/chamions.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
    .setName("dmg-type")
    .setDescription("dit si le perso est ap ou ad")
    .addStringOption(option => option.setName("champ").setDescription("le perso à tester").setRequired(true));

export async function execute(interaction) {
    const champ = interaction.options.getString("champ");

    console.log(champ);
    console.log(JSON.stringify(champions))
    console.log(JSON.stringify(champions.champions))

    if (champions.champions.champ == null) {
        interaction.reply({ content: "champ not found", ephemeral: true });
        return;
    }
    const champData = chapions.champions[champ];
    if (champData) {
        interaction.reply({ content: champData.dmgType, ephemeral: true });
    } else {
        interaction.reply({ content: "champ not found", ephemeral: true });
    }
}