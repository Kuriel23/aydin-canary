const discord = require("discord.js");

module.exports = async (client, interaction) => {
  await interaction.deferUpdate();
  client.db.Users.findOne({ _id: interaction.user.id }, function (err, doc) {
    if (!doc) {
      new client.db.Users({ _id: interaction.user.id }).save();
      let registro = new discord.MessageEmbed()
        .setAuthor({ name: "» Tente Novamente", iconURL: client.warn })
        .setColor(client.cor);
      return interaction.channel.send({ embeds: [registro], ephemeral: true });
    }
    if (doc.dinsujo < 1)
      return interaction.channel.send({
        content: "Alô, patrão você não percebeu que tá sem dinheiro sujo?",
        ephemeral: true,
      });
    let lavagem = doc.dinsujo * 0.9;
    let lavou = new discord.MessageEmbed()
      .setAuthor({
        name: `» Você conseguiu lavar ${lavagem.toLocaleString(
          "pt-BR"
        )} de ${doc.dinsujo.toLocaleString("pt-BR")}!`,
        iconURL: "https://i.imgur.com/pAWMBGj.png",
      })
      .setColor(client.cor);
    interaction.channel.send({ embeds: [lavou], ephemeral: true });
    doc.animecoins += lavagem;
    doc.dinsujo = 0;
    doc.save();
  });
};
