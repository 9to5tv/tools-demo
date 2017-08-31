# Set up

1. Set up and run https://github.com/9to5tv/socket-server

2. Create `env.config.js` in root level of directory

```js
module.exports = {
  development: {
    PUSHER_KEY: '[PUSHER APP KEY]',
    SERVER_URL: 'http://localhost:3000'
  },
  production: {
    PUSHER_KEY: '[PUSHER APP KEY]',
    SERVER_URL: '[AUTH SERVER URL]'
  }
};
```

3. `npm install`

4. `npm start`