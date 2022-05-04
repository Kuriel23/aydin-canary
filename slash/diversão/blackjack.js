const discord = require("discord.js");

module.exports = {
  name: "blackjack",
  description: "Jogue contra um cafetão",
  category: "diversão",
  run: async (interaction, client) => {
    interaction.deferReply();
    let a = interaction.member;

    var numCardsPulled = 0;
    var gameOver = false;

    var player = {
      cards: [],
      score: 0,
    };
    var dealer = {
      cards: [],
      score: 0,
    };

    function getCardsValue(a) {
      var cardArray = [],
        sum = 0,
        i = 0,
        dk = 10.5,
        doubleking = "QQ",
        aceCount = 0;
      cardArray = a;
      for (i; i < cardArray.length; i += 1) {
        if (
          cardArray[i].rank === "J" ||
          cardArray[i].rank === "Q" ||
          cardArray[i].rank === "K"
        ) {
          sum += 10;
        } else if (cardArray[i].rank === "A") {
          sum += 11;
          aceCount += 1;
        } else if (cardArray[i].rank === doubleking) {
          sum += dk;
        } else {
          sum += cardArray[i].rank;
        }
      }
      while (aceCount > 0 && sum > 21) {
        sum -= 10;
        aceCount -= 1;
      }
      return sum;
    }

    var deck = {
      deckArray: [],
      initialize: function () {
        var suitArray, rankArray, s, r, n;
        suitArray = ["clubes", "Diamantes", "corações", "espadas"];
        rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
        n = 13;
        for (s = 0; s < suitArray.length; s += 1) {
          for (r = 0; r < rankArray.length; r += 1) {
            this.deckArray[s * n + r] = {
              rank: rankArray[r],
              suit: suitArray[s],
            };
          }
        }
      },
      shuffle: function () {
        var temp, i, rnd;
        for (i = 0; i < this.deckArray.length; i += 1) {
          rnd = Math.floor(Math.random() * this.deckArray.length);
          temp = this.deckArray[i];
          this.deckArray[i] = this.deckArray[rnd];
          this.deckArray[rnd] = temp;
        }
      },
    };

    deck.initialize();
    deck.shuffle();

    function resetGame() {
      numCardsPulled = 0;
      player.cards = [];
      dealer.cards = [];
      player.score = 0;
      dealer.score = 0;
      deck.initialize();
    }

    function endMsg(title, msg, dealerC) {
      let cardsMsg = "";
      player.cards.forEach(function (card) {
        cardsMsg += " " + card.rank.toString();
        if (card.suit == "corações") cardsMsg += "J";
        if (card.suit == "diamantes") cardsMsg += "Q";
        if (card.suit == "espadas") cardsMsg += "A";
        if (card.suit == "clubes") cardsMsg += "K";
      });
      cardsMsg += "\nTotal: " + player.score.toString();

      let dealerMsg = "";
      if (!dealerC) {
        dealerMsg = " " + dealer.cards[0].rank.toString();
        if (dealer.cards[0].suit == "corações") dealerMsg += "J";
        if (dealer.cards[0].suit == "diamantes") dealerMsg += "Q";
        if (dealer.cards[0].suit == "espadas") dealerMsg += "A";
        if (dealer.cards[0].suit == "clubes") dealerMsg += "K";
        dealerMsg += " ? ?";
      } else {
        dealerMsg = "";
        dealer.cards.forEach(function (card) {
          dealerMsg += " " + card.rank.toString();
          if (card.suit == "corações") dealerMsg += "J";
          if (card.suit == "diamantes") dealerMsg += "Q";
          if (card.suit == "espadas") dealerMsg += "A";
          if (card.suit == "clubes") dealerMsg += "K";
        });
        dealerMsg += "\nTotal: " + dealer.score.toString();
      }

      const gambleEmbed = new discord.MessageEmbed()
        .setColor(client.cor)
        .setTitle(`Mesa de Jogo do ` + interaction.user.username)
        .addField("Suas Cartas:", cardsMsg)
        .addField("Cartas do Dealer", dealerMsg)
        .addField(title, msg)
        .setFooter({
          text: `${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.channel.send({ embeds: [gambleEmbed] });
    }

    async function endGame() {
      if (player.score === 21) {
        gameOver = true;
        await endMsg("Você ganhou!", "Você tem 21, você ganhou!", true);
      }
      if (player.score > 21) {
        gameOver = true;
        await endMsg("Você Perdeu!", "Você passou de 21", true);
      }
      if (dealer.score === 21) {
        gameOver = true;
        await endMsg("Você Perdeu!", "O cafetão obteve 21", true);
      }
      if (dealer.score > 21) {
        gameOver = true;
        await endMsg("Você Ganhou!", "Cafetão foi preso", true);
      }
      if (
        dealer.score >= 17 &&
        player.score > dealer.score &&
        player.score < 21
      ) {
        gameOver = true;
        await endMsg("Você Ganhou!", "Você matou o Cafetão", true);
      }
      if (
        dealer.score >= 17 &&
        player.score < dealer.score &&
        dealer.score < 21
      ) {
        gameOver = true;
        await endMsg("Você Perdeu!", "Cafetão ganhou", true);
      }
      if (
        dealer.score >= 17 &&
        player.score === dealer.score &&
        dealer.score < 21
      ) {
        gameOver = true;
        await endMsg("Você", "humilhou o Cafetão", true);
      }
    }

    function dealerDraw() {
      dealer.cards.push(deck.deckArray[numCardsPulled]);
      dealer.score = getCardsValue(dealer.cards);
      numCardsPulled += 1;
    }

    function newGame() {
      hit();
      hit();
      dealerDraw();
      endGame();
    }

    function hit() {
      player.cards.push(deck.deckArray[numCardsPulled]);
      player.score = getCardsValue(player.cards);

      numCardsPulled += 1;
      if (numCardsPulled > 2) {
        endGame();
      }
    }

    function stand() {
      while (dealer.score < 17) {
        dealerDraw();
      }
      endGame();
    }

    newGame();
    async function loop() {
      if (gameOver) return;

      endMsg("BJ", "**Digite ``h`` Para Hit ou ``s`` para Stand!** ", false);

      interaction.channel
        .awaitMessages({
          filter: (m) => m.author.id === interaction.user.id,
          max: 1,
          time: 1200000,
          errors: ["time"],
        })
        .then((message) => {
          message = message.first();
          if (message.content === "h") {
            hit();
            loop();
            return;
          } else if (message.content === "s") {
            stand();
            loop();
            return;
          } else {
            return;
          }
        })
        .catch((_) => {
          let fdinheiro = new discord.MessageEmbed()
            .setAuthor({
              name: "» Você perdeu todo o dinheiro apostado.",
              iconURL: client.warn,
            })
            .setColor(client.cor);
          interaction.channel.send({embeds: [fdinheiro]});
          return;
        });
    }
    loop();
  },
};
