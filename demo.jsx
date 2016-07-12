import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import fetch from 'node-fetch';

import Twitter from 'twitter';
import colors from 'colors';

console.log(`

        BOOTSTRAP

        `.green);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
 });

var params = {screen_name: 'eblutr2'};


class App extends Component {
  render() {
    return (
      <box label="feeds"
           border={{type: 'line'}}
           style={{border: {fg: 'cyan'}}}>
        <InnerBox />
      </box>
    );
  }
}

class InnerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tweets: [],
        count: 50
    };

    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
          console.log('connect')
        let resultTweets = [];
        console.log(tweets.length);
        tweets
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .forEach((t, k) => {
                resultTweets.push(`${t.created_at.magenta}: ${t.text}\n`);
            })

            this.setState({tweets: resultTweets});
      }
    });
  }

  render() {
    return (
      <box
           label={"@jsunderhood".cyan}
           ref="box"
           border={{type: 'line'}}
           style={{border: {fg: 'green'}}}
           enableMouse
           scrollable
       >
       {this.state.tweets}
      </box>
    );
  }
}
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed demo app'
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

const component = render(<App />, screen);
