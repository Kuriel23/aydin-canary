const discord = require('discord.js')
const Canvas = require('canvas')
module.exports = {
  name: 'rip',
  description: 'Rest In Peace',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6
    }
  ],
  category: 'diversão',
  run: async (interaction, client) => {
    await interaction.reply({ content: 'Gerando imagem...' })
    const member =
      interaction.options.getMember('usuário') || interaction.member
    const img = await Canvas.loadImage(member.user.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
    const bg = await Canvas.loadImage('https://i.imgur.com/voyJ85i.png')
    const canvas = Canvas.createCanvas(244, 253)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 63, 110, 90, 90)
    const attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      'rip.png'
    )
    interaction.editReply({
      content: 'Gerado com sucesso!',
      files: [attachment]
    })
  }
}
