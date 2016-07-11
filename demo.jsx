import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';
import fetch from 'node-fetch';

import Twitter from 'twitter';
import moment from 'moment';
import colors from 'colors';

console.log(`

        BOOTSTRAP

        `.green);
console.log(process.env.TWITTER_CONSUMER_KEY);
console.log(process.env.TWITTER_CONSUMER_SECRET);
console.log(process.env.TWITTER_ACCESS_TOKEN_KEY);
console.log(process.env.TWITTER_ACCESS_TOKEN_SECRET);
var client = new Twitter({
    // TODO Add env
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
 });

var params = {screen_name: 'dmitree'};


class App extends Component {
  render() {
    return (
      <box label="underhood.sh"
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
        tweets: []
    };

    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
          console.log('connect')
        let resultTweets = [];
        tweets
            .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
            .reverse()
            .forEach((t, k) => {
                resultTweets.push(`${t.created_at.magenta}: ${t.text}\n`);
            })

            this.setState({tweets: resultTweets});
      }
    });
  }

  fetchTweets() {
  }

  render() {
    return (
      <box
           label={"@jsunderhood".cyan}
           ref="box"
           border={{type: 'line'}}
           style={{border: {fg: 'green'}}}
            enableMouse
       >
       {this.state.tweets}
      </box>
    );
  }
}

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {completion: 0};

    const interval = setInterval(() => {
      if (this.state.completion >= 100)
        return clearInterval(interval);

      this.setState({completion: this.state.completion + 10});
    }, 1000);
  }

  render() {
    return <progressbar orientation="horizontal"
                        filled={this.state.completion}
                        top="80%"
                        left="center"
                        height="15%"
                        width="80%"
                        label="progress"
                        border={{type: 'line'}}
                        style={{border: {fg: 'red'}, bar: {bg: 'red'}}} />
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
