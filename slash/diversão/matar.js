const discord = require("discord.js");

module.exports = {
  name: "matar",
  description: "Mate a pessoa que você mais odeia!!!",
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
      "https://c.tenor.com/Mn4W4D899WEAAAAS/ira-gamagoori-attack.gif",
      "https://i.pinimg.com/originals/cc/87/65/cc87656cf72979fb8ee01c3eebc5cdff.gif",
      "https://media0.giphy.com/media/eLsxkwF5BRtlK/giphy.gif",
    ];
    let random = Math.round(Math.random() * gifs.length);
    let embed = new discord.MessageEmbed()
      .setAuthor({
        name: `» ${interaction.member.user.username} matou o(a) ${member.user.username}`,
        iconURL: "https://i.imgur.com/y7SHSct.png"
      })
      .setImage(
        gifs[gifs.length == 1 ? 0 : random == 0 ? random + 1 : random - 1]
      )
      .setColor(client.cor)
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
