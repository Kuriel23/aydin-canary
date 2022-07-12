const discord = require('discord.js')
const Levels = require('discord-xp')
Levels.setURL(
  `mongodb+srv://${process.env.db}:${process.env.db}@cluster0-ovyzb.gcp.mongodb.net/test?retryWrites=true&w=majority`
)
const canvacord = require('canvacord')

module.exports = {
  name: 'level',
  description: 'Saiba qual o seu nível ou o de um usuário!',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6
    }
  ],
  category: 'economia',
  run: async (interaction, client) => {
    const membro =
      interaction.options.getMember('usuário') || interaction.member

    if (membro.user.bot) {
      return interaction.reply({
        content: 'Onii-chan, bots não podem receber xp :('
      })
    }

    const user = await Levels.fetch(membro.id, interaction.guild.id, true)

    let status
    if (membro.presence !== null) status = membro.presence.status
    else status = 'offline'

    const rank = new canvacord.Rank()
      .setAvatar(membro.displayAvatarURL({ format: 'png', size: 512 }))
      .setCurrentXP(user.xp || 0)
      .setRequiredXP(Levels.xpFor(user.level + 1) || 100)
      .setRank(user.position || 7577457)
      .setLevel(user.level || 0)
      .setStatus(status)
      .setProgressBar(client.cor)
      .setUsername(membro.user.username)
      .setDiscriminator(membro.user.discriminator)

    rank.build().then((data) => {
      const attachment = new discord.MessageAttachment(data, 'Rank.png')
      interaction.reply({ files: [attachment] })
    })
  }
}
