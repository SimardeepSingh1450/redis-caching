//We use url in client of Redis when setting up our codebase for Production:
//const redisClient=Redis.createClient({url:"Here-url"})
//But for localhost we put nothing in url and by default it uses localhost :
const Redis=require('redis');
const createRedisClient=async()=>{
const client=Redis.createClient();

client.on('connect',()=>console.log('Connected to Redis'));
client.on("error",(err)=>console.log('Error in connection to REDIS : ',err));

await client.connect();
return client;

}

module.exports=createRedisClient();