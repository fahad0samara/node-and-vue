const express = require('express');
const router = express.Router();
const {isValidObjectId}=require('mongoose')
const mong = require('../model/mong')
const restpaswordmong= require('../model/restpasword')
 require('bcrypt');


router.post('/',async(req, res, next) => {
  try {
    const{id,token}=req.query
    if(!id||!token) return res.status(400).send('no user writ user')
    if(!isValidObjectId(id)) return res.status('invalid user')
    const data=await mong.findById(id)
    if(!data) return res.status(400).send('sorry user not found')
    const  resttoken=await restpaswordmong.findOne({verid:data._id})
    if(!resttoken) return res.status(400).send('rest token not found')
    const isthetoke=await resttoken.compareToken(token)
    if(!isthetoke) return res.status(400).send('the token wrong')
req.data=data
next()
  }catch(e) {
      next(e);
  }


})


module.exports = router;