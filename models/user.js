const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre("save", async function () {
  const currentDocument = this;
  // -------- Hashing Password before saving in DB -----------
  // const hashedPassword = await bcrypt.hash(currentDocument.password, 10);
  // currentDocument.password = hashedPassword

  console.log(currentDocument);
});

userSchema.methods.checkPassword = async function () {
  const currentDocument = this;

  const isMatch = await bcrypt.compare(password, currentDocument.password);

  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
