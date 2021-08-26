const wait = require('util').promisify(setTimeout);
const { MessageEmbed } = require("discord.js")

module.exports = async (client, interaction) => {

    console.log(interaction.member.guild.commands)

    if (!interaction.isCommand()) return;

    if (!client.channelCMD.includes(interaction.channelId)) {
        let embed = new MessageEmbed()
            .setDescription("Você não pode usar comandos aqui. Canal de comandos: <#859869612497698856>")
        interaction.reply({ embeds: [embed] })
        await wait(4000);
        await interaction.deleteReply()
        return;
    }

    let command = interaction.commandName
    let cmd;

   client.utils.logs.red(`${interaction.user.tag}: /${command}`)

    try {

        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }

        if (cmd) {
            cmd.run({ client, interaction })
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}