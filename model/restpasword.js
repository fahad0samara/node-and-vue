const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://fahad:fahad@cluster0.zobfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('connection verfir');
    }).catch(err => console.log(err));
const restpaswordmong = new mongoose.Schema({

    verid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', required: true
    },
    token: { type: String, required: true },
    createdAt: {
        type: Date, expires: 3600,
        default: Date.now()
    }

})
restpaswordmong.pre('save', async function (next) {
    const has = await bcrypt.hash(this.token, 8);
    this.token = has
    next()
}
)

restpaswordmong.methods.compareToken=async function (token) {
    const result = await bcrypt.compareSync(token, this.token)
    return result
}
module.exports = mongoose.model("restpasword", restpaswordmong)