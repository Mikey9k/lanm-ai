import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 1110,
  },
  versionImg: {
    type: Number,
    default: 0,
  },
});

// If a model with the same name is already registered,
// delete it from the Mongoose registry to force a new schema compilation.
if (models.User) {
  delete models.User;
}

const User = model("User", UserSchema);

export default User;