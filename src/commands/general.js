const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const Command = require("../struct/Command.js");

class GeneralCommand extends Command {
  constructor() {
    super({
      id: "general",
      aliases: ["g"],
      cooldown: 20,
      usage: "torrent.general <Search Term>",
      description:
        "Use this command to search for other torrents from various trackers, sorted by seeders",
      category: "Torrents",
    });
  }

  exec(message, args) {
    const apiUrl = `${this.client.jacketApiUrl}?apikey=${this.client.jacketApiKey}&Query=`;
    const searchString = args.join(" ");
    message.channel.send(`Please wait while I search for torrents`);
    const moddedSearchString = searchString.replace(
      /[&\/\\#,+()$~%.'":*?<>{}]/g,
      ""
    );
    search(message, `${apiUrl}${moddedSearchString}`, searchString);
  }
}

async function search(message, url, searchTerm) {
  const res = await axios.get(url);
  const test = res.data.Results.sort((a, b) => b.Seeders - a.Seeders);
  const embed = new MessageEmbed().setColor("BLUE");
  embed.setFooter(
    `Torrent search for \`${searchTerm}\`. Requested by ${
      message.author.username
    }#${message.author.discriminator}. Completed in ${
      (Date.now() - message.createdTimestamp) / 1000
    } seconds.`
  );
  const items = test.length < 6 ? test.length : 5;
  for (let i = 0; i < items; i++) {
    if (test[i] == null) break;
    const result = JSON.parse(JSON.stringify(test[i]));
    embed.addField(
      `${i + 1}. ${result.Title} | ${result.Tracker} | Seeders ${
        result.Seeders
      }`,
      `<${result.Details}>`
    );
  }
  message.channel.send(embed);
}

module.exports = GeneralCommand;
