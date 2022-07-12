const discord = require('discord.js')
const Canvas = require('canvas')
const moment = require('moment')
moment.locale('pt-br')

module.exports = {
  name: 'perfil',
  description: 'Veja informações sobre seu perfil!',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const membro =
      interaction.options.getMember('usuário') || interaction.member
    const userDB = await client.db.Users.findOne({ _id: membro.id })
    try {
      await client.db.Users.findOne({ _id: membro.id })
    } catch (err) {
      new client.db.Users({ _id: membro.id }).save()
    }
    const canvas = Canvas.createCanvas(1280, 720)
    const context = canvas.getContext('2d')
    try {
      const background = await Canvas.loadImage(
        userDB.equipado
          .replace('cidadenoite', 'https://i.imgur.com/UdskPJa.jpg')
          .replace('garotamascara', 'https://i.imgur.com/juIxpko.jpg')
          .replace('tanjironezuko', 'https://i.imgur.com/56eKMO9.jpg')
          .replace('bellcraner', 'https://i.imgur.com/1m3017k.jpg')
          .replace('nakiriayame', 'https://i.imgur.com/JNr41cG.jpg')
          .replace('kanna', 'https://i.imgur.com/dnBRbEb.png')
          .replace('shinobu', 'https://i.imgur.com/xKK3SSA.jpg')
          .replace('megumin', 'https://i.imgur.com/rC4MDkJ.jpg')
          .replace('gokublack', 'https://i.imgur.com/0pmlQd5.jpg')
          .replace('cybergirl', 'https://i.imgur.com/Xb3WsGv.jpg')
          .replace('satorugojo', 'https://i.imgur.com/Tsdk7OA.jpg')
          .replace('space', 'https://i.imgur.com/9HScJcx.jpg')
          .replace('akaza', 'https://i.imgur.com/Gd2qBUr.jpg')
          .replace('akazoficial', 'https://i.imgur.com/gpfAOSj.jpg')
          .replace('douma1', 'https://i.imgur.com/YKskJgC.jpg')
          .replace('koalas', 'https://i.imgur.com/IjTvsCK.jpg')
          .replace('keitaro', 'https://i.imgur.com/N2VB3fu.jpg?2')
          .replace('saokirito', 'https://i.imgur.com/8WqDX1V.jpg?1')
          .replace('hantengu', 'https://i.imgur.com/cDSeADw.jpg')
          .replace('makisan', 'https://i.imgur.com/0JergjB.png')
          .replace('floresta', 'https://i.imgur.com/jOMO3Ju.jpg?1')
          .replace('rengoku', 'https://i.imgur.com/8pqm9b8.jpg')
          .replace('bartsimpson', 'https://i.imgur.com/uqlUjhG.jpg')
          .replace('supersaiyajin', 'https://i.imgur.com/R2AzoXT.jpg')
          .replace('raiden', 'https://i.imgur.com/KOzVWrq.png?1')
          .replace('nossoamor', 'https://i.imgur.com/Eck017V.jpg')
          .replace('arcane', 'https://i.imgur.com/QCsZoyJ.png?1')
      )
      context.drawImage(background, 0, 0, canvas.width, canvas.height)
    } catch (err) {
      const background = await Canvas.loadImage(
        'https://i.imgur.com/UdskPJa.jpg'
      )
      context.drawImage(background, 0, 0, canvas.width, canvas.height)
    }

    // ESCURECER

    context.fillStyle = 'rgba(0, 0, 0, 0.4)'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // CORAÇÃO

    const heart = await Canvas.loadImage('https://i.imgur.com/NhtYdS9.png')
    context.drawImage(heart, 1020, -20, 256, 256)

    // REP

    context.font = '72px impact'
    context.fillStyle = '#ffffff'
    context.fillText('REP', 1080, 90)

    context.font = '54px sans-serif'
    context.fillStyle = '#ffffff'
    try {
      context.fillText(`${userDB.rep}`, 1090, 155)
    } catch (err) {
      context.fillText('0', 1090, 155)
    }

    // NOME

    context.font = '70px sans-serif'
    context.fillStyle = '#ffffff'
    context.fillText(
      `${membro.displayName.substring(0, 19)}`,
      canvas.width / 5.1,
      canvas.height / 5
    )

    // RETÂNGULO

    try {
      context.fillStyle = userDB.cor
    } catch (err) {
      context.fillStyle = client.cor
    }
    context.fillRect(0, 550, 1280, 250)

    // CASADO

    context.font = '24px sans-serif'
    context.fillStyle = '#ffffff'
    try {
      context.fillText(
        `Casado com: ${
          client.users.cache.get(userDB.casado[0].replace(/[<@!?>]/g, ''))
            .username
        }`,
        660,
        610
      )
    } catch (err) {
      context.fillText('Estado Civil: Virgem', 660, 610)
    }

    // ENTROU

    context.font = '25px sans-serif'
    context.fillStyle = '#ffffff'
    context.fillText(
      `Entrou: ${moment(membro.joinedTimestamp).format('lll')} (${moment(
        membro.joinedTimestamp
      )
        .startOf('seconds')
        .fromNow()})`,
      660,
      578
    )

    // BIOGRAFIA

    context.font = '24px sans-serif'
    context.fillStyle = '#ffffff'
    context.fillText('Biografia:', 10, 610)

    context.font = '24px sans-serif'
    context.fillStyle = '#ffffff'
    try {
      context.fillText(
        `${userDB.biografia
          .trim()
          .match(/.{1,78}/g)
          .join('\n')
          .replace('&nbsp;', '')}`,
        5,
        640
      )
    } catch (err) {
      context.fillText(
        'Olhe para mim, sou uma linda borbuleta! Use /biografia <bio> para definir uma biografia nova.',
        5,
        640
      )
    }

    // CRIOU

    context.font = '25px sans-serif'
    context.fillStyle = '#ffffff'
    context.fillText(
      `Criado: ${moment(membro.user.createdAt).format('lll')} (${moment(
        membro.user.createdAt
      )
        .startOf('seconds')
        .fromNow()})`,
      10,
      578
    )

    // STAFF

    if (membro.roles.cache.has('840745033274490880')) {
      const staff = await Canvas.loadImage('https://i.imgur.com/BhRSnbr.png')
      context.drawImage(staff, 130, 140, 128, 128)
    }

    // BOOSTER

    if (membro.roles.cache.has('654435562295656478')) {
      const boost = await Canvas.loadImage('https://i.imgur.com/NDybocz.png?1')
      context.drawImage(boost, 20, 240, 64, 64)
    }

    // Natal 2021
    try {
      if (userDB.medalhas.natalv1 === true) {
        const Natalv1 = await Canvas.loadImage(
          'https://i.imgur.com/hFBRYcP.png?1'
        )
        context.drawImage(Natalv1, 20, 320, 64, 64)
      }
    } catch (err) {
      0
    }
    // JORNALISTA

    if (membro.roles.cache.has('842155567618195486')) {
      const impani = await Canvas.loadImage(
        'https://i.imgur.com/NPytKCH.png?1'
      )
      context.drawImage(impani, 20, 390, 64, 64)
    }

    // NEWSLETTER

    if (membro.roles.cache.has('907026665086005308')) {
      const newsletter = await Canvas.loadImage(
        'https://i.imgur.com/jImJ4W8.png'
      )
      context.drawImage(newsletter, 20, 460, 64, 64)
    }

    // AVATAR

    context.beginPath()
    context.arc(125, 125, 100, 0, Math.PI * 2, true)
    context.closePath()
    context.clip()

    const avatar = await Canvas.loadImage(
      membro.user.displayAvatarURL({ format: 'png' })
    )
    context.drawImage(avatar, 25, 25, 200, 200)

    const attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      'perfil.png'
    )
    interaction.reply({ files: [attachment] })
  }
}
