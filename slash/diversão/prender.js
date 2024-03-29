const discord = require('discord.js')
const Canvas = require('canvas')

module.exports = {
  name: 'prender',
  description: 'Fique preso ou prenda seus amigos!',
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
    const img = await Canvas.loadImage(
      member.user.displayAvatarURL({
        dynamic: true,
        size: 4096,
        format: 'png'
      })
    )
    const bg = await Canvas.loadImage('https://i.imgur.com/E2oZAz8_d.png')

    const canvas = Canvas.createCanvas(350, 350)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      'prender.png'
    )
    interaction.editReply({ content: 'Gerado com sucesso!', files: [attachment] })
  }
}
