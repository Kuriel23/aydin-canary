const discord = require("discord.js");

module.exports = {
  name: "roleta",
  description: "Gire a roleta furacão e veja se você ganhará! | Custo: 4000",
  options: [
    {
      name: "5x",
      description: "Vantagem apenas para Newsletters. | Custo: 20000",
      type: 5,
    },
  ],
  category: "economia",
  run: async (interaction, client) => {
    const fivex = interaction.options.get("5x");
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        if (doc) {
          if (fivex != null && fivex.value === true) {
            if (
              !interaction.member.roles.cache.find((r) =>
                ["654435562295656478", "907026665086005308"].includes(r.id)
              )
            ) {
              let noperm = new discord.MessageEmbed()
                .setAuthor({
                  name: `» Você deverá ter privelégios booster ou newsletter para usar este comando.`,
                  iconURL: client.err,
                })
                .setColor(client.cor);
              return interaction.reply({ embeds: [noperm], ephemeral: true });
            }
            if (doc.animecoins < 20000) {
              let nomoney = new discord.MessageEmbed()
                .setAuthor({
                  name: `» Sem Dinheiro para jogar na Roleta.`,
                  iconURL: client.warn,
                })
                .setColor(client.cor);
              return interaction.reply({ embeds: [nomoney], ephemeral: true });
            }
            let respostas = Math.floor(Math.random() * (50000 - 500)) + 1;
            let RaspadaEmbed = new discord.MessageEmbed()
              .setTitle("<:uhum:969981594062442536> » 5 Roletas")
              .setImage("https://i.imgur.com/LISzS1m.png")
              .setDescription(
                `As 5 roletas deram lucro de: ${
                  interaction.member.roles.cache.has("654435562295656478")
                    ? respostas * 2 + " (multiplicado em 2x ╺╸ devido ao boost)"
                    : respostas
                }`
              )
              .setColor(client.cor);
            interaction.reply({ embeds: [RaspadaEmbed], ephemeral: true });
            doc.animecoins -= 20000;
            doc.animecoins += interaction.member.roles.cache.has(
              "654435562295656478"
            )
              ? respostas * 2
              : respostas;
            doc.save();
          } else {
            if (doc.animecoins < 4000) {
              let nomoney = new discord.MessageEmbed()
                .setAuthor({
                  name: `» Sem Dinheiro para jogar na Roleta.`,
                  iconURL: client.warn,
                })
                .setColor(client.cor);
              return interaction.reply({ embeds: [nomoney], ephemeral: true });
            }
            let respostas = Math.floor(Math.random() * (10000 - 100)) + 1;
            let RaspadaEmbed = new discord.MessageEmbed()
              .setTitle("<:hehe_1:861691775140102165> » Roleta")
              .setDescription(
                `A roleta deu lucro de: ${
                  interaction.member.roles.cache.has("654435562295656478")
                    ? respostas * 2 + " (multiplicado em 2x ╺╸ devido ao boost)"
                    : respostas
                }`
              )
              .setImage("https://i.imgur.com/6IXgqpN.png")
              .setColor(client.cor);
            interaction.reply({ embeds: [RaspadaEmbed], ephemeral: true });
            doc.animecoins -= 4000;
            doc.animecoins += interaction.member.roles.cache.has(
              "654435562295656478"
            )
              ? respostas * 2
              : respostas;
            doc.save();
          }
          if (client.eventoativo === true) {
            if (Math.floor(Math.random() * 100) < 6) {
              client.db.Halloween.findOne(
                { _id: interaction.member.id },
                function (err, ec) {
                  const embed = new discord.MessageEmbed()
                    .setAuthor({
                      name: `EVENTO ${client.nomeevento} | Você pegou ${client.quantiacandy} ${client.moeda}, use a?${client.vermoeda} para ver quantos atualmente você obtém.`,
                      iconURL: client.iconurl,
                    })
                    .setColor(client.cor);
                  if (ec) {
                    ec.candy += client.quantiacandy;
                    ec.save();
                    interaction.channel.send({
                      embeds: [embed],
                      ephemeral: true,
                    });
                  } else {
                    new client.db.Halloween({
                      _id: interaction.member.id,
                      candy: client.quantiacandy,
                    }).save();
                    interaction.channel.send({
                      embeds: [embed],
                      ephemeral: true,
                    });
                  }
                }
              );
            }
          }
          if (!doc) {
            new client.db.Users({ _id: interaction.member.id }).save();
            let registro = new discord.MessageEmbed()
              .setAuthor({ name: `» Tente Novamente.`, iconURL: client.err })
              .setColor(client.cor);
            return interaction.reply({ embeds: [registro] });
          }
        }
      }
    );
  },
};
