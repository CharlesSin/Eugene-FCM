const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  roles: {
    User: Number,
    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
  lastLoginTimestamp: String,
  lastLoginDateTIme: String,
});

module.exports = mongoose.model("authUser", userSchema);
