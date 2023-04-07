const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    userName: String,
    passWord: String,
    userType: String

})

const Users = model("user", userSchema);
module.exports = Users