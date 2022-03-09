const express = require('express');
const router = express.Router();
const veriftion = require('../model/verfition')
const mongoose = require('../model/mong')
const bcrypt = require('bcrypt');
const { getttoken,mailsend } = require('../helper/token')



router.get('/', async function (req, res, next) {
    try {
        const data = await mongoose.find({})
        res.send(data)
    } catch (err) {
        next(err);
    }
})
router.post('/', async (req, res, next) => {
    try {
        const userfind = await mongoose.findOne({ user: req.body.user })
        if (userfind) return res.status(400).send('user alrede regestrit')
        
        const data = new mongoose(req.body)

        const otp = getttoken()
        const tokenid = new veriftion({
            verid:data._id,
            token:otp
        })
        await tokenid.save()
        await data.save()
        mailsend().sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>${otp}</b>`, // html body
        })
        res.send(data)
    } catch (err) {
        next(err);
    }
})


module.exports = router;