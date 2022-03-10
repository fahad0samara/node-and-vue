const express = require('express');
const bcrypt = require('bcrypt');
const verfition = require('../model/verfition')
const mongoose = require('../model/mong')
const router = express.Router();
const { mailsend } = require('../helper/token')
const { isValidObjectId } = require('mongoose')


router.post('/', async (req, res, next) => {
    const { userid, token } = req.body
    // if (!isValidObjectId(userid)) return res.status(400).send('your id dos not viledat')
    const data = await mongoose.findById(userid)
    if (!data) return res.status(400).send('sorry user not found')
    if (data.ver) return res.status(400).send('this id is already verfition')
    const user =await verfition.findOne({verid:data._id})
    if (!user) return res.status(400).send('sorry user not found')
//  this function for comas the toke from const bcrypt = require('bcrypt');
  const isValid=await user.compareToken(token)
  if (!isValid) return res.status(400).send('sorry  wrong token')
    data.ver= true;
    await verfition.findByIdAndDelete(user._id)
    await data.save()
    mailsend().sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>hello dud wlc</b>`, // html body

    })
    res.send('user senseful ')
})


module.exports = router;