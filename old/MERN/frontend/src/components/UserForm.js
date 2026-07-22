import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !age) return alert("Enter all fields");
    try {
      await axios.post("http://localhost:5000/api/users", { name, email, age });
      alert("User created!");
      setName("");
      setEmail("");
      setAge("");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ marginRight: "10px", width: "100px" }}
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
