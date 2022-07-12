const Discord = require('discord.js')

module.exports = {
  name: 'manutenção',
  description: '',
  aliases: ['manutencao']
}

module.exports.run = async (client, message, res) => {
  if (message.author.id !== '354233941550694400') return 0

  const doc = await client.db.Guilds.findOne({ _id: '531574473644703744' })

  if (doc.manutencao === true) {
    doc.manutencao = false
    doc.save()
    return message.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor({ name: '» Manutenção Desligada!', iconURL: 'https://i.imgur.com/EJTp2eI.png' })
          .setColor(client.cor)]
    }
    )
  }

  if (doc.manutencao === false) {
    doc.manutencao = true
    doc.save()
    return message.reply({
      embeds: [new Discord.MessageEmbed()
        .setAuthor({ name: '» Manutenção Ligada!', iconURL: 'https://i.imgur.com/dVgqNYz.png' })
        .setColor(client.cor)]
    })
  }
}
