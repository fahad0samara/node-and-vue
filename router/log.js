const express = require('express');
const router = express.Router();
const mongoose = require('../model/mong')
const  bcrypt= require('bcrypt');


router.get('/',async function(req, res, next) {
    try{
        const data = await mongoose.find({})
        res.send(data)
    }catch(err){
        next(err);
    }
})
router.post('/',async (req, res, next)=>{
try{
    const {user,password} = req.body
    const data=await mongoose.findOne({user})
    if(!data) return res.status(400).send('user not registries')
    const match=await data.comparPassword(password)
    if(!match) return res.status(400).send('the password is incorrect')

   res.send('user registries')
}catch(err){
    next(err);
}
})


module.exports = router;