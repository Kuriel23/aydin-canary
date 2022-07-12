const discord = require('discord.js')
const superagent = require('superagent')

module.exports = {
  name: 'dicio',
  description: 'Pesquise o significado de alguma palavra!',
  options: [
    {
      name: 'palavra',
      description: 'Qual palavra?',
      type: 3,
      required: true
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const palavra = interaction.options.getString('palavra')
    const { body } = await superagent
      .get(`https://significado.herokuapp.com/meanings/${encodeURI(palavra)}`)
    const DicioEmbed = new discord.MessageEmbed()
      .setAuthor({
        name:
              '» Significado de ' +
              palavra +
              ' (' +
              body[0].class +
              ')',
        iconURL: 'https://i.imgur.com/8B689Cs.png'
      })
      .setDescription(body[0].meanings.join('\n'))
      .setColor(client.cor)
    interaction.reply({ embeds: [DicioEmbed] })
  }
}
