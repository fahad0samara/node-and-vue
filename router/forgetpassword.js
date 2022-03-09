const express = require('express');
const router = express.Router();
const mongoose = require('../model/mong');
const restpaswordmong = require('../model/restpasword')
const {createrandem,mailsend}=require('../helper/token')


router.post('/',async(req, res, next)=>{
    try {
        const {user}=req.body
        if (!user) return res.status(400).send('plass proved availd email')
const data=await mongoose.findOne({user})
if (!data) return res.status(404).send('user not found')
const restpasword=await restpaswordmong.findOne({ verid:data._id})
if (restpasword) return res.status(404).send('only after on hour uou used')
const  token= await createrandem()  

const resttoken=new restpaswordmong({verid:data._id,token})
await resttoken.save()

mailsend().sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `http://localhost:3000/rest-password?token=${token}&id=${data._id}`,
    
})
res.send('uor link send success')
    }catch(e){next(e);}
})



module.exports = router;
