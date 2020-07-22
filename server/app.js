const express=require('express');
const  mongo = require('mongoose');
const cors=require('cors');
const app=express();
const url = 'mongodb://localhost:27017/Database2';



app.use(express.json());
app.use(cors());
app.use("/",require("./routes/main"));
const port=process.env.PORT||5000;

mongo.connect(url,{useUnifiedTopology: true,useNewUrlParser: true},(err)=>
{
    if(err) console.log(err);
    else
    console.log("Database Connected Successfully");
});


app.listen(port,()=>
{
    console.log("Application is working Properly",port);
});