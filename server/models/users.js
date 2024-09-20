import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  profilePics: { type: String },
});

export default mongoose.model("User", userSchema);
