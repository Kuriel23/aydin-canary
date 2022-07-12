module.exports = async (client, member) => {
  const Discord = require('discord.js')
  if (member.guild.id !== '531574473644703744') return
  if (member.user.bot) return

  const MembroEntrouEmbed = new Discord.MessageEmbed()
    .setAuthor({
      name: '» Bem-vindo(a) ao Animes Online Games!',
      iconURL: member.user.displayAvatarURL()
    })
    .setDescription(
      '<a:rainbowleft:840243723958222868>Veja as <#675089976593088517>, é tão bom não levar uma punição!\n<a:rainbowleft:840243723958222868>Registre-se em <#750127598943862914>, basta clicar nos botões e divirta-se no nosso servidor com outros otakus igual você!'
    )
    .setImage('https://i.imgur.com/2WxqmlL.jpg')
    .setColor(client.cor)
    .setTimestamp()
  member.guild.channels.cache
    .get(client.welcome)
    .send({ content: `<@${member.user.id}>`, embeds: [MembroEntrouEmbed] })

  const emojis = [
    '<a:1_animes:824099336992194560>',
    '<a:2_animes:824099215083962429>',
    '<a:3_animes:824099214728101899>',
    '<a:4_animes:824099215247802418>',
    '<a:5_animes:824099215159590952>',
    '<a:6_animes:824099215080030218>',
    '<a:7_animes:824099215172829224>',
    '<a:8_animes:824099215164702760>',
    '<a:9_animes:824099215256715274>',
    '<a:0_animes:824099336915910666>'
  ]
  const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const numero = member.guild.memberCount
  const array = numero.toString().split('')
  let x = ''
  for (let i = 0; i < array.length; i++) {
    const index = numeros.indexOf(array[i])
    x = x + emojis[index]
  }
  member.guild.channels.cache
    .get('675087693474168864')
    .setTopic(
      'O servidor possui ' + x + ' otakus | AnimesOnlineGames.com',
      'Culpa do: ' + member.user.tag
    )

  const LogEntrouEmbed = new Discord.MessageEmbed()
    .setAuthor({
      name: `» ${member.user.tag} entrou no servidor, ID: ${member.user.id}`,
      iconURL: member.user.displayAvatarURL()
    })
    .setColor(client.cor)
    .setTimestamp()

  client.channels.cache.get('960575834727542884').send({ embeds: [LogEntrouEmbed] })
}
