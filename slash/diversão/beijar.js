const discord = require('discord.js')

module.exports = {
  name: 'beijar',
  description: 'Beije alguém virtualmente',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6,
      required: true
    }
  ],
  category: 'diversão',
  run: async (interaction, client) => {
    const member = interaction.options.getMember('usuário')
    const gifs = require('../../beijosgif.json')
    const random = Math.round(Math.random() * gifs.length)
    const embed = new discord.MessageEmbed()
      .setAuthor({
        name: `» ${interaction.user.username} deu um beijo no(a) ${member.user.username}`,
        iconURL: 'https://i.imgur.com/3fVRbjW.png'
      })
      .setImage(
        gifs[random]
      )
      .setColor(client.cor)
      .setTimestamp()
    interaction.reply({ embeds: [embed] })
  }
}
