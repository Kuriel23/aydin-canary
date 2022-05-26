const discord = require("discord.js");

module.exports = {
  name: "rank",
  description: "Veja algum dos 3 tops de diferentes recursos!",
  options: [
    {
      name: "recurso",
      description: "Qual top de tal recurso?",
      type: 3,
      required: true,
      choices: [
        {
          name: "Animecoins",
          value: "coins",
        },
        {
          name: "Reps",
          value: "reps",
        },
        {
          name: "XP",
          value: "xp",
        },
      ],
    },
  ],
  category: "economia",
  run: async (interaction, client) => {
    if (interaction.options.getString("recurso") === "coins") {
      client.db.Users.find({})
        .sort({ animecoins: "descending" })
        .limit(10)
        .exec((err, res) => {
          if (err) console.log(err);
          let embed = new discord.MessageEmbed()
            .setTitle("🏆 » TOP 10 ANIMECOINS")
            .setColor(client.cor);
          if (res.length === 0) {
            embed.addField(
              "Sem data encontrada",
              "Por favor use /daily para ganhar Animecoins"
            );
          } else if (res.length < 10) {
            for (i = 0; i < res.length; i++) {
              let member =
                interaction.guild.members.cache.get(res[i]._id) ||
                "Usuário saiu do servidor";
              if (member === "Usuário saiu do servidor") {
                embed.addField(
                  `${i + 1}. ???`,
                  `**Animecoins**: ${res[i].animecoins.toLocaleString("pt-BR")}`
                );
              } else {
                embed.addField(
                  `${i + 1}. ${member.user.username}`,
                  `**AnimeCoins**: ${res[i].coins.toLocaleString("pt-BR")}`
                );
              }
            }
          } else {
            for (i = 0; i < 10; i++) {
              let member =
                interaction.guild.members.cache.get(res[i]._id) ||
                "Usuário saiu do servidor";
              if (member === "Usuário saiu do servidor") {
                embed.addField(
                  `${i + 1}. ???`,
                  `**Animecoins**: ${res[i].animecoins.toLocaleString("pt-BR")}`
                );
              } else {
                embed.addField(
                  `${i + 1}. ${member.user.username}`,
                  `**Animecoins**: ${res[i].animecoins.toLocaleString("pt-BR")}`
                );
              }
            }
          }

          interaction.reply({ embeds: [embed] });
        });
    }
    if (interaction.options.getString("recurso") === "reps") {
      client.db.Users.find({})
        .sort({ rep: "descending" })
        .limit(10)
        .exec((err, res) => {
          if (err) console.log(err);
          let embed = new discord.MessageEmbed()
            .setTitle("🏆 » TOP 10 REP")
            .setColor(client.cor);
          if (res.length === 0) {
            embed.addField(
              "Sem data encontrada",
              "Por favor use /rep <usuário> para dar rep"
            );
          } else if (res.length < 10) {
            for (i = 0; i < res.length; i++) {
              let member =
                interaction.guild.members.cache.get(res[i]._id) ||
                "Usuário saiu do servidor";
              if (member === "Usuário saiu do servidor") {
                embed.addField(`${i + 1}. ???`, `**Rep**: ${res[i].rep}`);
              } else {
                embed.addField(
                  `${i + 1}. ${member.user.username}}`,
                  `**Rep**: ${res[i].rep}`
                );
              }
            }
          } else {
            for (i = 0; i < 10; i++) {
              let member =
                interaction.guild.members.cache.get(res[i]._id) ||
                "Usuário saiu do servidor";
              if (member === "Usuário saiu do servidor") {
                embed.addField(`${i + 1}. ???`, `**Rep**: ${res[i].rep}`);
              } else {
                embed.addField(
                  `${i + 1}. ${member.user.username}`,
                  `**Rep**: ${res[i].rep}`
                );
              }
            }
          }

          interaction.reply({ embeds: [embed] });
        });
    }
    if (interaction.options.getString("recurso") === "xp") {
      client.db.Levels.find({})
        .sort({ xp: "descending" })
        .limit(10)
        .exec((err, res) => {
          if (err) console.log(err);
          let embed = new discord.MessageEmbed()
            .setTitle("🏆 » TOP 10 XP")
            .setColor(client.cor);
          if (res.length === 0) {
            embed.addField(
              "Sem data encontrada",
              "Por favor converse no chat para obter data"
            );
          } else if (res.length < 10) {
            for (i = 0; i < res.length; i++) {
              let member =
                interaction.guild.members.cache.get(res[i].userID) ||
                "Usuário saiu do servidor";
              if (member === "Usuário saiu do servidor") {
                embed.addField(
                  `${i + 1}. ???`,
                  `**XP**: ${res[i].xp.toLocaleString("pt-BR")} | **Nível**: ${
                    res[i].level
                  }`
                );
              } else {
                embed.addField(
                  `${i + 1}. ${member.user.username}`,
                  `**XP**: ${res[i].xp.toLocaleString("pt-BR")} | **Nível**: ${
                    res[i].level
                  }`
                );
              }
            }
          } else {
            for (i = 0; i < 10; i++) {
              let member =
                interaction.guild.members.cache.get(res[i].userID) ||
                "Usuário saiu do servidor";
              if (member === "Usuário saiu do servidor") {
                embed.addField(
                  `${i + 1}. ???`,
                  `**XP**: ${res[i].xp.toLocaleString("pt-BR")} | **Nível**: ${
                    res[i].level
                  }`
                );
              } else {
                embed.addField(
                  `${i + 1}. ${member.user.username}`,
                  `**XP**: ${res[i].xp.toLocaleString("pt-BR")} | **Nível**: ${
                    res[i].level
                  }`
                );
              }
            }
          }

          interaction.reply({ embeds: [embed] });
        });
    }
  },
};
