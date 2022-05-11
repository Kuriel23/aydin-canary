const discord = require("discord.js");
module.exports = {
  name: "coinflip",
  description:
    "Aposte no coinflip!",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
      required: true,
    },
    {
      name: "dinheiro",
      description: "Quanto dinheiro para a aposta",
      type: 3,
      required: true,
    },
  ],
  category: "economia",
  run: async (interaction, client) => {
    const repUser = interaction.options.getMember("usuário");
    const dinheiro = interaction.options.get("dinheiro").value;
    let bot = new discord.MessageEmbed()
      .setAuthor({ name: "» Porquê apostar com um bot?", iconURL: client.err })
      .setColor(client.cor);
    if (repUser.user.bot) return interaction.reply({ embeds: [bot] });

    let maluco = new discord.MessageEmbed()
      .setAuthor({
        name: "» Você não pode apostar consigo mesmo",
        iconURL: client.warn,
      })
      .setColor(client.cor);
    if (repUser.id == interaction.member.id)
      return interaction.reply({ embeds: [maluco] });

    if (dinheiro.includes("-")) {
      let kk = new discord.MessageEmbed()
        .setAuthor({ name: "» Operação Inválida", iconURL: client.err })
        .setColor(client.cor);
      return interaction.reply({ embeds: [kk] });
    }

    function translateNum(dinheiro) {
      var nums = dinheiro.match(/[0-9]+[kmbt]/i);
      if (!nums) return parseInt(dinheiro);
      var check = nums[0].toLowerCase();
      var num = parseInt(check);
      if (check) {
        var letter = check.slice(check.length - 1);
        if (letter === "k") return num * 1000;
        if (letter === "m") return num * 1000000;
        if (letter === "b") return num * 1000000000;
        if (letter === "t") return num * 1000000000000;
        return 0;
      } else {
        return parseInt(dinheiro);
      }
    }

    let dinheiro2 = translateNum(dinheiro);
    if (isNaN(dinheiro2)) {
      let f = new discord.MessageEmbed()
        .setAuthor({
          name: "» Indique o dinheiro para a aposta",
          iconURL: client.warn,
        })
        .setColor(client.cor);
      return interaction.reply({ embeds: [f] });
    }
    await interaction.reply({ content: "Pesquisando contéudo..." });
    client.db.Users.findOne(
      {
        _id: interaction.member.id,
      },
      function (err, doc) {
        client.db.Users.findOne(
          {
            _id: repUser.id,
          },
          function (err, docap) {
            let nodoc = new discord.MessageEmbed()
              .setAuthor({ name: `» Tente Novamente.`, iconURL: client.err })
              .setColor(client.cor);
            if (!doc) {
              new client.db.Users({
                _id: interaction.member.id,
              }).save();
              return interaction.editReply({ content: null, embeds: [nodoc] });
            }
            if (!docap) {
              new client.db.Users({
                _id: repUser.id,
              }).save();
              return interaction.editReply({ content: null, embeds: [nodoc] });
            }
            let nomoney = new discord.MessageEmbed()
              .setAuthor({
                name: `» Sem dinheiro para fazer esta aposta de algum dos usuários.`,
                iconURL: client.ok,
              })
              .setColor(client.cor);
            if (doc.animecoins < dinheiro2)
              return interaction.editReply({
                content: null,
                embeds: [nomoney],
              });
            if (docap.animecoins < dinheiro2)
              return interaction.editReply({
                content: null,
                embeds: [nomoney],
              });
            var AjudaPrincipal = new discord.MessageEmbed()
              .setTitle("🪙 » Aposta no Coinflip")
              .setDescription(
                `${interaction.member.user.tag} e ${repUser} vocês estão prestes a apostar ${dinheiro2} animecoins, caso caia coroa ${interaction.member.user.tag} ganhará, caso seja cara ${repUser.user.tag} ganhará!\n\n O Lucro para o vencedor será de ${dinheiro2} animecoins. Boa sorte!\nClique em ✅ para aceitar a proposta ou ignore para rejeitar.`
              )
              .setImage("https://i.imgur.com/NE3zBpX.png")
              .setColor(client.cor);
            let botao = new discord.MessageActionRow().addComponents(
              new discord.MessageButton()
                .setStyle("PRIMARY")
                .setEmoji("✅")
                .setCustomId(`aceitou`)
            );
            interaction.editReply({
              content: null,
              embeds: [AjudaPrincipal],
              components: [botao],
            });
            const filter = (i) =>
              i.customId === "aceitou" && i.user.id === repUser.id;

            const collector =
              interaction.channel.createMessageComponentCollector({
                filter,
                time: 60000,
                max: 1,
              });

            collector.on("collect", async (i) => {
              let respostas = ["Cara", "Coroa"];
              let resultado = Math.floor(Math.random() * respostas.length);

              if (respostas[resultado] === "Coroa") {
                doc.animecoins += dinheiro2;
                doc.save();
                docap.animecoins -= dinheiro2;
                docap.save();
                let coroa = new discord.MessageEmbed()
                  .setAuthor({
                    name: `Saiu Coroa! Parabéns ao ${interaction.member.user.tag} por ter ganhado ${dinheiro2}!`,
                    iconURL: "https://i.imgur.com/9qNngzU.png",
                  })
                  .setColor(client.cor);
                return interaction.editReply({
                  content: null,
                  embeds: [coroa],
                });
              } else if (respostas[resultado] === "Cara") {
                doc.animecoins -= dinheiro2;
                doc.save();
                docap.animecoins += dinheiro2;
                docap.save();
                let cara = new discord.MessageEmbed()
                  .setAuthor({
                    name: `» Saiu Cara! Parabéns ao ${repUser.user.tag} por ter ganhado ${dinheiro2}.`,
                    iconURL: "https://i.imgur.com/etarU7T.png"
                  })
                  .setColor(client.cor);
                return interaction.editReply({ content: null, embeds: [cara] });
              }
            });
          }
        );
      }
    );
  },
};
