const express=require('express');
const cors=require('cors');
const app=express();
const axios=require('axios');
app.use(cors());
app.use(express.json());
//Importing redisClient :
const redisClient=require('./redisClient');

const DEFAULT_EXPIRATION=3600;

app.get('/photos',async(req,res)=>{
    let getCachedData=(await redisClient).get("photos");
    if(getCachedData){
        console.log("Cache HIT :");
        getCachedData.then((value)=>res.json(JSON.parse(value)));
        // res.json(getCachedData);
    }else{
        console.log("Cache MISS");
        const {data}=await axios.get('https://jsonplaceholder.typicode.com/photos');
        (await redisClient).setEx("photos",DEFAULT_EXPIRATION,JSON.stringify(data));
    }

   
})


app.listen(3001,()=>{
    console.log('Server is listening on PORT : 3001');
})