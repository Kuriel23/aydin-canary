const discord = require('discord.js')

module.exports = {
  name: 'sam',
  description: 'Veja comandos da sam!',
  category: 'info',
  run: async (interaction, client) => {
    const sam = new discord.MessageEmbed()
      .setAuthor({
        name: "Sam, a assistente virtual",
        iconURL: "https://i.imgur.com/8N114C6.png",
      })
      .setColor(client.cor)
      .setImage("https://i.imgur.com/NFEEMGp.png")
      .setDescription(
        "**Comandos da Sam:**\nsam me beija\nsam eu te amo\nsam me manda foto do pé\nsam eu quero comer terra\nsam lixo\nsam namora comigo\nsam linda"
      );

    interaction.reply({ embeds: [sam] })
  }
}
