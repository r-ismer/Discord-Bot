import {Client, Events, GatewayIntentBits} from "discord.js";
import {config} from "dotenv";
import * as ob from "./commands/command_ok.js";
import * as victime from "./commands/command_victime.js";
import * as otp from "./commands/command_otp.js";
import * as zoe from "./commands/command_zoe.js";


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

    if (interaction.commandName === 'ok') {
        await ob.execute(interaction);
    }
    if (interaction.commandName === 'victime') {
        await victime.execute(interaction);
    }
    if (interaction.commandName === 'otp') {
        await otp.execute(interaction);
    }
    if (interaction.commandName === 'zoe') {
        await zoe.execute(interaction);
    }
}

client.on(Events.InteractionCreate, handleInteractionCreate);