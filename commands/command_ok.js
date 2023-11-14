import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ok")
    .setDescription("Ok boomer");

export async function execute(interaction) {
    await interaction.reply("Boomer");
}