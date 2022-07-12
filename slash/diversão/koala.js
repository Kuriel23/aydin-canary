const discord = require('discord.js')
const superagent = require('superagent')

module.exports = {
  name: 'koala',
  description: 'Veja fotos de koalas :)',
  category: 'diversão',
  run: async (interaction, client) => {
    const { body } = await superagent.get(
      'https://some-random-api.ml/img/koala'
    )
    const KoalaEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: '» Koalas são muito fofis!',
        iconURL: 'https://i.imgur.com/U8HXdoH.png'
      })
      .setImage(body.link)
      .setColor(client.cor)
    interaction.reply({ embeds: [KoalaEmbed], ephemeral: true })
  }
}
