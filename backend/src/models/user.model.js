import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const Userschema = new Schema(
{
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 1,
    maxLength: 41,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 14,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
},
{
  timestamps: true
}
);

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

Userschema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
const User = mongoose.model("User", Userschema);

export { User };