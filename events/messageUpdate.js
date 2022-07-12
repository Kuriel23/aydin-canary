const discord = require('discord.js')

module.exports = async (client, OldMessage, NewMessage) => {
  if (OldMessage.guild.id !== '531574473644703744') return

  if (OldMessage.author.bot) return 0
  if (OldMessage.content === NewMessage.content) return

  const MensagemEditadaEmbed = new discord.MessageEmbed()
    .setAuthor({ name: '[MENSAGEM]', iconURL: OldMessage.author.displayAvatarURL() })
    .setDescription('Uma mensagem foi editada.')
    .addField('No canal:', OldMessage.channel, true)
    .addField('De:', `${NewMessage.author}`, true)
    .addField('Mensagem Antiga:', OldMessage.content)
    .addField('Mensagem Nova:', NewMessage.content)
    .setColor(client.cor)
    .setTimestamp()

  client.channels.cache.get('960575934736502814').send({ embeds: [MensagemEditadaEmbed] })
}
