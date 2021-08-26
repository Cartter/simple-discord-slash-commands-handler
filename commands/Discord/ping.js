const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ client, interaction }) => {
    let botping = new Date() - message.createdAt;
    
    const embed = new MessageEmbed()
        .addField('🤖 BOT:', `\`${+ Math.floor(botping) + "ms"}\``, true)
        .addField('📡 API:', `\`${+ Math.floor(client.ws.ping) + "ms"}\``, true)
    interaction.reply({ embeds: [embed] })  
}

exports.help = {
    name: "ping",
    aliases: ['pong'],
    description: "Mostra o ping atual do bot",
    usage: 'ping'
};
