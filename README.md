# underhood-feed

Playing with react-blessed, trying to get twitter feeds and display them in terminal

# Start

You need too have $REPO/env.sh file with twitter credentials:

```
export TWITTER_CONSUMER_KEY='...'
export TWITTER_CONSUMER_SECRET='...'
export TWITTER_ACCESS_TOKEN_KEY='...'
export TWITTER_ACCESS_TOKEN_SECRET='...'
```

Then:

```
set -a
source env.sh
./node_modules/.bin/babel-node demo.jsx
```

or

```
set -a && source env.sh && ./node_modules/.bin/babel-node demo.jsx
```
