
module.exports = async (bot, message) => {
    
    if (message.author.bot) return 0;
    if (message.author.bot) return;

    const prefix = process.env.PREFIX;

    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0].toLowerCase().slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    let cmd;

    client.utils.logs.red(`${message.author.tag}: ${message.content}`)


    if (!client.channelCMD.includes(message.channel.id)) return;


    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {

        let interaction = message;
        cmd.run({ client, interaction });
    }

    if (message.channel.type === "dm") return;
}

