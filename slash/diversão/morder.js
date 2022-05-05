const discord = require("discord.js");

module.exports = {
  name: "morder",
  description: "Tô com vontade de morder alguém!",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
      required: true,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    const member = interaction.options.getMember("usuário");
    let gifs = [
      "https://c.tenor.com/w4T323o46uYAAAAC/anime-bite.gif",
      "https://cdn.discordapp.com/attachments/862393318516195358/875768017680752730/4f5666861516073c1c8015b2af7e2d15.gif",
      "https://i.pinimg.com/originals/17/f0/fc/17f0fc8bc1e0d5df5f519b8cd9237ac8.gif",
      "https://thumbs.gfycat.com/DefiniteBossyFlounder-size_restricted.gif",
    ];
    let random = Math.round(Math.random() * gifs.length);
    let embed = new discord.MessageEmbed()
      .setAuthor({
        name: `» ${interaction.member.user.username} deu uma mordida no(a) ${member.user.username}`,
        iconURL: "https://i.imgur.com/y7SHSct.png",
      })
      .setImage(
        gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1]
      )
      .setColor(client.cor)
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
