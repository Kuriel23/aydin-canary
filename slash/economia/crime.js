const discord = require('discord.js')
const ms = require('parse-ms-2')
const schedule = require('node-schedule')

module.exports = {
  name: 'crime',
  description:
    'Cometa crimes e ganhe 2 tipos de moeda, animecoins e animecoins sujo | Cooldown: 6 horas',
  category: 'economia',
  run: async (interaction, client) => {
    const doc = await client.db.Users.findOne({ _id: interaction.member.id })

    if (doc) {
      const respostas = [
        'Droga',
        'Assassino',
        'Violação',
        'Sequestro',
        'Estupro',
        'Manipulação',
        'Hackear',
        'Prisão'
      ]
      const resultadoAleatorio = Math.floor(Math.random() * respostas.length)
      const result =
        respostas[
          respostas.length == 1
            ? 0
            : resultadoAleatorio == 0
              ? resultadoAleatorio + 1
              : resultadoAleatorio - 1
        ]
      const delayTime = 21600000
      if (delayTime - (Date.now() - doc.crimeCooldown) > 0) {
        const _time = ms(delayTime - (Date.now() - doc.crimeCooldown))
        const cooldown = new discord.MessageEmbed()
          .setAuthor({
            name: `» Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para fazer roubos.`,
            iconURL: client.err
          })
          .setColor(client.cor)
        return interaction.reply({ embeds: [cooldown] })
      }
      function embed (title, icon) {
        return new discord.MessageEmbed()
          .setAuthor({ name: title, iconURL: icon })
          .setImage('https://i.imgur.com/KAkCLP9.png')
          .setColor(client.cor)
      }
      if (delayTime - (Date.now() - doc.crimeCooldown) < 0) {
        if (result === 'Prisão') {
          doc.crimeCooldown = Date.now()
          doc.save()
          const prisao = embed(
            '» Você foi preso.',
            'https://i.imgur.com/jSnO2hV.png'
          )
          interaction.reply({ embeds: [prisao] })
        }
        if (result === 'Droga') {
          const droga = Math.floor(Math.random() * (50000 - 30000)) + 30000
          doc.dinsujo += droga
          doc.crimeCooldown = Date.now()
          doc.save()
          const drogaemb = embed(
            `» Você vendeu 5kg de her*ína, lucro de ${droga} animecoins sujo.`,
            'https://i.imgur.com/3MRVkty.png'
          )
          interaction.reply({ embeds: [drogaemb] })
        }
        if (result === 'Assassino') {
          const ass = Math.floor(Math.random() * (5000 - 2000)) + 2000
          doc.animecoins += ass
          doc.crimeCooldown = Date.now()
          doc.save()
          const assassino = embed(
            `» Você mat*u um famoso, lucrou ${ass} animecoins.`,
            'https://i.imgur.com/86c0bkk.png'
          )
          interaction.reply({ embeds: [assassino] })
        }
        if (result === 'Violação') {
          const violar = Math.floor(Math.random() * (5000 - 3000)) + 3000
          doc.dinsujo += violar
          doc.crimeCooldown = Date.now()
          doc.save()
          const violou = embed(
            `» Viol*u uma criança, recebeu ${violar} animecoins sujo.`,
            'https://i.imgur.com/zhK7jer.png'
          )
          interaction.reply({ embeds: [violou] })
        }
        if (result === 'Sequestro') {
          const sequestro = Math.floor(Math.random() * (15000 - 10000)) + 10000
          doc.dinsujo += sequestro
          doc.crimeCooldown = Date.now()
          doc.save()
          const sequestroemb = embed(
            `» Sequestr*u um político, recebeu ${sequestro} animecoins sujo.`,
            'https://i.imgur.com/bTWCYu4.png'
          )
          interaction.reply({ embeds: [sequestroemb] })
        }
        if (result === 'Estupro') {
          const estupro = Math.floor(Math.random() * (20000 - 15000)) + 15000
          doc.dinsujo += estupro
          doc.crimeCooldown = Date.now()
          doc.save()
          const estuproemb = embed(
            `» Estupr*u um militante do Twitter, recebeu ${estupro} animecoins sujo.`,
            'https://i.imgur.com/LHMERb1.png'
          )
          interaction.reply({ embeds: [estuproemb] })
        }
        if (result === 'Manipulação') {
          const manipulacao = Math.floor(Math.random() * (1000 - 0)) + 1
          doc.animecoins += manipulacao
          doc.crimeCooldown = Date.now()
          doc.save()
          const manipulou = embed(
            `» Você manipulou uma votação política, recebeu ${manipulacao} animecoins.`,
            'https://i.imgur.com/6sv8KQ9.png'
          )
          interaction.reply({ embeds: [manipulou] })
        }
        if (result === 'Hackear') {
          const hacker = Math.floor(Math.random() * (50000 - 30000)) + 30000
          doc.dinsujo += hacker
          doc.crimeCooldown = Date.now()
          doc.save()
          const embed = embed(
            `» Você hackeou o presidente de um país, obtendo ${hacker} animecoins sujo.`,
            'https://i.imgur.com/4iDthHR.png'
          )
          interaction.reply({ embeds: [embed] })
        }
        if (doc.config.notificarcrime === true) {
          client.db.Guilds.findOne(
            { _id: '531574473644703744' },
            function (err, not) {
              const _date = new Date()
              _date.setHours(_date.getHours() + 8)
              const date = new Date(_date)
              not.crimeschedule.push({
                _id: interaction.member.id,
                schedule: date
              })
              not.save()

              schedule.scheduleJob(date, function () {
                const webhookClient = new discord.WebhookClient({
                  url: 'https://discord.com/api/webhooks/972829188421738516/z3cd69zBbUZ0be0t3soB_9MjRdR2wo_KsfZswdsRCRts-BdAUm8ZsN2cMzZIfLwuhlQk'
                })
                webhookClient.send({
                  content: `**[ATUALIZAÇÃO]** | Eaí, tá na hora de fazer uns crimes. ||<@${interaction.member.id}>||`,
                  username: 'Danjuro Tobita',
                  avatarURL: 'https://i.imgur.com/ZJqo64P.jpeg'
                })
                not.crimeschedule.pull({ _id: interaction.member.id })
                not.save()
              })
            }
          )
        }
      }
    }
    if (!doc) {
      new client.db.Users({ _id: interaction.member.id }).save()
      return interaction.reply({ embeds: [client.msg.embeds.registro] })
    }
  }
}
