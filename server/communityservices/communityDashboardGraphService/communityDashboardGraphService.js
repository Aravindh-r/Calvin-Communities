const redis = require('redis');
let redisClient = undefined;
const rediss = require('./../../config').redis;

module.exports = function (eventMessage) {

     if (!redisClient) {
    redisClient = redis.createClient({
      host: rediss.host,
      port: rediss.port
    });
  }
   
    redisClient.publish('graphautoupdate', JSON.stringify(eventMessage));
    //console.log('check new community event check socket servive',eventMessage);
}
