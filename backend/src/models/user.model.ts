import mongoose, { model, Schema } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  username: string;
  profilePicture: string;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
