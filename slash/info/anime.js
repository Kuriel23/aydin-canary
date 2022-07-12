const discord = require('discord.js')
const Canvas = require('canvas')
const malScraper = require('mal-scraper')
const Mysqli = require('mysqli')

const conn = new Mysqli({
  host: process.env.server,
  post: 3306,
  user: process.env.user,
  passwd: process.env.password,
  db: process.env.db_name
})
const db = conn.emit()

module.exports = {
  name: 'anime',
  description: 'Veja informações sobre um anime!',
  options: [
    {
      name: 'anime',
      description: 'Qual anime?',
      type: 3,
      required: true
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const name = interaction.options.getString('anime')

    interaction.reply({ content: 'Gerando imagem...' })
    db.query(
      'SELECT * FROM wp_posts WHERE post_type="animes" AND post_status="publish" AND post_Title LIKE "%' +
        name +
        '%"'
    ).then((result) => {
      if (result[0] !== undefined) {
        interaction.channel.send({
          content: `Parece que já temos esse anime no nosso site, assista-o:\n\nhttps://animesonlinegames.com/?p=${result[0].ID}`
        })
      }
    })

    malScraper.getInfoFromName(name).then(async (data) => {
      const strep = data.episodes
      const resultep = strep.replace('Unknown', 'Desconhecido')

      const strstatus = data.status
      const resultstatus = strstatus
        .replace('Currently Airing', 'Em Lançamento')
        .replace('Finished Airing', 'Completo')
        .replace('Not yet Airing', 'Brevemente')

      const strgenres = data.genres.toString()
      const resultgenres = strgenres
        .replace('Action', 'Ação')
        .replace('Adventure', 'Aventura')
        .replace('Cars', 'Carros')
        .replace('Comedy', 'Comédia')
        .replace('Demons', 'Demónios')
        .replace('Fantasy', 'Fantasia')
        .replace('Game', 'Jogo')
        .replace('Historical', 'Histórico')
        .replace('Kids', 'Infantil')
        .replace('Magic', 'Mágico')
        .replace('Martial Arts', 'Artes Marciais')
        .replace('Military', 'Militar')
        .replace('Music', 'Musical')
        .replace('Mystery', 'Mistério')
        .replace('Parody', 'Paródia')
        .replace('Police', 'Polícia')
        .replace('Psychological', 'Psicológico')
        .replace('School', 'Escolar')
        .replace('Space', 'Espaço')
        .replace('Sports', 'Esportes')
        .replace('Vampire', 'Vampiro')

      const canvas = Canvas.createCanvas(1280, 720)
      const context = canvas.getContext('2d')
      const background = await Canvas.loadImage(
        'https://images.hdqwalls.com/download/blur-background-6z-1280x720.jpg'
      )
      context.drawImage(background, 0, 0, canvas.width, canvas.height)

      context.font = '68px Impact'
      context.fillStyle = '#ffffff'
      context.fillText(`${data.englishTitle}`, 50, 110)

      context.font = '45px Impact'
      context.fillStyle = '#ffffff'
      context.fillText('Assista animes em animesonlinegames.com', 150, 620)

      context.font = '45px Impact'
      context.fillStyle = '#ffffff'
      context.fillText(`Tipo: ${data.type}`, 310, 240)

      context.font = '45px Impact'
      context.fillStyle = '#ffffff'
      context.fillText(`Episódios: ${resultep}`, 310, 305)

      context.font = '45px Impact'
      context.fillStyle = '#ffffff'
      context.fillText(`Status: ${resultstatus}`, 310, 375)

      context.font = '45px Impact'
      context.fillStyle = '#ffffff'
      context.fillText(
        `Gêneros: ${resultgenres.match(/.{1,33}/g).join('\n')}`,
        310,
        445
      )

      const animepic = await Canvas.loadImage(data.picture)

      context.drawImage(animepic, 50, 200, 225, 317)

      context.beginPath()
      context.arc(125, 125, 100, 0, Math.PI * 2, true)
      context.closePath()
      context.clip()

      const attachment = new discord.MessageAttachment(
        canvas.toBuffer(),
        'anime.png'
      )
      interaction.editReply({ content: null, files: [attachment] })
    })
  }
}
