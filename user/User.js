var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  firstname: String,
  lastname: String,
  password: String,
  telnumber:String,
  email:String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');