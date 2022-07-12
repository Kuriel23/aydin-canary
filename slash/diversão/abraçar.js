const discord = require('discord.js')

module.exports = {
  name: 'abraçar',
  description: 'Abrace uma pessoa virtualmente',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário deverá ser abraçado',
      type: 6,
      required: true
    }
  ],
  categoria: 'diversão',
  run: async (interaction, client) => {
    const user = interaction.options.getMember('usuário')
    const gifs = [
      'https://acegif.com/wp-content/gif/anime-hug-38.gif',
      'https://acegif.com/wp-content/gif/anime-hug-59.gif',
      'https://acegif.com/wp-content/gif/anime-hug-86.gif',
      'https://acegif.com/wp-content/gif/anime-hug-79.gif',
      'https://acegif.com/wp-content/gif/anime-hug-50.gif'
    ]
    const random = Math.round(Math.random() * gifs.length)
    const embed = new discord.MessageEmbed()
      .setAuthor({
        name: `» ${interaction.user.username} deu um abraço no(a) ${user.user.username}`,
        iconURL: 'https://i.imgur.com/3pCDf7k.png'
      })
      .setImage(
        gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1]
      )
      .setColor(client.cor)
      .setTimestamp()
    interaction.reply({ embeds: [embed] })
  }
}
