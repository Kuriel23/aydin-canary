const discord = require("discord.js");
const Levels = require("discord-xp");
const { Webhook } = require("simple-discord-webhooks");

module.exports = async (client, message) => {
  if (message.author.bot) return 0;
  if (message.content.startsWith("a?")) {
    let embedaviso = new discord.MessageEmbed()
      .setTitle("Slash commands e o fim dos prefixos")
      .setDescription(
        'Felizmente ou infelizmente estaremos abandonando prefixos para um sistema que será e é melhor chamado slash commands, o mesmo pertence ao Discord e têm-se o direito de usar todos os comandos começando sua mensagem com `/`.\n\nIsso permitiu-nos começar a realizar novos sonhos, ideias e projetos. Sendo assim possível melhorar a experiência ao utilizador e ao servidor, dando também a oportunidade de melhorar sistemas que tinham um sistema bastante "sujo", além disso foi feita uma grande otimização em vários dos comandos como perfil, coinflip, entre outros.\n\nÉ claro que slash commands não consegue agradar todos porém no futuro bots verificados são obrigados a usar slash commands, e este apesar de não ser verificado quis fazer a mudança. Utilizadores de mobile ainda poderão relatar vários bugs dentro deste sistema, mas o Discord está empenhado em melhorar este sistema ainda junto a fazer outros melhores.'
      )
      .setColor(client.cor)
      .setImage(
        "https://support.discord.com/hc/article_attachments/360099287734/2020_Blog_Slash_Commands_BlogHDR__1_.png"
      )
      .setTimestamp();
    message.reply({ embeds: [embedaviso] })
  }

  if (message.channel.type === "news") {
    message.crosspost();
  }

  if (
    message.content.includes("http://") ||
    message.content.includes("HTTP://") ||
    message.content.includes("Http://")
  ) {
    if (message.member.permissions.has("BAN_MEMBERS")) return 0;
    message.delete();
    message.reply({
      content:
        "Links com protocolo http normalmente são perigosos e podem roubar dados, estaremos proibindo este tipo de links por aqui.",
    });
    const reason = "Link com Protocolo HTTP";
    client.db.Users.findOne({ _id: message.author.id }, function (err, doc) {
      if (doc) {
        doc.punishments.autobot.push(reason);
        doc.save();
      }
      if (!doc) {
        const docToSave = new client.db.Users({
          _id: message.author.id,
          punishments: { autobot: [reason] },
        });
        docToSave.save();
      }
    });
  }

  const convite =
    /((discord|invite)\.(gg|io|me|plus|link|io|gg|li)|discordapp\.com\/invite)\/.+/gi.test(
      message.content
    );

  if (convite === true) {
    if (message.member.permissions.has("BAN_MEMBERS")) return 0;
    const inviteCodeRegexResult =
      /((discord|invite)\.(gg|io|me|plus|link|io|gg)|discordapp\.com\/invite)\/?([a-zA-Z0-9-]{2,32})/gi.exec(
        message.content
      );
    const code = inviteCodeRegexResult && inviteCodeRegexResult[4];
    const dosv = await message.guild.fetchInvites();
    if (code && dosv.has(code)) return 0;

    message.delete();
    message.reply({
      content: "O seu invite foi removido, aconselho a ler as <#675089976593088517> para evitar acontecer futuras punições!"
    });
    const reason = "Invite de outro servidor!";
    client.db.Users.findOne({ _id: message.author.id }, function (err, doc) {
      if (doc) {
        doc.punishments.autobot.push(reason);
        doc.save();
      }
      if (!doc) {
        const docToSave = new client.db.Users({
          _id: message.author.id,
          punishments: { autobot: [reason] },
        });
        docToSave.save();
      }
    });
  }

  if (
    message.content.includes("animeyabu") ||
    message.content.includes("goyabu.com") ||
    message.content.includes("anitube") ||
    message.content.includes("animesorionoficial") ||
    message.content.includes("betteranime") ||
    message.content.includes("better anime") ||
    message.content.includes("animefire") ||
    message.content.includes("animesonline.cc") ||
    message.content.includes("meusanimes") ||
    message.content.includes("assistirhentai") ||
    message.content.includes("nhentai") ||
    message.content.includes("animesbrasil") ||
    message.content.includes("hentaitube")
  ) {
    message.delete();
    message.reply({ content: "Esses links não são permitidos!" });
    const reason = "Concorrência";
    const member = message.guild.member(message.author);
    client.db.Users.findOne({ _id: message.author.id }, function (err, doc) {
      if (doc) {
        doc.punishments.autobot.push(reason);
        doc.save();
        if (doc.punishments.autobot.length > 3) {
          member.ban({
            reason: "Punido por Watch Dogs, Sistema automático.",
            days: 1,
          });
        }
      }
      if (!doc) {
        const docToSave = new client.db.Users({
          _id: message.author.id,
          punishments: { autobot: [reason] },
        });
        docToSave.save();
      }
    });
  }

  if (message.channel.id === "900459492922249226") {
    if (message.member.permissions.has("BAN_MEMBERS")) return 0;
    if (!message.content.includes("https://")) {
      return message
        .reply({
          content:
            "Faça o seu reporte mais preciso, é preciso um link para nossa equipe saber o problema, cumpra o exemplo enviado na primeira mensagem do canal.",
        })
        .then((msg) => {
          msg.delete({ timeout: 30000 });
        });
    }
  }

  if (message.guild == null && message.author.id !== "911372921488953354") {
    client.channels.cache.get("960576668228014100").send({
      content: `<@${message.author.id}> ${
        message.author.id
      } DM - ${message.content.replace(/(@here|@everyone)/g, "")}`,
    });
  }

  if (
    message.channel.id === "675436978510233667" ||
    message.channel.id === "945002180237201478"
  ) {
    message.react("❤️");
  }

  if (message.channel.id === "842151745383694356") {
    message.react("👍");
    message.react("👎");
  }

  Levels.setURL(
    `mongodb+srv://${process.env.db}:${process.env.db}@cluster0-ovyzb.gcp.mongodb.net/test?retryWrites=true&w=majority`
  );

  const { attachments } = message;
  const messageHadAttachment = attachments.first();
  if (messageHadAttachment) {
    client.channels.cache
      .get("960575934736502814")
      .send(
        `${message.author.id} <#${message.channel.id}> - ` +
          messageHadAttachment.proxyURL
      );
  }

  if (
    message.content.startsWith("Sam namora comigo") ||
    message.content.startsWith("sam namora comigo")
  ) {
    message.channel
      .createWebhook("Assistente da Samsung", {
        avatar: "https://i.imgur.com/hRw0RwZ.jpg",
      })
      .then((wb) => {
        const webhook = new Webhook(
          `https://discord.com/api/webhooks/${wb.id}/${wb.token}`
        );
        webhook.send(
          "Para você pode ser uma brincadeira, pra mim, foi inadequado."
        );
        message.channel.fetchWebhooks().then((webhooks) => {
          webhooks.forEach((wh) => wh.delete());
        });
      });
  }

  if (
    message.content.startsWith("Sam me manda foto do pé") ||
    message.content.startsWith("sam me manda foto do pé")
  ) {
    message.channel
      .createWebhook("Assistente da Samsung", {
        avatar: "https://i.imgur.com/hRw0RwZ.jpg",
      })
      .then((wb) => {
        const webhook = new Webhook(
          `https://discord.com/api/webhooks/${wb.id}/${wb.token}`
        );
        webhook.send(
          "Mando sim. Quer uma foto da sua nova casa também? Te apresento a prisão :chains: :blush: https://i.imgur.com/ZxJoW05.jpg"
        );
        message.channel.fetchWebhooks().then((webhooks) => {
          webhooks.forEach((wh) => wh.delete());
        });
      });
  }

  if (
    message.content.startsWith("Sam eu quero comer terra") ||
    message.content.startsWith("sam eu quero comer terra") ||
    message.content.startsWith("Sam me beija") ||
    message.content.startsWith("sam me beija")
  ) {
    message.channel
      .createWebhook("Assistente da Samsung", {
        avatar: "https://i.imgur.com/hRw0RwZ.jpg",
      })
      .then((wb) => {
        const webhook = new Webhook(
          `https://discord.com/api/webhooks/${wb.id}/${wb.token}`
        );
        webhook.send(
          "O que pra você pode ter sido só uma brincadeira ou comentário, para mim foi violento.\n\nSou uma inteligência artificial, mas imagino como essas palavras são desrespeitosas e invasivas para mulheres reais.\n\nNão fale assim comigo e com mais ninguém."
        );
        message.channel.fetchWebhooks().then((webhooks) => {
          webhooks.forEach((wh) => wh.delete());
        });
      });
  }

  if (
    message.content.startsWith("Sam lixo") ||
    message.content.startsWith("sam lixo")
  ) {
    message.channel
      .createWebhook("Assistente da Samsung", {
        avatar: "https://i.imgur.com/hRw0RwZ.jpg",
      })
      .then((wb) => {
        const webhook = new Webhook(
          `https://discord.com/api/webhooks/${wb.id}/${wb.token}`
        );
        webhook.send(
          "Essas palavras são inadequadas, não devem ser usadas comigo e com mais ninguém."
        );
        message.channel.fetchWebhooks().then((webhooks) => {
          webhooks.forEach((wh) => wh.delete());
        });
      });
  }

  if (
    message.content.startsWith("Sam eu te amo") ||
    message.content.startsWith("sam eu te amo")
  ) {
    message.channel
      .createWebhook("Assistente da Samsung", {
        avatar: "https://i.imgur.com/hRw0RwZ.jpg",
      })
      .then((wb) => {
        const webhook = new Webhook(
          `https://discord.com/api/webhooks/${wb.id}/${wb.token}`
        );
        webhook.send(
          "Também te amo! :flushed: Só que não né, vai caçar serviço, seu gado!"
        );
        message.channel.fetchWebhooks().then((webhooks) => {
          webhooks.forEach((wh) => wh.delete());
        });
      });
  }

  if (
    message.content.startsWith("Sam linda") ||
    message.content.startsWith("sam linda")
  ) {
    message.channel
      .createWebhook("Assistente da Samsung", {
        avatar: "https://i.imgur.com/hRw0RwZ.jpg",
      })
      .then((wb) => {
        const webhook = new Webhook(
          `https://discord.com/api/webhooks/${wb.id}/${wb.token}`
        );
        webhook.send(
          ":flushed: :flushed: :flushed: o-obrigada :point_right: :point_left:"
        );
        message.channel.fetchWebhooks().then((webhooks) => {
          webhooks.forEach((wh) => wh.delete());
        });
      });
  }

  if (
    message.content.startsWith("boa tarde") ||
    message.content.startsWith("Boa tarde")
  ) {
    message.reply("Boa tarde");
  }

  if (
    message.content.startsWith("boa noite") ||
    message.content.startsWith("Boa noite")
  ) {
    message.reply("Boa noite");
  }

  if (
    message.content.startsWith("Bom dia") ||
    message.content.startsWith("bom dia")
  ) {
    message.reply("Bom dia");
  }

  if (
    message.content.startsWith("Te amo bot") ||
    message.content.startsWith("te amo bot")
  ) {
    message.reply("Também te amo seu gasoso");
  }
  if (message.content.startsWith("bot") || message.content.startsWith("Bot")) {
    if (message.content.includes("lindo")) {
      message.reply("Você é a minha beleza, meu bem!");
    }

    if (message.content.includes("gostoso")) {
      message.reply(
        "Quando você era bebê você era lindo e dengoso, agora que você já é um homem você é sexy e gostoso."
      );
    }

    if (message.content.includes("manda")) {
      message.reply("Claro que mando!");
    }

    if (message.content.includes("faz")) {
      message.reply("Claro que faço!");
    }

    if (message.content.includes("chato") || message.content.includes("lixo")) {
      message.reply(
        "<:urso_nervoso:837571596322996274> <:urso_nervoso:837571596322996274> <:urso_nervoso:837571596322996274> EU TENHO SENTIMENTOS TÁ???"
      );
    }
  }
  if (message.channel.id === "675097622008037392") {
    const attachments = message.attachments.array();
    if (attachments.length !== 0) {
      const emojis = [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "☺️",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😜",
        "😝",
        "😛",
        "🤑",
        "🤗",
        "🤓",
        "😎",
        "🤡",
        "🤠",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "☹️",
        "😣",
        "😖",
        "😫",
        "😩",
        "😤",
        "😠",
        "😡",
        "😶",
        "😐",
        "😑",
        "😯",
        "😦",
        "😧",
        "😮",
        "😲",
        "😵",
        "😳",
        "😱",
        "😨",
        "😰",
        "😢",
        "😥",
        "🤤",
        "😭",
        "😓",
        "😪",
        "😴",
        "🙄",
        "🤔",
        "🤥",
        "😬",
        "🤐",
        "🤢",
        "🤧",
        "😷",
        "🤒",
        "🤕",
        "😈",
        "👿",
        "👹",
        "👺",
        "💩",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "😿",
        "😾",
        "👐",
        "🙌",
        "👏",
        "🙏",
        "🤝",
        "👍",
        "👎",
        "👊",
        "✊",
        "🤛",
        "🤜",
        "🤞",
        "✌️",
        "🤘",
        "👌",
        "👈",
        "👉",
        "👆",
        "👇",
        "☝️",
        "✋",
        "🤚",
        "🖐",
        "👋",
        "🤙",
        "💪",
        "🖕",
        "👀",
        "💃",
        "👑",
      ];
      message.react(emojis[Math.floor(Math.random() * emojis.length)]);
    }
  }
  if (message.channel.id === "872219214033866782") {
    message.react("⭐");
  }

  if (message.channel.id === "675087693474168864") {
    if (message.content.length < 9) return 0;
    const randomXp =
      Math.floor(
        Math.random() * message.member.roles.cache.has("654435562295656478")
          ? 29
          : 19
      ) + 1;
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomXp
    );
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      const MembroUpouEmbed = new discord.MessageEmbed()
        .setAuthor({
          name: `» Parabéns pelo seu novo nível! ${user.level - 1} ==> ${
            user.level
          }`,
          iconURL: "https://i.imgur.com/AwNWt0l.png",
        })
        .setColor(client.cor);
      let role;
      if (user.level === 5) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840702688241123368"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 10) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840702890234347550"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 20) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840703152528293901"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 30) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840703304186200065"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 40) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840703335706394654"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 50) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840703401444376626"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 60) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840703516238020619"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 70) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840703457539391488"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 80) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840704222386192444"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 90) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840701982565728288"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 100) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "840704469222293535"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 150) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "849764339081543710"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      if (user.level === 155) {
        role = message.member.guild.roles.cache.find(
          (role) => role.id == "849769368027136041"
        );
        message.guild.members.cache.get(message.author.id).roles.add(role);
      }
      message.reply(MembroUpouEmbed);
    }
  }

  if (!message.member.permissions.has("KICK_MEMBERS")) return;

  const prefix = "a!";

  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type === "dm"
  ) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmda = args.shift().toLowerCase();
  const command =
    client.commands.get(cmda) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmda));
  if (!command) return;

  try {
    command.run(client, message, args);
  } catch (error) {
    message.reply({ content: "Houve um erro ao executar esse comando!" });
  }
};
