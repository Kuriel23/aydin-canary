module.exports = {
  name: 'loja',
  description: 'Compre os seus produtos aqui!',
  category: 'economia',
  run: async (interaction, client) => {
    interaction.reply({ content: 'https://www.animesgamesbot.ml/loja.html', ephemeral: true })
  }
}
