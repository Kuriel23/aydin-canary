const discord = require('discord.js')

module.exports = {
  name: 'regras',
  run: async (client, message, args) => {
    message.delete()
    const button = new discord.MessageButton()
      .setStyle('LINK')
      .setURL(client.games)
      .setLabel('AOG')
      .setEmoji('786029349883215902')

    const button1 = new discord.MessageButton()
      .setStyle('LINK')
      .setURL(client.orion)
      .setLabel('Orion')
      .setEmoji('888165361848057926')

    const button2 = new discord.MessageButton()
      .setStyle('LINK')
      .setURL(client.hd)
      .setLabel('MAL')
      .setEmoji('888165558200172544')

    const button4 = new discord.MessageButton()
      .setStyle('LINK')
      .setURL(client.goyabu)
      .setLabel('Goyabu')
      .setEmoji('941819159514316881')

    const button3 = new discord.MessageButton()
      .setStyle('LINK')
      .setURL('https://superhentais.vip')
      .setLabel('SH')
      .setEmoji('868291539200274502')

    const row = new discord.MessageActionRow().addComponents(
      button,
      button1,
      button2,
      button3,
      button4
    )

    const embed = new discord.MessageEmbed()
      .setAuthor({
        name: '» Regras',
        iconURL: 'https://i.imgur.com/brq3Qyq.png'
      })
      .setDescription(
        'Seja bem-vindo ao Discord do [Animes Online Games](' +
          client.games +
          '). Aqui se pode conversar com outros otakus, mas antes é necessário seguir regras:\n\n<a:1_animes:824099336992194560> Não use comandos fora do canal especificado\n<a:2_animes:824099215083962429> Má convivência não será tolerada.\n<a:3_animes:824099214728101899> Não vaze informações pessoais não permitidas\nEx: Nome, fotos, etc... **banimento imediato**\n<a:4_animes:824099215247802418> Não cobre postagem de episódios/animes à equipe\n<a:5_animes:824099215159590952> PROIBIDO partilhar tela assistindo animes/hentais que não façam parte dos parceiros citados acima **banimento imediato**\n<a:6_animes:824099215080030218> Evite mandar mensagens diretas para os membros da equipe, comunique-se através do chat público\n<a:7_animes:824099215172829224> Não enviar sites de séries que não sejam parceiros\n<a:8_animes:824099215164702760> PROIBIDO usar trava discord **banimento imediato**\n<a:9_animes:824099215256715274> Flood/Spam são proibidos, já Caps Lock é liberado, com uso moderado.\nCaso as mesmas sejam quebradas você será punido.\n\n:pushpin: [Convite](https://discord.animesgamesbot.ml)\nMudanças nas Regras podem ser feitas sem aviso prévio!'
      )
      .setColor(client.cor)
      .setImage('https://i.imgur.com/Mhga0Ii.png')
    message.channel.send({ embeds: [embed], components: [row] })
  }
}
