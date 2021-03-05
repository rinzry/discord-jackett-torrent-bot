const Command = require("../struct/Command.js");

class PingCommand extends Command {
  constructor() {
    super({
      id: "ping",
      aliases: ["p"],
      cooldown: 3,
    });
  }

  exec(message) {
    message.channel.send(`Arr! Pong! You have Pongeth'd the pirate!`);
  }
}

module.exports = PingCommand;
