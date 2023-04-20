const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required : true
  },
  passWord: {
    type: String,
    required : true
  },
  userType: {
    type: String,
    required : true
  },
});

const Users = model("user", userSchema);
module.exports = Users;
