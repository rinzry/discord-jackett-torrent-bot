const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command.js");

class Invite extends Command {
  constructor() {
    super({
      id: "github",
      aliases: ["git"],
      cooldown: 20,
      usage: "torrent.github",
      description: "View this bots github repo",
      category: "Utilities",
    });
  }

  exec(message) {
    message.channel.send(
      `View Source Code at: <https://github.com/rinzry/discord-jackett-torrent-bot>`
    );
  }
}

module.exports = Invite;
