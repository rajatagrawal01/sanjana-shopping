import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/Sanjana")
  .then(() => console.log("✅ Connected to MongoDB via Mongoose"))
  .catch(err => console.error("❌ Database connection error:", err));
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);
export default User;