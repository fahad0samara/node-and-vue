
const crypto= require('crypto');
const nodemailer=require('nodemailer');
exports.getttoken = () => {
    let token =""
    for (let i = 0; i <=3; i++) {
        const rendom=Math.round(Math.random() *7)
        token =token+rendom 
    }
    return token
}
exports.mailsend = () => 
    nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "6c9fe53557b783",
          pass: "e4f308628cd672"
        }
      });
      // this functionfor to the token (number)1258
      // {80017aab3bc2d58f4412614d67cf80a6479ff4fc948dce9c7a046412b27b}
exports.createrandem =()=>
  new Promise((resolve, reject) => {
    crypto.randomBytes(30.,(err,buf)=>{
if (err) reject(err);
const token=buf.toString('hex')
resolve(token)
    })
  })



  




