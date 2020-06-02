import mongoose from "mongoose";

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

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.statics.build = buildUser;

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
