## Installtion

- Make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) OR npm and [node.js](https://nodejs.org/en/), which is v12 or higher, both installed.
- Clone the repo.
- `git clone https://github.com/rinzry/discord-jackett-torrent-bot`
- `cd discord-jackett-torrent-bot`
- `yarn install` or `npm install`
- You will need to get a [Discord Bot Token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- Go to the file `config.example.json` and rename the file to `config.json` and fill out the values with your own Jackett Api Url, Api Key, bot Client Id and token. You can also optionally changed the prefix if you desire
- Jackett Api Url should look like `http://jackett.domain/api/2.0`
- To run the bot use `npm run start`. To run in development mode with nodemon use `npm run dev`.

## Current Feature Requests

- Torrent Pagination
- Show current trackers
- Search by Tracker

## Author

> © [rinzry](https://github.com/rinzry).
