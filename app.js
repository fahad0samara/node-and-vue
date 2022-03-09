const express = require('express');
const app = express();
const cors = require('cors')

 

const path = require('path');
const sing= require('./router/sing');
const log= require('./router/log');
const forget = require('./router/forgetpassword')
const ver= require('./router/verify')
const isvalid= require('./router/is-valid')
const restpasword= require('./router/restpassword')
app.use(cors())
app.set('port', process.env.port || 2020) 
app.use(express.json())
app.get('/', (req, res, next) =>{
    res.send('<h1>Hello world<h1>');
})
app.use('/sing',sing);
app.use('/log',log);
app.use('/verify-email' ,ver)
app.use('/forget-password' ,forget)

app.use('/rest-password',isvalid,restpasword)

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})