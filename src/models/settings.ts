import mongoose, { Schema } from "mongoose";

const settingSchema = new Schema(
  {
    lang: String,
    calender: String,
    currency: String
  },
  {
    timestamps: true,
  },
);

const SettingsModel =
  mongoose.models.SettingsModel ||
  mongoose.model("SettingsModel", settingSchema);
export default SettingsModel;
