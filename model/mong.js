const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://fahad:fahad@cluster0.zobfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('connection ');
  }).catch(err => console.log(err));
const mongodb = new mongoose.Schema({
  user: { type: String },
  password: { type: String, required: true },
  ver:{ type:Boolean,default:false,required: true},
},



  { timestamps: true }
)


mongodb.pre('save', async function (next) {
  const has = await bcrypt.hash(this.password, 8);
  this.password = has
  next()
}
)

mongodb.methods.comparPassword=async function (password) {
  const result = await bcrypt.compareSync(password, this.password)
  return result
}
module.exports = mongoose.model("user", mongodb)