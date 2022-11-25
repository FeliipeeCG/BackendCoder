import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { String, required: true },
  password: { String, required: true },
});

userSchema.methods.encryptPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePass = (password) => {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("users", userSchema);
