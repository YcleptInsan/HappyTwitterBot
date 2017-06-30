const apiKeys = require("./.env").apiKeys;

const Twit = require('twit');
const happyText = require("./");


class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  postTweet(content) {

    this.api.post('statuses/update', {status: content})
      .then(console.log(`Success: ${content}`))
      .catch(error => console.log(`failed: ${error.stack}`))

  }
}

const bot = new Bot();
bot.postTweet('words');
