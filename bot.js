import {Client, Events, GatewayIntentBits} from "discord.js";
import {config} from "dotenv";
import * as otp from"./commands/command_otp.js";
import * as dmgType from "./commands/command_dmg_type.js";
import * as logger from "./helper/logger.js";


config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

function readyDiscord() {
    console.log("Bot is ready: " + client.user.tag);
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

async function handleInteractionCreate(interaction) {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'otp') {
        logger.logMessage("otp command receives with arguments: " + interaction.options.getString("summoner") + " " + interaction.options.getString("region"));
        await otp.execute(interaction);
    }
    if (interaction.commandName === 'dmg-type') {
        logger.logMessage("dmg-type command receives with arguments: " + interaction.options.getString("champ"))
        await dmgType.execute(interaction);
    }
}

client.on(Events.InteractionCreate, handleInteractionCreate);
