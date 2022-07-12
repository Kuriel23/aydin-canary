const discord = require('discord.js')
const diciojs = require('dicionario.js')

module.exports = {
  name: 'piada',
  description: 'Hehe, pronto para uma piada?',
  category: 'diversão',
  run: async (interaction, client) => {
    const piada = diciojs.piada()
    const emb = new discord.MessageEmbed()
      .setAuthor({
        name: `» Pergunta: ${piada.properties.pergunta}\nResposta: ${piada.properties.resposta}`,
        iconURL: 'https://i.imgur.com/XvfqKR0.png'
      })
      .setImage('https://i.imgur.com/itqTAVD.png')
      .setColor(client.cor)
    interaction.reply({ embeds: [emb] })
  }
}
