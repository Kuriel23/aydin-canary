const discord = require("discord.js");
const ms = require("parse-ms-2");
const schedule = require("node-schedule");

module.exports = {
  name: "daily",
  description: "Resgate seu dinheiro diário.",
  category: "economia",
  run: async (interaction, client) => {
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        if (doc) {
          const delayTime = 43200000;
          if (delayTime - (Date.now() - doc.dailyCooldown) > 0) {
            const _time = ms(delayTime - (Date.now() - doc.dailyCooldown));
            let emb = new discord.MessageEmbed()
              .setAuthor({
                name: `» Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para coletar a sua bufunfa diária.`,
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [emb] });
          } else {
            /* CANDY */
            if (client.eventoativo === true) {
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
                    interaction.channel.send({ embeds: [embed] });
                  } else {
                    new client.db.Halloween({
                      _id: interaction.member.id,
                      candy: client.quantiacandy,
                    }).save();
                    interaction.channel.send({ embeds: [embed] });
                  }
                }
              );
            }
            /* RESTO */
            doc.animecoins += interaction.member.roles.cache.has(
              "654435562295656478"
            )
              ? 2424
              : 1212;
            doc.dailyCooldown = Date.now();
            let resgatou = new discord.MessageEmbed()
              .setAuthor({
                name: `» Você resgatou suas ${
                  interaction.member.roles.cache.has("654435562295656478")
                    ? 2424
                    : 1212
                } Moedas no daily.`,
                iconURL: client.ok,
              })
              .setColor(client.cor);
            interaction.reply({ embeds: [resgatou] })
            doc.save();

            if (doc.config.notificardaily === true) {
              client.db.Guilds.findOne(
                { _id: "531574473644703744" },
                function (err, not) {
                  const _date = new Date();
                  _date.setHours(_date.getHours() + 12);
                  const date = new Date(_date);
                  not.dailyschedule.push({
                    _id: interaction.member.id,
                    schedule: date,
                  });
                  not.save();

                  schedule.scheduleJob(date, function () {
                    const webhookClient = new discord.WebhookClient({
                        url: "https://discord.com/api/webhooks/972829188421738516/z3cd69zBbUZ0be0t3soB_9MjRdR2wo_KsfZswdsRCRts-BdAUm8ZsN2cMzZIfLwuhlQk",
                      });
                      webhookClient.send({
                        content: `**[ATUALIZAÇÃO]** | Você pode resgatar o seu daily e depois me dá-lo, lembre-se você ainda me deve 5000 animecoins. ||<@${interaction.member.id}>||`,
                        username: "Jiraiya",
                        avatarURL: "https://i.imgur.com/BMHyycM.jpeg",
                      });
                    not.dailyschedule.pull({ _id: interaction.member.id });
                    not.save();
                  });
                }
              );
            }
          }
        } else {
          new client.db.Users({
            _id: interaction.member.id,
            dailyCooldown: Date.now(),
            animecoins: interaction.member.roles.cache.has("654435562295656478")
              ? 2424
              : 1212,
          }).save();
          let resgatado = new discord.MessageEmbed()
            .setAuthor({
              name: `» Você resgatou suas ${
                interaction.member.roles.cache.has("654435562295656478")
                  ? 2424
                  : 1212
              } Moedas no daily.`,
              iconURL: client.ok,
            })
            .setColor(client.cor);
          return interaction.reply({ embeds: [resgatado] });
        }
      }
    );
  },
};
