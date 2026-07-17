import express from "express";
import User from "./db.js"; 

const app = express();
const port = 3000;

app.use(express.json());

app.post("/insert", async (req, res) => {
  try {
    const data = req.body; 
    await User.insertMany(data);
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

app.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Find the user first to flip their active status
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    
    user.active = !user.active; // Toggle true/false
    await user.save();
    
    res.send("User status updated successfully");
  } catch (err) {
    res.status(500).send("Error while updating data");
  }
});

// 4. DELETE: Delete a SPECIFIC user by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error while deleting data");
  }
});


app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});