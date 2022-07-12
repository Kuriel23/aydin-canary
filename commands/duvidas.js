const discord = require('discord.js')

module.exports = {
  name: 'duvidas',
  run: async (client, message, args) => {
    message.delete()
    const embedreportar = new discord.MessageEmbed()
      .setAuthor({
        name: '» DÚVIDAS',
        iconURL: 'https://i.imgur.com/zRC701H.png'
      })
      .setDescription(
        'Pergunte de boa vontade as suas dúvidas dentro dos sites, bots ou até do servidor, que nós responderemos dentro de instantes!\n\nLembre-se também de ler os fixados, quem saiba tenha a sua dúvida por lá.'
      )
      .setColor(client.cor)
      .setImage('https://i.imgur.com/jW5e2IW.jpg')
    message.channel.send({ embeds: [embedreportar] })
  }
}
