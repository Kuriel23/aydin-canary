const discord = require('discord.js')
const superagent = require('superagent')

module.exports = {
  name: 'amor',
  description: 'Use este comando, e você saberá o que acontecerá!',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6,
      required: true
    },
    {
      name: 'usuário2',
      description: 'Qual o segundo usuário do ship?',
      type: 6
    }
  ],
  category: 'diversão',
  run: async (interaction, client) => {
    interaction.reply({ content: 'Esperando geração de imagem...' })
    const member =
    interaction.options.getMember('usuário2') || interaction.member
    const user2 =
    interaction.options.getMember('usuário')
    const avatar = member.user.displayAvatarURL({
      dynamic: true,
      size: 512,
      format: 'png'
    })
    const avatar2 = user2.user.displayAvatarURL({
      dynamic: true,
      size: 512,
      format: 'png'
    })

    const { body } = await superagent.get(
      `https://nekobot.xyz/api/imagegen?type=ship&user1=${avatar}&user2=${avatar2}`
    )

    const attachment = new discord.MessageAttachment(
      body.message,
      'amor.png'
    )
    interaction.editReply({ content: 'Sucesso!', files: [attachment] })
  }
}
