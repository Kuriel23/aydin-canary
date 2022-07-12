const discord = require('discord.js')

module.exports = {
  name: 'registro',
  run: async (client, message, args) => {
    message.delete()
    const RankEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: '» CARGOS DE RANK',
        iconURL: 'https://i.imgur.com/M9kH665.png'
      })
      .setDescription(
        '**Para conquistar cargos você terá que interagir no chat quanto mais conversar com membros mais pontos ganha!**\n\n<@&849769368027136041> Nível 155\n\n<@&849764339081543710> Nível 150\n\n<@&840704469222293535> Nível 100\n\n<@&840701982565728288> Nível 90\n\n<@&840704222386192444> Nível 80\n\n<@&840703457539391488> Nível 70\n\n<@&840703516238020619> Nível 60\n\n<@&840703401444376626> Nível 50\n\n<@&840703335706394654> Nível 40\n\n<@&840703304186200065> Nível 30\n\n<@&840703152528293901> Nível 20\n\n<@&840702890234347550> Nível 10\n\n<@&840702688241123368> Nível 5\n\n**OBS: <@&840703335706394654> ganha permissão de anexar ficheiros no <#675087693474168864>**'
      )
      .setColor(client.cor)
    const homem = new discord.MessageButton()
      .setLabel('Homem')
      .setStyle('PRIMARY')
      .setEmoji('🙍‍♂️')
      .setCustomId('homem')
    const mulher = new discord.MessageButton()
      .setLabel('Mulher')
      .setStyle('PRIMARY')
      .setEmoji('🙎')
      .setCustomId('mulher')
    const binario = new discord.MessageButton()
      .setLabel('Não Binário')
      .setStyle('PRIMARY')
      .setEmoji('👤')
      .setCustomId('binario')
    const genero = new discord.MessageActionRow().addComponents(homem, mulher, binario)
    const mais18 = new discord.MessageButton()
      .setLabel('+18')
      .setStyle('PRIMARY')
      .setEmoji('🧑')
      .setCustomId('mais18')
    const menos18 = new discord.MessageButton()
      .setLabel('-18')
      .setStyle('PRIMARY')
      .setEmoji('🔞')
      .setCustomId('menos18')
    const idade = new discord.MessageActionRow().addComponents(mais18, menos18)
    const hetero = new discord.MessageButton()
      .setLabel('Hétero')
      .setStyle('PRIMARY')
      .setEmoji('👫')
      .setCustomId('hetero')
    const lgbt = new discord.MessageButton()
      .setLabel('LGBTQ+')
      .setStyle('PRIMARY')
      .setEmoji('👬')
      .setCustomId('lgbt')
    const sexualidade = new discord.MessageActionRow().addComponents(hetero, lgbt)
    const lancamentos = new discord.MessageButton()
      .setLabel('Lançamentos Animes')
      .setStyle('PRIMARY')
      .setEmoji('🔔')
      .setCustomId('lancamentos')
    const lancamentosh = new discord.MessageButton()
      .setLabel('Lançamentos Hentais')
      .setStyle('PRIMARY')
      .setEmoji('🔞')
      .setCustomId('lancamentosh')
    const noticias = new discord.MessageButton()
      .setLabel('Notícias Animes')
      .setStyle('PRIMARY')
      .setEmoji('📰')
      .setCustomId('noticias')
    const eventos = new discord.MessageButton()
      .setLabel('Eventos do Servidor')
      .setStyle('PRIMARY')
      .setEmoji('🎉')
      .setCustomId('eventos')
    const pings = new discord.MessageActionRow().addComponents(
      lancamentos,
      lancamentosh,
      noticias,
      eventos
    )
    const embedregistro = new discord.MessageEmbed()
      .setAuthor({
        name: '» REGISTRANDO-SE',
        iconURL: 'https://i.imgur.com/R3Xa1HX.png'
      })
      .setDescription('Clique nos botões de acordo com seu registro!')
      .setImage('https://i.imgur.com/8FgkRJA.jpg')
      .setColor(client.cor)
    const roxo = new discord.MessageButton()
      .setLabel('Roxo')
      .setStyle('PRIMARY')
      .setEmoji('🟣')
      .setCustomId('roxo')
    const rosachoque = new discord.MessageButton()
      .setLabel('Rosa Choque')
      .setStyle('PRIMARY')
      .setEmoji('💜')
      .setCustomId('rosachoque')
    const vermelho = new discord.MessageButton()
      .setLabel('Vermelho')
      .setStyle('PRIMARY')
      .setEmoji('🔴')
      .setCustomId('vermelho')
    const preto = new discord.MessageButton()
      .setLabel('Preto')
      .setStyle('PRIMARY')
      .setEmoji('⚫')
      .setCustomId('preto')
    const azul = new discord.MessageButton()
      .setLabel('Azul')
      .setStyle('PRIMARY')
      .setEmoji('🔵')
      .setCustomId('azul')
    const verde = new discord.MessageButton()
      .setLabel('Verde')
      .setStyle('PRIMARY')
      .setEmoji('🟢')
      .setCustomId('verde')
    const amarelo = new discord.MessageButton()
      .setLabel('Amarelo')
      .setStyle('PRIMARY')
      .setEmoji('🟡')
      .setCustomId('amarelo')
    const ciano = new discord.MessageButton()
      .setLabel('Ciano')
      .setStyle('PRIMARY')
      .setEmoji('💙')
      .setCustomId('ciano')
    const carmesim = new discord.MessageButton()
      .setLabel('Carmesim')
      .setStyle('PRIMARY')
      .setEmoji('⭕')
      .setCustomId('carmesim')
    const laranja = new discord.MessageButton()
      .setLabel('Laranja')
      .setStyle('PRIMARY')
      .setEmoji('🟠')
      .setCustomId('laranja')
    const verdefosco = new discord.MessageButton()
      .setLabel('Verde Fosco')
      .setStyle('PRIMARY')
      .setEmoji('💚')
      .setCustomId('verdefosco')
    const azulfosco = new discord.MessageButton()
      .setLabel('Azul Fosco')
      .setStyle('PRIMARY')
      .setEmoji('💠')
      .setCustomId('azulfosco')
    const magenta = new discord.MessageButton()
      .setLabel('Magenta')
      .setStyle('PRIMARY')
      .setEmoji('⚜️')
      .setCustomId('magenta')
    const branco = new discord.MessageButton()
      .setLabel('Branco')
      .setStyle('PRIMARY')
      .setEmoji('⚪')
      .setCustomId('branco')
    const cores1 = new discord.MessageActionRow().addComponents(
      roxo,
      rosachoque,
      vermelho,
      preto,
      azul
    )
    const cores2 = new discord.MessageActionRow().addComponents(
      ciano,
      amarelo,
      verde,
      carmesim,
      laranja
    )
    const cores3 = new discord.MessageActionRow().addComponents(
      verdefosco,
      azulfosco,
      magenta,
      branco
    )
    const CoresEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: '» CORES',
        iconURL: 'https://i.imgur.com/cJPoJbF.png'
      })
      .setColor(client.cor)
    message.channel.send({
      embeds: [embedregistro],
      components: [genero, idade, sexualidade, pings]
    })
    message.channel.send({
      embeds: [CoresEmbed],
      components: [cores1, cores2, cores3]
    })
    message.channel.send({ embeds: [RankEmbed] })
  }
}
