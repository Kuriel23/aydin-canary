const discord = require('discord.js')

module.exports = {
  name: 'unmute',
  description: 'Tire o silenciamento de um usuário.',
  permissions: 'KICK_MEMBERS',
  options: [
    {
      name: 'usuário',
      type: 6,
      description: 'Qual usuário?',
      required: true
    }
  ],
  category: 'moderação',
  run: async (interaction, client) => {
    const member = interaction.options.getMember('usuário')

    const reason = 'Removido por: ' + interaction.member.user.tag
    await member.timeout(null, reason).catch((error) => {
      return interaction.reply({
        content: 'É impossível realizar tal ação contra este usuário.'
      })
    })
    const unmuteEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: '» Desmutado',
        iconURL: 'https://i.imgur.com/Wl8X8V3.png'
      })
      .setDescription(
        `Usuário Desmutado: ${member.user.tag}\nStaff: ${interaction.member.user.tag}`
      )
      .setThumbnail(interaction.member.user.displayAvatarURL())
      .setColor(client.cor)
    client.channels.cache
      .get('960582101726552194')
      .send({ embeds: [unmuteEmbed] })
    return interaction.reply({
      content: `${member} foi retirado o silenciamento `
    })
  }
}
