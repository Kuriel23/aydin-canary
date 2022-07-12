const discord = require('discord.js')

module.exports.run = async (client, oldMember, newMember) => {
  if (oldMember.guild.id !== '531574473644703744') return

  const membros = [oldMember.nickname, newMember.nickname]
  if (membros[0] == null) {
    membros[0] = oldMember.user.username
  }
  if (membros[1] == null) {
    membros[1] = newMember.user.username
  }
  if (oldMember.nickname !== newMember.nickname) {
    const MembroNickEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: '[MEMBRO]',
        iconURL: oldMember.user.displayAvatarURL()
      })
      .setDescription('Um membro mudou seu nick.')
      .addField('Antigo Nome:', `${membros[0]}`)
      .addField('Novo Nome:', `${membros[1]}`)
      .addField('ID:', `${newMember.user.id}`)
      .setColor(client.cor)
      .setTimestamp()

    client.channels.cache.get('960575834727542884').send({ embeds: [MembroNickEmbed] })
  }
}
