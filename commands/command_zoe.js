import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("zoe")
    .setDescription("Mais qui est la meilleure Zoe EUW ?");

export async function execute(interaction) {
    await interaction.reply("Koutetsu est vraiment la meilleur Zoé EUW (meileur que Xélowak)");
}