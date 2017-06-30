const apiKeys = require("./.env").apiKeys;
const Twit = require('twit');
const happyText = require("./happy-text.json");


class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  postTweet(content) {

    this.api.post('statuses/update', {status: content})
      .then(console.log(`Success: ${content}`))
      .catch(error => console.log(`failed: ${error.stack}`));

  }

  searchAndReply() {
    this.api.get('search/tweets', {q: "sad", count: 1})
      .then(response => {
        const tweetId = response.data.statuses[0].id_str;
        const username = response.data.statuses[0].user.screen_name
        this.api.post('statuses/update', {in_reply_to_status_id: tweetId, status: `${this.getRandomText(happyText)} @${username}`})
          .then(console.log(`Success:`))
          .catch(error => console.log(error.stack));
      })
      .catch(error => console.log(error));
  }

  getRandomText(collection) {
    return collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)];
  }

}

const bot = new Bot();

// setInterval(() => bot.searchAndReply(), 1000*5);
bot.searchAndReply();
