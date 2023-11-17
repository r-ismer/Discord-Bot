import { SlashCommandBuilder } from "discord.js"
import { LolApi, Constants} from "twisted"

const api = new LolApi({
     key: process.env.RIOT_API_KEY,
     limits: {
         allowBursts: true,
         maxBurstRequests: 10,
         maxConcurrentRequests: 10,
    },
})

const regions = {
    "BR": Constants.Regions.BRAZIL,
    "EUNE": Constants.Regions.EU_EAST,
    "EUW": Constants.Regions.EU_WEST,
    "KR": Constants.Regions.KOREA,
    "LAN": Constants.Regions.LAT_NORTH,
    "LAS": Constants.Regions.LAT_SOUTH,
    "NA": Constants.Regions.AMERICA_NORTH,
    "OCE": Constants.Regions.OCEANIA,
    "TR": Constants.Regions.TURKEY,
    "RU": Constants.Regions.RUSSIA,
    "JP": Constants.Regions.JAPAN,
    "PBE": Constants.Regions.PBE,
}

export const data = new SlashCommandBuilder()
    .setName("otp")
    .setDescription("me dit si je suis un otp ou pas")
    .addStringOption(option => option.setName("summoner").setDescription("l'utilisateur à tester").setRequired(true))
    .addStringOption(option => option.setName("region").setDescription("la région de l'utilisateur").setRequired(false))

export async function execute(interaction) {
    

    // get region from interaction
    var region = null
    if (interaction.options.getString("region") == null) {
        region = regions.EUW
    } else if (interaction.options.getString("region") in regions) {
        region = regions[interaction.options.getString("region")]
    } else {
        interaction.reply("Region not found: " + interaction.options.getString("region"))
        return
    }
    
    // get summoner from interaction
    const name = interaction.options.getString("summoner")
    var summoner = null
    var resp = null

    // get summoner from riot api
    try {
        summoner = await api.Summoner.getByName(name, region)
    } catch (e) {
        console.log(e)
        interaction.reply("Summoner not found: " + e)
        return
    }

    // get summoner masteries from riot api
    try {
        resp = await api.Champion.masteryBySummoner(summoner.response.id, region)
    } catch (e) {
        console.log(e)
        interaction.reply("Masteries not found: " + e)
        return
    }
    const masteries = resp.response

    let first = masteries[0]
    let second = masteries[1]
    let third = masteries[2]

    // check if summoner is low level
    if (first.championPoints < 50000) {
        interaction.reply(name + " : Just another low level player")
    }
    // check if summoner is otp
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
