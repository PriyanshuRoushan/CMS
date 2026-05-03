import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API Running....");
});

// ✅ DB connection test
async function testConnection() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .limit(1);

  if (error) {
    console.error("❌ Connection failed:", error.message);
  } else {
    console.log("✅ Connection successful:", data);
  }
}

testConnection();

export default app;