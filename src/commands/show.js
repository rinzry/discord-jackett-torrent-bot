const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const Command = require("../struct/Command.js");

class ShowCommand extends Command {
  constructor() {
    super({
      id: "show",
      aliases: ["s"],
      cooldown: 20,
      usage: "torrent.show <Show Name>",
      description:
        "Use this command to search for show torrents from various trackers, sorted by seeders",
      category: "Torrents",
    });
  }

  exec(message, args) {
    const apiUrl = `${this.client.jacketApiUrl}indexers/all/results?apikey=${this.client.jacketApiKey}&Category[]=5000,5020,5030,5040,5045,5050,5060,5070,5080&Query=`;
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
    let title = "";
    if (result.Title.length > 200) {
      title = `${result.Title.substr(0, 200)} …`;
    } else {
      title = result.Title;
    }
    embed.addField(
      `${i + 1}. ${title} | ${result.Tracker} | Seeders ${result.Seeders}`,
      `<${result.Details}>`
    );
  }
  message.channel.send(embed);
}

module.exports = ShowCommand;
