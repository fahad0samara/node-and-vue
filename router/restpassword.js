const express = require('express');
const router = express.Router();
const {createrandem,mailsend}=require('../helper/token')
const {isValidObjectId}=require('mongoose')
const mong = require('../model/mong')
const resetpassword = require('../model/restpasword')

const bcrypt = require('bcrypt');

router.get('/', async (req, res, next) =>{
  const{ password}=req.body
  res.send(password)  
}

)
router.post('/',async (req, res, next)=>{
    try {
        const {password}=req.body
        const data= await mong.findById(req.data._id)
        console.log(data);
        if (!data) return res.status(400).send('user not found')
        const match=await data.comparPassword(password)
        if (match) return res.status(400).send('password not match')

  
        data.password = password
        await data.save()
       await resetpassword.findOneAndDelete({verid:data._id})
        mailsend().sendMail({
            from: '"password correct " <password coreeca@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "password correct", // Subject line
            text: "Hello world?", // plain text body
            html: `password correct`, // html body
        })
        res.send('sucssfall')
    }catch(e) {
        next(e)
    }

})


module.exports = router;