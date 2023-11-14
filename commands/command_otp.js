import { SlashCommandBuilder } from "discord.js"
import { LolApi, Constants } from "twisted"

const api = new LolApi({
     key: process.env.RIOT_API_KEY,
     limits: {
         allowBursts: true,
         maxBurstRequests: 10,
         maxConcurrentRequests: 10,
    },
})

export const data = new SlashCommandBuilder()
    .setName("otp")
    .setDescription("me dit si je suis un otp ou pas")
    .addStringOption(option => option.setName("summoner").setDescription("l'utilisateur à tester").setRequired(true))

async function masteriesByName(name) {
    const summoner = await api.Summoner.getByName(name, Constants.Regions.EU_WEST)
    const masteries = await api.Champion.masteryBySummoner(summoner.response.id, Constants.Regions.EU_WEST)
    return masteries.response
}

export async function execute(interaction) {
    const name = interaction.options.getString("summoner")
    const masteries = await masteriesByName(name)

    let first = masteries[0]
    let second = masteries[1]
    let third = masteries[2]

    if (first.championPoints < 50000) {
        interaction.reply(name + " : Just another low level player")
    }
    if (first.championPoints > second.championPoints * 5) {
        const champion = await api.DataDragon.getChampion(first.championId)
        interaction.reply(name + " : OTP INCOMING ("+ champion.id + " : " + first.championPoints + " points)")
    } else {
        const champ1 = await api.DataDragon.getChampion(first.championId)
        const champ2 = await api.DataDragon.getChampion(second.championId)
        const champ3 = await api.DataDragon.getChampion(third.championId)
        
        interaction.reply(name + " : Just another player " + 
        "\n\tmain: \t" + champ1.id + " (" + first.championPoints + ")" +
        "\n\tsecond: " + champ2.id + " (" + second.championPoints + ")" +
        "\n\tthird: \t" + champ3.id + " (" + third.championPoints + ")")
    }

}