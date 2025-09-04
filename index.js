const express = require('express');
const{connectToMongoDB} = require("./connect"); 
const app = express();
const urlRoutes= require("./routes/url");
const URL = require("./models/url");

const PORT= 5500;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log("MongoDB connected")
);

const UrlRoutes = require("./routes/url");

app.use(express.json());

app.get('/:shortId', async(req,res)=>{
    const shortId= req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory : {timestamp : Date.now()},
        }
    });

    res.redirect(entry.redirectUrl);
});



app.use("/url",urlRoutes);

app.listen(PORT, ()=>{
    console.log("Server started at port "+ PORT);
})