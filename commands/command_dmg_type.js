import { SlashCommandBuilder } from "discord.js";
import champions from "../helper/champions.json" with { type: "json" };

export const data = new SlashCommandBuilder()
    .setName("dmg-type")
    .setDescription("dit si le perso est ap ou ad")
    .addStringOption(option => option.setName("champ").setDescription("le perso à tester").setRequired(true));

export async function execute(interaction) 
{
    // Get the champion from the interaction
    const champ = interaction.options.getString("champ");

    // Get the champion data from the champion list
    const champData = champions.champions[champ];

    // Check if the champion is in the list
    if (champData == null) 
    {
        // The champion was not found, display an error message
        interaction.reply("Champ not found");
    } 
    else 
    {
        // The champion was found, display the damage type
        interaction.reply(champ + " does " + champData.damage_type + " damage");
    }
}
