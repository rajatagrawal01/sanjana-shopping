import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || age === undefined) {
      return res.status(400).json({ message: "Name, email, and age are required" });
    }

    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json({ message: "User saved successfully!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Data
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update Data
router.put("/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete data
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
