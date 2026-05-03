import { useState } from "react";
import { createUser } from "../api/userapi.js";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student"
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await createUser(formData);

      setMessage("✅ User created successfully");

      // reset form
      setFormData({
        email: "",
        password: "",
        role: "student"
      });

    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.msg || "❌ Error creating user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create User</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};