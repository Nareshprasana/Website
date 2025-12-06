import React, { useState } from "react";
import styles from "./Users.module.css";

function Users() {
  const emptyForm = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  /* ------------------------
        ADD USER
  ------------------------- */
  const addUser = () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    }

    const newUser = {
      ...formData,
      id: Date.now().toString(),
    };

    setUsers([...users, newUser]);
    setFormData(emptyForm);
  };

  /* ------------------------
        UPDATE USER
  ------------------------- */
  const updateUser = () => {
    const updated = users.map((u) =>
      u.id === editUser.id ? editUser : u
    );
    setUsers(updated);
    setEditUser(null);
  };

  /* ------------------------
        DELETE USER
  ------------------------- */
  const deleteUser = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Users</h1>

      <div className={styles.contentGrid}>
        {/* left: form */}
        <div className={styles.leftCol}>
          <div className={styles.formBox}>
            <h2>Add User</h2>

            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button className={styles.addBtn} onClick={addUser}>
              Add User
            </button>
          </div>
        </div>

        {/* right: table */}
        <div className={styles.rightCol}>
          <div className={styles.tableWrapper}>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className={styles.noData}>
                      No users yet — add one from the form.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.username}</td>
                      <td>{u.email}</td>

                      <td>
                        <div className={styles.actionGroup}>
                          <button
                            className={styles.editBtn}
                            onClick={() => setEditUser({ ...u })}
                          >
                            Edit
                          </button>

                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteUser(u.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Edit User</h2>

            <input
              className={styles.modalInput}
              type="text"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
            />

            <input
              className={styles.modalInput}
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <button className={styles.saveBtn} onClick={updateUser}>
              Update
            </button>

            <button
              className={styles.closeBtn}
              onClick={() => setEditUser(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
