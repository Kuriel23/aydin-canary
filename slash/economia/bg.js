const discord = require("discord.js");

module.exports = {
  name: "background",
  description: "Veja o que está atualmente ativo",
  options: [
    {
      name: "equipar",
      description: "Compre ou Equipe algum background.",
      type: 3,
      choices: [
        {
          name: "Cidade Noite",
          value: "cidade-noite",
        },
        {
          name: "Garota Máscara",
          value: "garota-mascara",
        },
        {
          name: "2º Kizuki",
          value: "akaza",
        },
        {
          name: "Cyber Girl",
          value: "cybergirl",
        },
        {
          name: "Goku Black",
          value: "goku-black",
        },
        {
          name: "Bell Craner",
          value: "bell-craner",
        },
        {
          name: "Kanna Kamui",
          value: "kanna",
        },
        {
          name: "Satoru Gojo",
          value: "satoru-gojo",
        },
        {
          name: "Tanjiro",
          value: "tanjiro-nezuko",
        },
        {
          name: "Megumin",
          value: "megumin",
        },
        {
          name: "Shinobu",
          value: "shinobu",
        },
        {
          name: "Douma 1",
          value: "douma1",
        },
        {
          name: "Espaço com Dog",
          value: "space",
        },
        {
          name: "Nakiri Ayame",
          value: "nakiri-ayame",
        },
        {
          name: "3º Akaza",
          value: "akazoficial",
        },
        {
          name: "Kirito",
          value: "saokirito",
        },
        {
          name: "Hantengu",
          value: "hantengu",
        },
        {
          name: "Maki-san",
          value: "makisan",
        },
        {
          name: "Floresta Noturna",
          value: "floresta",
        },
        {
          name: "Rengoku",
          value: "rengoku",
        },
        {
          name: "Bart",
          value: "bartsimpson",
        },
        {
          name: "SS Blue",
          value: "supersaiyajin",
        },
        {
          name: "Raiden Shogun",
          value: "raiden",
        },
        {
          name: "Nosso Amor",
          value: "nossoamor",
        },
        {
          name: "Arcane",
          value: "arcane",
        },
      ],
    },
  ],
  category: "economia",
  run: async (interaction, client) => {
    client.db.Users.findOne(
      { _id: interaction.member.user.id },
      function (err, doc) {
        if (!doc) {
          new client.db.Users({ _id: message.author.id }).save();
          return interaction.reply(
            new discord.MessageEmbed()
              .setAuthor({ name: "» Tente Novamente", iconURL: client.warn })
              .setColor(client.cor)
          );
        }
        let nomoney = new discord.MessageEmbed()
          .setAuthor({
            name: "» Sem dinheiro para esta compra!",
            iconURL: client.warn,
          })
          .setColor(client.cor);
        function comprar(nome) {
          return new discord.MessageEmbed()
            .setAuthor({
              name: `» Background ${nome} comprado e equipado!`,
              iconURL: "https://i.imgur.com/G3CHz2p.png",
            })
            .setColor(client.cor);
        }
        function equipar(nome) {
          return new discord.MessageEmbed()
            .setAuthor({
              name: `» Background ${nome} equipado!`,
              iconURL: "https://i.imgur.com/StIhmRM.png",
            })
            .setColor(client.cor);
        }
        if (interaction.options.getString("equipar") === "cidade-noite") {
          doc.equipado = "cidadenoite";
          doc.save();
          let equip = equipar("Cidade de Noite");
          return interaction.reply({ embeds: [equip] });
        } else if (
          interaction.options.getString("equipar") === "garota-mascara"
        ) {
          if (doc.loja.garotamascara === "Não comprado.") {
            if (doc.animecoins < 100000) {
              return interaction.reply({ embeds: [nomoney] });
            }
            if (doc.animecoins > 100000) {
              doc.animecoins -= 100000;
              doc.loja.garotamascara = "Comprado.";
              doc.equipado = "garotamascara";
              doc.save();
              let embed = comprar("Garota de Máscara");
              return interaction.reply({ embeds: [embed] });
            }
          }
          if (doc.loja.garotamascara === "Comprado.") {
            doc.equipado = "garotamascara";
            doc.save();
            let equip = equipar("Garota de Máscara");
            return interaction.reply({ embeds: [equip] });
          }
        } else if (interaction.options.getString("equipar") === "bell-craner") {
          if (doc.loja.bellcraner === "Não comprado.") {
            if (doc.animecoins < 500000) {
              return interaction.reply({ embeds: [nomoney] });
            }
            if (doc.animecoins > 500000) {
              doc.animecoins -= 500000;
              doc.loja.bellcraner = "Comprado.";
              doc.equipado = "bellcraner";
              doc.save();
              let embed = comprar("Bell Craner");
              return interaction.reply({ embeds: [embed] });
            }
          }
          if (doc.loja.bellcraner === "Comprado.") {
            doc.equipado = "bellcraner";
            doc.save();
            let embed = equipar("Bell Craner");
            return interaction.reply({ embeds: [embed] });
          } else if (
            interaction.options.getString("equipar") === "tanjiro-nezuko"
          ) {
            if (doc.loja.tanjironezuko === "Não comprado.") {
              if (doc.animecoins < 500000) {
                return interaction.reply({ embeds: [nomoney] });
              }
              if (doc.animecoins > 500000) {
                doc.animecoins -= 500000;
                doc.loja.tanjironezuko = "Comprado.";
                doc.equipado = "tanjironezuko";
                doc.save();
                let embed = comprar("Tanjiro e Nezuko");
                return interaction.reply({ embeds: [embed] });
              }
            }
            if (doc.loja.tanjironezuko === "Comprado.") {
              doc.equipado = "tanjironezuko";
              doc.save();
              let embed = equipar("Tanjiro e Nezuko");
              return interaction.reply({ embeds: [embed] });
            }
          } else if (interaction.options.getString("equipar") === "kanna") {
            if (doc.loja.kanna === "Não comprado.") {
              if (doc.animecoins < 500000) {
                return interaction.reply({ embeds: [nomoney] });
              }
              if (doc.animecoins > 500000) {
                doc.animecoins -= 500000;
                doc.loja.kanna = "Comprado.";
                doc.equipado = "kanna";
                doc.save();
                let embed = comprar("Kanna");
                return interaction.reply({ embeds: [embed] });
              }
            }
            if (doc.loja.kanna === "Comprado.") {
              doc.equipado = "kanna";
              doc.save();
              let embed = equipar("Kanna");
              return interaction.reply({ embeds: [embed] });
            }
          } else if (interaction.options.getString("equipar") === "megumin") {
            if (doc.loja.megumin === "Não comprado.") {
              if (doc.animecoins < 1000000) {
                return interaction.reply({ embeds: [nomoney] });
              }
              if (doc.animecoins > 1000000) {
                doc.animecoins -= 1000000;
                doc.loja.megumin = "Comprado.";
                doc.equipado = "megumin";
                doc.save();
                let embed = comprar("Megumin");
                return interaction.reply({ embeds: [embed] });
              }
            }
            if (doc.loja.megumin === "Comprado.") {
              doc.equipado = "megumin";
              doc.save();
              let embed = equipar("Megumin");
              return interaction.reply({ embeds: [embed] });
            }
          } else if (interaction.options.getString("equipar") === "shinobu") {
            if (doc.loja.shinobu === "Não comprado.") {
              if (doc.animecoins < 1000000) {
                return interaction.reply({ embeds: [nomoney] });
              }
              if (doc.animecoins > 1000000) {
                doc.animecoins -= 1000000;
                doc.loja.shinobu = "Comprado.";
                doc.equipado = "shinobu";
                doc.save();
                let embed = comprar("Shinobu");
                return interaction.reply({ embeds: [embed] });
              }
            }
            if (doc.loja.shinobu === "Comprado.") {
              doc.equipado = "shinobu";
              doc.save();
              let embed = equipar("Shinobu");
              return interaction.reply({ embeds: [embed] });
            }
          } else if (
            interaction.options.getString("equipar") === "goku-black"
          ) {
            if (doc.loja.gokublack === "Não comprado.") {
              if (doc.animecoins < 100000) {
                return interaction.reply({ embeds: [nomoney] });
              }
              if (doc.animecoins > 100000) {
                doc.animecoins -= 100000;
                doc.loja.gokublack = "Comprado.";
                doc.equipado = "gokublack";
                doc.save();
                let embed = comprar("Goku Black");
                return interaction.reply({ embeds: [embed] });
              }
            }
            if (doc.loja.gokublack === "Comprado.") {
              doc.equipado = "gokublack";
              doc.save();
              let embed = equipar("Goku Black");
              return interaction.reply({ embeds: [embed] });
            }
          } else if (interaction.options.getString("equipar") === "akaza") {
            if (doc.loja.akaza === "Não comprado.") {
              if (doc.animecoins < 100000) {
                return interaction.reply({ embeds: [nomoney] });
              }
              if (doc.animecoins > 100000) {
                doc.animecoins -= 100000;
                doc.loja.akaza = "Comprado.";
                doc.equipado = "akaza";
                doc.save();
                let embed = comprar("Akaza Oni");
                return interaction.reply({ embeds: [embed] });
              }
            }
            if (doc.loja.akaza === "Comprado.") {
              doc.equipado = "akaza";
              doc.save();
              let embed = equipar("Akaza Oni");
              return interaction.reply({ embeds: [embed] });
            }
          } else if (interaction.options.getString("equipar") === "cybergirl") {
            if (doc.loja.cybergirl === "Não comprado.") {
              if (doc.animecoins < 100000) {
                return interaction.reply({ embeds: [nomoney] });
              }
              if (doc.animecoins > 100000) {
                doc.animecoins -= 100000;
                doc.loja.cybergirl = "Comprado.";
                doc.equipado = "cybergirl";
                doc.save();
                let embed = comprar("Cyber Girl");
                return interaction.reply({ embeds: [embed] });
              }
            }
            if (doc.loja.cybergirl === "Comprado.") {
              doc.equipado = "cybergirl";
              doc.save();
              let embed = equipar("Cyber Girl");
              return interaction.reply({ embeds: [embed] });
            }
          }
          if (interaction.options.getString("equipar") === "satoru-gojo") {
            if (doc.loja.satorugojo === "Não comprado.") {
              return interaction.reply({ embeds: [nomoney] });
            }
            if (doc.animecoins > 500000) {
              doc.animecoins -= 500000;
              doc.loja.satorugojo = "Comprado.";
              doc.equipado = "satorugojo";
              doc.save();
              let embed = comprar("Satoru Gojo");
              return interaction.reply({ embeds: [embed] });
            }
          }
          if (doc.loja.satorugojo === "Comprado.") {
            doc.equipado = "satorugojo";
            doc.save();
            let embed = equipar("Satoru Gojo");
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "saokirito") {
          /* EXCLUSIVOS */
          if (doc.loja.saokirito === "Comprado.") {
            doc.equipado = "saokirito";
            doc.save();
            let embed = equipar("Kirito e Asuna");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.saokirito === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Kirito e Asuna foi exclusivo de um evento no qual você não tem acesso!",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "makisan") {
          if (doc.loja.makisan === "Comprado.") {
            doc.equipado = "makisan";
            doc.save();
            let embed = equipar("Maki-san");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.makisan === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Maki-san (Jujutsu Kaisen) foi exclusivo de um evento no qual você não tem acesso!",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (
          interaction.options.getString("equipar") === "nakiri-ayame"
        ) {
          if (doc.loja.nakiriayame === "Comprado.") {
            doc.equipado = "nakiriayame";
            doc.save();
            let embed = equipar("Nakiri Ayame");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.garotamascara === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Nakiri Ayame foi exclusivo de um evento no qual você não tem acesso!",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "space") {
          if (doc.loja.space === "Comprado.") {
            doc.equipado = "space";
            doc.save();
            let embed = equipar("Espaço");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.space === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Espaço foi exclusivo de um evento no qual você não tem acesso!",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "bartsimpson") {
          if (doc.loja.bartsimpson === "Comprado.") {
            doc.equipado = "bartsimpson";
            doc.save();
            let embed = equipar("Bart Simpson");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.bartsimpson === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Bart Simpson foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "koalas") {
          if (doc.loja.koalas === "Comprado.") {
            doc.equipado = "koalas";
            doc.save();
            let embed = equipar("Koalas");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.koalas === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Koalas (PC Wallpaper) foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "rengoku") {
          if (doc.loja.rengoku === "Comprado.") {
            doc.equipado = "rengoku";
            doc.save();
            let embed = equipar("Rengoku");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.rengoku === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Rengoku foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "floresta") {
          if (doc.loja.floresta === "Comprado.") {
            doc.equipado = "floresta";
            doc.save();
            let embed = equipar("Floresta Noturna");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.floresta === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Floresta Noturna foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "raiden") {
          if (doc.loja.raiden === "Comprado.") {
            doc.equipado = "raiden";
            doc.save();
            let embed = equipar("Raiden");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.raiden === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Raiden foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "keitaro") {
          if (doc.loja.keitaro === "Comprado.") {
            doc.equipado = "keitaro";
            doc.save();
            let embed = equipar("Keitaro");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.keitaro === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Keitaro foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "hantengu") {
          if (doc.loja.hantengu === "Comprado.") {
            doc.equipado = "hantengu";
            doc.save();
            let embed = equipar("Hantengu");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.hantengu === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Hantengu (Kimetsu No Yaiba) foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        }
        if (interaction.options.getString("equipar") === "supersaiyajin") {
          if (doc.loja.supersaiyajin === "Comprado.") {
            doc.equipado = "supersaiyajin";
            doc.save();
            let embed = equipar("Super Saiyajin Blue");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.supersaiyajin === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Super Saiyajin Blue foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "akazoficial") {
          if (doc.loja.akazoficial === "Comprado.") {
            doc.equipado = "akazoficial";
            doc.save();
            let embed = equipar("3º Akaza (Kimetsu No Yaiba)");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.akazoficial === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background 3º Akaza (Kimetsu No Yaiba) foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "nossoamor") {
          if (doc.loja.nossoamor === "Comprado.") {
            doc.equipado = "nossoamor";
            doc.save();
            let embed = equipar("Nosso Amor");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.nossoamor === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Nosso Amor foi exclusivo do evento Halloween! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "arcane") {
          if (doc.loja.arcane === "Comprado.") {
            doc.equipado = "arcane";
            doc.save();
            let embed = equipar("Arcane");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.arcane === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Arcane foi exclusivo do evento Natal! Talvez em breve meu dono libere a compra de novos backgrounds exclusivos á escolha da pessoa.",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else if (interaction.options.getString("equipar") === "douma1") {
          if (doc.loja.douma1 === "Comprado.") {
            doc.equipado = "douma1";
            doc.save();
            let embed = equipar("Douma 1");
            return interaction.reply({ embeds: [embed] });
          }
          if (doc.loja.douma1 === "Não comprado.") {
            let embed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Background Douma 1 foi exclusivo de um evento no qual você não tem acesso!",
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
        } else {
          let ConfigEmbed = new discord.MessageEmbed()
            .setAuthor({
              name: "» Backgrounds de Seu Perfil",
              iconURL: "https://i.imgur.com/hirHJiV.png",
            })
            .setDescription("Background equipado: " + doc.equipado)
            .addField("» garota-mascara:", doc.loja.garotamascara, true)
            .addField("» bell-craner:", doc.loja.bellcraner, true)
            .addField("» tanjiro-nezuko:", doc.loja.tanjironezuko, true)
            .addField("» kanna:", doc.loja.kanna, true)
            .addField("» megumin:", doc.loja.megumin, true)
            .addField("» shinobu:", doc.loja.shinobu, true)
            .addField("» goku-black:", doc.loja.gokublack, true)
            .addField("» satoru-gojo:", doc.loja.satorugojo, true)
            .addField("» douma:", doc.loja.akaza, true)
            .addField("» cybergirl:", doc.loja.cybergirl, true)
            .setImage("https://i.imgur.com/rOrPt2E.png")
            .setColor(client.cor);
          interaction.reply({ embeds: [ConfigEmbed] });
        }
      }
    );
  },
};
