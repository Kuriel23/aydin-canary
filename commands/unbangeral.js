const Discord = require('discord.js')

module.exports = {
  name: 'unbangeral',
  description: '',
  aliases: []
}

module.exports.run = async (client, message, res) => {
  if (message.guild.id === '629997600078168064') {
    return message.inlineReply(
      new Discord.MessageEmbed()
        .setAuthor(
          '» Comando com permissão apenas para servidor oficial!',
          client.err
        )
        .setColor(client.cor)
    )
  }
  if (
    message.member.id === '512065475233054721' ||
    '609935159982161931' ||
    '354233941550694400'
  ) {
    message.guild
      .fetchBans()
      .then((bans) => {
        if (bans.size == 0) {
          message.inlineReply(
            new Discord.MessageEmbed()
              .setAuthor('» Sem membros para desbanir!', client.warn)
              .setColor(client.cor)
          )
          throw 'Sem membros para desbanir.'
        }
        bans.forEach((ban) => {
          message.guild.members.unban(ban.user.id)
        })
      })
      .then(() =>
        message.inlineReply(
          new Discord.MessageEmbed()
            .setAuthor('» Todos Desbanidos!', client.ok)
            .setColor(client.cor)
        )
      )
      .catch((e) => console.log(e))
  } else {
    message.inlineReply(
      new Discord.MessageEmbed()
        .setAuthor(
          '» Comando com permissão apenas para administradores!',
          client.err
        )
        .setColor(client.cor)
    )
  }
}
