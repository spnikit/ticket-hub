import mongoose from "mongoose";
import { Password } from "../services/password";

// attributes for creating the document
interface UserAttrs {
  email: string;
  password: string;
}

// Mongo User Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Created Document my model
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.statics.build = buildUser;

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
