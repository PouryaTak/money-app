import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    name: String,
  },
  {
    timestamps: true,
  },
);

const UserModel =
  mongoose.models.UserModel ||
  mongoose.model("UserModel", userSchema);
export default UserModel;
