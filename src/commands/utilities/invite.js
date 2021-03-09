const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command.js");

class Invite extends Command {
  constructor() {
    super({
      id: "invite",
      aliases: ["i"],
      cooldown: 20,
      usage: "torrent.invite",
      description: "Invite this bot to your own server",
      category: "Utilities",
    });
  }

  exec(message) {
    message.channel.send(
      `Arrr. Invite me to your own server. <https://discord.com/oauth2/authorize?client_id=${this.client.clientId}&scope=bot>`
    );
  }
}

module.exports = Invite;
