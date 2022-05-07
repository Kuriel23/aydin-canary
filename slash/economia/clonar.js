const discord = require("discord.js");
const ms = require("parse-ms-2");
module.exports = {
  name: "clonar",
  description:
    "Clone o dinheiro do cartão de algum usuário. | Cooldown: 3 dias",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
      required: true
    },
  ],
  category: "economia",
  run: async (interaction, client) => {
    const transferido =
      interaction.options.getMember("usuário");

    if (transferido.bot) {
      let bot = new discord.MessageEmbed()
        .setAuthor({
          name: `» Bots não fazem parte da economia.`,
          iconURL: client.err,
        })
        .setColor(client.cor);
      return interaction.reply({ embeds: [bot] });
    }
    if (transferido.id == interaction.member.id) {
      let burro = new discord.MessageEmbed()
        .setAuthor({
          name: `» Você quer clonar você próprio?`,
          iconURL: client.err,
        })
        .setColor(client.cor);
      return interaction.reply({ embeds: [burro] });
    }
    let registro = new discord.MessageEmbed()
      .setAuthor({ name: `» Tente Novamente.`, iconURL: client.err })
      .setColor(client.cor);
    let dinheiro2 = Math.floor(Math.random() * (250000 - 0)) + 1;
    await interaction.reply({ content: "Pesquisando contéudo..." });
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, fic) {
        if (!fic) {
          const docToSave = new client.db.Users({
            _id: interaction.member.id,
          });
          docToSave.save();
          return interaction.editReply({ content: null, embeds: [registro] });
        }
        if (fic) {
          const delayTime = 259200000;
          if (delayTime - (Date.now() - fic.clonaCooldown) > 0) {
            const _time = ms(delayTime - (Date.now() - fic.clonaCooldown));
            let cooldown = new discord.MessageEmbed()
              .setAuthor({
                name: `» Espere: ${_time.days}d, ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para clonar mais cartões.`,
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.editReply({ content: null, embeds: [cooldown] });
          } else {
            client.db.Users.findOne(
              { _id: transferido.id },
              function (err, doc) {
                if (!doc) {
                  new client.db.Users({ _id: transferido.id }).save();
                  return interaction.editReply({
                    content: null,
                    embeds: [registro],
                  });
                }
                if (doc) {
                  if (doc.animecoins < 250000) {
                    let semdindin = new discord.MessageEmbed()
                      .setAuthor({
                        name: `» O usuário deve ter 250 mil animecoins.`,
                        iconURL: client.warn,
                      })
                      .setColor(client.cor);
                    return interaction.editReply({
                      content: null,
                      embeds: [semdindin],
                    });
                  }
                  doc.animecoins -= dinheiro2;
                  doc.save();
                  let clonou = new discord.MessageEmbed()
                    .setAuthor({
                      name: `» ${interaction.member.user.tag} clonou um cartão com ${dinheiro2} de ${transferido.user.tag}! Dinheiro transferido para o banco do utilizador!`,
                      iconURL: "https://i.imgur.com/gWlUNds.png",
                    })
                    .setColor(client.cor);
                  interaction.editReply({ content: null, embeds: [clonou] });
                }
              }
            );
            fic.animecoins += dinheiro2;
            fic.save();
            fic.clonaCooldown = Date.now();
          }
        }
      }
    );
  },
};
