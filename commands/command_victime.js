import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("victime")
    .setDescription("je suis une victime");

export async function execute(interaction) {
    await interaction.reply("Je suis une victime");
}