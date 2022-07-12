const discord = require('discord.js')

module.exports = {
  name: 'faq',
  description: 'Veja as respostas de algumas questões bastante perguntadas.',
  category: 'info',
  run: async (interaction, client) => {
    const Faq = new discord.MessageEmbed()
      .setAuthor({
        name: 'Questões Frequentemente Perguntadas',
        iconURL: 'https://i.imgur.com/3fmE1vY.png'
      })
      .setDescription(
        'Clique [aqui](https://animesgamesbot.ml/extras) para ajuda autónoma em suas questões.'
      )
      .setColor(client.cor)
    interaction.reply({ embeds: [Faq] })
  }
}
