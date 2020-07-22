var express=require("express");
var mongo=require('mongoose');
var bicrypt=require('bcryptjs');
var schema=require("./schema");
var jwt=require('jsonwebtoken');

var router=express.Router();

router.get("/",async(req,res)=>
{
    res.send("App is working in Web");
});

const validUser=(req,res,next)=>
{
    console.log("The value of the auth is ",req.header('auth'));
    const valid=req.header('auth');
    validation=valid;
    //console.log(valid);
    next();
}

router.get("/get",validUser,async(req,res)=>
{
    jwt.verify(validation,'SecretKey',async(err,result)=>
    {
        if(result)
        {
            var data=await schema.find().select(['-Password']);
            console.log(data);
            return res.status(200).json(data);
        }
        else{
           return res.status(403).json("Forbidden");
        }
    });
});

router.post("/register",async(req,res)=>
{
        try{
        var data=await schema.findOne({Email:req.body.Email});
        console.log("data is",data);
        if(data)
        {
            return res.status(400).json("Username already exists found!!");
        }
        else
        {
        var hashvalue=await bicrypt.hash(req.body.Password,10);
        //console.log(hashvalue);
        const data=new schema({
            Username:req.body.Username,
            Email:req.body.Email,
            Password:hashvalue
        });
        await data.save();
        res.status(200).json(data);
    }
    }
    catch(err)
    {
        console.log(err);
    }
});

router.post('/login',async(req,res)=>
{
    //var email=req.body.Email;
    //var Password=req.body.Password;
    //console.log(email,Password);
    var data=await schema.findOne({Email:req.body.Email});
    //console.log("The value of data is",data);
    if(data!=null)
    {
        var pass=await bicrypt.compare(req.body.Password,data.Password);
        console.log(pass);
        if(pass)
        {
            var token=jwt.sign(req.body.Email,'SecretKey');
            console.log(token);
            res.header('auth',token).send(token);
            res.json(data);
        }
        else
        {
           return res.status(400).send("Password is not valid");
        }
    }
    else
    {
       return res.status(404).json("Email is not valid");
    }
    //console.log(data);
});

module.exports=router;
