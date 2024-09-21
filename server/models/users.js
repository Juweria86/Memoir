import mongoose from "mongoose";

/* Defines the  schema or  pattern of information for users in the datbase */
const userSchema = mongoose.Schema({
  username: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  name: { type: String },
  profPics: { type: String, reuired: true, default: 'uploads/profilePics/defaultUser.png' },
  location: { type: String },
});

export default mongoose.model("User", userSchema);
