const discord = require('discord.js')

module.exports = {
  name: 'reportar',
  run: async (client, message, args) => {
    message.delete()
    const embedreportar = new discord.MessageEmbed()
      .setAuthor({ name: '» REPORTANDO ERROS', iconURL: 'https://i.imgur.com/MUQEXA9.png' })
      .setDescription(
        `**Recomenda-se o uso do navegador Google Chrome para assistir, é o mais compatível com nossos sites**\n\n**Sites compatíveis**\n${client.games}\n${client.orion}\n${client.hd}\n${client.goyabu}\n${client.sh}\n\n  <a:tubarao_brabo:829048618031513640> **Exemplo** <a:tubarao_brabo:829048618031513640>\n\n\`\`\`-Tipo do erro: Error loading player.\n\n-Link do Episódio com erro: ${client.games}video/158289/hd\n\n-PC ou Mobile? PC.\`\`\``
      )
      .setColor(client.cor)
    message.channel.send({
      content: '**LEIA POR FAVOR O EXEMPLO ABAIXO**',
      embeds: [embedreportar]
    })
  }
}
