import { SlashCommandBuilder } from "discord.js";
import champions from "../helper/chamions.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
    .setName("dmg-type")
    .setDescription("dit si le perso est ap ou ad")
    .addStringOption(option => option.setName("champ").setDescription("le perso à tester").setRequired(true));

export async function execute(interaction) {
    const champ = interaction.options.getString("champ");

    const champData = champions.champions[champ];
    if (champData == null) {
        interaction.reply("Champ not found");
    } else {
        interaction.reply(champ + " does " + champData.damage_type + " damage");
    }
}
