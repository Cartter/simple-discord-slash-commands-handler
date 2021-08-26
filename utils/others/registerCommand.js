const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9'); 

const { readdirSync } = require("fs")

const registerCommand = async (client) => {

    const commands = [];

    const load = dirs => {
        const command = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (const file of command) {
            let cmd = require(`../../commands/${dirs}/${file}`);
            commands.push(cmd.help);
        }
    }

    const commandsDir = readdirSync('./commands/');
    commandsDir.forEach(x => load(x));

    GUILD_ID = '568435018502897674'

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');

        let q = await rest.put(
            Routes.applicationGuildCommands(client.user.id, GUILD_ID),
            { body: commands },
        )
        console.log('Successfully reloaded application (/) commands.');
        
    //await client.api.applications(client.user.id).guilds('568435018502897674').commands("880448237167869973").delete();

    } catch (error) {
        console.error(error);
    }
}

module.exports = registerCommand