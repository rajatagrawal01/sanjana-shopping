import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Sanjana")
  .then(() => console.log("✅ Connected to MongoDB via Mongoose"))
  .catch(err => console.log("❌ Database connection error:", err));
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

app.post("/insert", async (req, res) => {
  try {
    const data = req.body; 
    const newUsers = await User.insertMany(data);
    res.send("User(s) inserted successfully");
  } catch (err) {
    res.status(500).send("Error while inserting data: " + err.message);
  }
});
app.get("/fetch", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error while fetching data");
  }
});

app.put("/update", async (req, res) => {
  try {
    await User.updateMany({}, { $set: { active: true } });
    res.send("User data updated successfully");
  } catch (err) {
    res.status(500).send("Error while updating data");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    // Mongoose syntax: User.deleteMany()
    await User.deleteMany({});
    res.send("User data deleted successfully");
  } catch (err) {
    res.status(500).send("Error while deleting data");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});