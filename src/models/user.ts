import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type:String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
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
