let io  = require('socket.io')();
const redis = require('redis');
let redisClient = undefined;
const config = require('./config').redis;

io.on('connection', (clientSocket) => {

    if (!redisClient) {
    redisClient = redis.createClient({
      host: config.host,
      port: config.port
    });
  }

  //Subscribe to redis channel on a client connection
  redisClient.subscribe('graphautoupdate');


  console.log('graph update event',graphautoupdate);
  redisClient.on('message', (channel, message) => {
    console.log(message);
    clientSocket.emit('GraphUpdateEvent', message);
  });
  
  clientSocket.on('disconnect', function() {
    if (redisClient) {
      redisClient.unsubscribe();
      redisClient.quit();
      redisClient = undefined;
    }
  });
});

module.exports = io;