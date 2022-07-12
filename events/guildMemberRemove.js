module.exports = async (client, member) => {
  const Discord = require('discord.js')

  if (member.guild.id !== '531574473644703744') return
  if (member.user.bot) return

  const LogSaiuEmbed = new Discord.MessageEmbed()
    .setAuthor({
      name: `» ${member.user.tag} saiu do servidor, ID: ${member.user.id}`,
      iconURL: member.user.displayAvatarURL()
    })
    .setColor(client.cor)

  client.channels.cache.get('960575834727542884').send({ embeds: [LogSaiuEmbed] })
}
