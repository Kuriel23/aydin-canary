const Discord = require('discord.js')

module.exports = {
  name: 'reply',
  description: '',
  aliases: []
}

module.exports.run = async (client, message, res) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) { return message.reply('Você não tem permissão para usar este comando!') }

  client.users.cache
    .get(res[0])
    .send(res.join(' ').replace(res[0], '- '))
    .catch((error) => {
      message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setAuthor({ name: '» DM Bloqueada!', iconURL: client.err })
            .setColor(client.cor)
        ]
      })
    })
}
