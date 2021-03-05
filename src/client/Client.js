const { default: axios } = require("axios");
const { Client, Collection } = require("discord.js");
const {
  registerEvents,
  registerCommands,
} = require("../struct/registries/Registries.js");

class client extends Client {
  constructor(config) {
    super({
      /* Discord.js Client Options */
      disableMentions: "everyone",
    });

    this.token = config.token;

    this.prefix = config.prefix;

    this.owners = config.owners;

    this.events = new Collection();

    this.commands = new Collection();

    this.cooldowns = new Collection();

    this.jacketApiUrl = config.jackettApiUrl;

    this.jacketApiKey = config.jackettApiKey;

    this.clientId = config.clientId;

    // this.trackers = initialiseTrackers(this);
  }

  start() {
    super.login(this.token);
    registerEvents(this);
    registerCommands(this);
  }
}

// async function initialiseTrackers(client1) {
//   const result = await axios.get(
//     `${client1.jacketApiUrl}indexers?apikey=${client1.jacketApiKey}`
//   );
//   const data = result.data;
//   console.log(`${client1.jacketApiUrl}indexers?apikey=${client1.jacketApiKey}`);
//   const configured = data.filter((tracker) => tracker.configured);
//   console.log(configured);
//   return configured;
// }

module.exports = client;
