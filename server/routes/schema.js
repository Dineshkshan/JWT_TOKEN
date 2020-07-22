const mongo=require('mongoose');


const Userschema=mongo.Schema({
        Username:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        }
});

module.exports=mongo.model('schema',Userschema);