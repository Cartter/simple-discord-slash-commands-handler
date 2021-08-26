

const { readdirSync, readdir } = require('fs');
require('dotenv/config');

const { Collection, Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

const getApp = (guildID) => {
    const app = client.api.applications
    if(guildID) {
        app.guilds(guildID)
    }
    return app;
}

client.app = getApp;


readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.utils = require("./utils");
client.host = ['147.135.117.196', '7777']

client.channelCMD = ['757990127875391598', '791316794979647499', '859869612497698856', '712473793695711304']
client.log = '859875110223478804'

client.commandsSeparated = new Collection();
client.commands = new Collection();
client.aliases = new Collection();

const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    for (const file of commands) {
        let cmd = require(`./commands/${dirs}/${file}`);
        client.commands.set(cmd.help.name, cmd);

        cmd.help.aliases.forEach(alias => {
            client.aliases.set(alias, cmd.help.name);
        })
        client.commandsSeparated.set(dirs, cmd.toString().replace(",", ","));
    }
}

const commandsDir = readdirSync('./commands/');
commandsDir.forEach(x => load(x));

client.login(process.env.DISCORD_TOKEN);