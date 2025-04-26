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
    .setDescription("dit si je suis un otp ou pas")
    .addStringOption(option => option.setName("summoner").setDescription("l'utilisateur à tester").setRequired(true))
    .addStringOption(option => option.setName("region").setDescription("la région de l'utilisateur").setRequired(false))

export async function execute(interaction) 
{    
    // get region from interaction
    var region = null

    // Chech if region is set
    if (interaction.options.getString("region") == null) 
    {
        // The region is not set, use the default region
        region = regions.EUW
    } 
    else if (interaction.options.getString("region") in regions) 
    {
        // The region is set and in the list of regions
        region = regions[interaction.options.getString("region")]
    } 
    else 
    {
        // The region is not set and not in the list of regions
        interaction.reply("Region not found: " + interaction.options.getString("region"))
        return
    }
    
    // get summoner from interaction
    const name = interaction.options.getString("summoner")
    var summoner = null
    var resp = null

    // get summoner from riot api
    try 
    {
        // Try to get the summoner by name
        summoner = await api.Summoner.getByName(name, region)
    } 
    catch (e) 
    {
        // The summoner was not found, display an error message
        console.log(e)
        interaction.reply("Summoner not found: " + e)
        return
    }

    // Get summoner masteries from riot api
    try 
    {
        // Try to get the summoner masteries
        resp = await api.Champion.masteryBySummoner(summoner.response.id, region)
    } 
    catch (e) 
    {
        // The summoner masteries were not found, display an error message
        console.log(e)
        interaction.reply("Masteries not found: " + e)
        return
    }

    // Get the summoner masteries from the response
    const masteries = resp.response

    // Get the 3 highest masteries
    let first = masteries[0]
    let second = masteries[1]
    let third = masteries[2]

    // check if summoner is low level
    if (first.championPoints < 50000) 
    {
        interaction.reply(name + " : Just another player")
    }

    // Check if summoner is otp
    if (first.championPoints > second.championPoints * 5) 
    {
        // The summoner is otp, display the champion name and points
        const champion = await api.DataDragon.getChampion(first.championId)
        interaction.reply(name + " : OTP INCOMING ("+ champion.id + " : " + first.championPoints + " points)")
    }
    else 
    {
        // The summoner is not otp, display the champion names and points
        const champ1 = await api.DataDragon.getChampion(first.championId)
        const champ2 = await api.DataDragon.getChampion(second.championId)
        const champ3 = await api.DataDragon.getChampion(third.championId)
        
        // Craft the response message   
        interaction.reply(name + " : Just another player " + 
        "\n\tmain: \t" + champ1.id + " (" + first.championPoints + ")" +
        "\n\tsecond: " + champ2.id + " (" + second.championPoints + ")" +
        "\n\tthird: \t" + champ3.id + " (" + third.championPoints + ")")
    }
}
