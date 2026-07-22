import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAge, setEditAge] = useState("");

  const fetchUsers = async () => {
    const res = await getAPI;
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditAge(user.age || "");
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, {
      name: editName,
      email: editEmail,
      age: editAge,
    });
    setEditUserId(null);
    setEditName("");
    setEditEmail("");
    setEditAge("");
    fetchUsers();
  };

  return (
    <table
      border="1"
      cellPadding="10"
      style={{ margin: "auto", borderCollapse: "collapse", minWidth: "60%" }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>
              {editUserId === user._id ? (
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              ) : (
                <span>{user.name}</span>
              )}
            </td>
            <td>
              {editUserId === user._id ? (
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              ) : (
                <span>{user.email}</span>
              )}
            </td>
            <td>
              {editUserId === user._id ? (
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  style={{ width: "80px" }}
                />
              ) : (
                <span>{user.age ?? "-"}</span>
              )}
            </td>
            <td>
              {editUserId === user._id ? (
                <button onClick={() => handleUpdate(user._id)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEdit(user)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;