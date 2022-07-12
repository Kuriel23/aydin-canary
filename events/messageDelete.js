const discord = require('discord.js')

module.exports.run = async (client, message) => {
  if (message.author.bot) return
  if (message.guild.id !== '531574473644703744') return

  const { attachments } = message
  const messageHadAttachment = attachments.first()

  const MensagemDeletadaEmbed = new discord.MessageEmbed()
    .setAuthor({
      name: '[MENSAGEM]',
      iconURL: message.author.displayAvatarURL()
    })
    .setDescription('Uma mensagem foi deletada.')
    .addField('No canal:', message.channel, true)
    .addField('De:', message.author.tag, true)
    .addField('Mensagem:', message.content || 'Nada?')
    .setColor(client.cor)
    .setTimestamp()
  if (messageHadAttachment) { MensagemDeletadaEmbed.setImage(messageHadAttachment.proxyURL) }

  client.channels.cache
    .get('960575934736502814')
    .send({ embeds: [MensagemDeletadaEmbed] })
}
