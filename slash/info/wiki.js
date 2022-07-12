const discord = require('discord.js')
const wiki = require('wikipedia')
wiki.setLang('pt')

module.exports = {
  name: 'wiki',
  description: 'Veja informações sobre algum item do Wikipédia!',
  options: [
    {
      name: 'termo',
      description: 'Qual o termo?',
      type: 3,
      required: true
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const termo = interaction.options.getString('termo')
    try {
      const searchResults = await wiki.summary(termo)
      const wikiEmbed = new discord.MessageEmbed()
        .setAuthor({
          name: '» ' + searchResults.titles.normalized,
          iconURL: 'https://i.imgur.com/BuQfAZd.png'
        })
        .setDescription(searchResults.extract)
        .setColor(client.cor)
        .setFooter({ text: searchResults.content_urls.desktop.page })
      interaction.reply({ embeds: [wikiEmbed] })
    } catch (err) {
      return interaction.reply({
        embeds: [
          new discord.MessageEmbed()
            .setAuthor({ name: '» Sem Resultados Encontrados.', iconURL: client.err })
            .setColor(client.cor)
        ]
      })
    }
  }
}
