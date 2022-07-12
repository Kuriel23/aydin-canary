const discord = require('discord.js')
const canvacord = require('canvacord')

module.exports = {
  name: 'color',
  description: 'Pesquise cores em hex ou por nome em inglês!',
  options: [
    {
      name: 'cor',
      description: 'Qual cor?',
      type: 3,
      required: true
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const cor = interaction.options.getString('cor')
    const image = await canvacord.Canvas.color(cor, true, 512, 512)
    const attachment = new discord.MessageAttachment(image, 'color.png')
    interaction.reply({ files: [attachment] })
  }
}
