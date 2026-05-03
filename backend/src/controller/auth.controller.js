import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password, loginType } = req.body;

  const normalizedEmail = email.trim().toLowerCase();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    return res.status(500).json({ msg: "Database error" });
  }

  // 🔐 Avoid user enumeration
  if (!user) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  // 🔒 Account checks BEFORE password
  if (user.is_deleted) {
    return res.status(403).json({ msg: "Account deactivated" });
  }

  if (user.is_active === false) {
    return res.status(403).json({ msg: "Account disabled" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  // ✅ Validate login type
  if (!loginType) {
    return res.status(400).json({ msg: "Login type required" });
  }

  if (loginType === "student" && user.role !== "student") {
    return res.status(403).json({ msg: "Student login only" });
  }

  if (loginType === "admin_teacher" && user.role === "student") {
    return res.status(403).json({ msg: "Admin/Teacher only" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};

export const getMe = async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, role")
    .eq("id", req.user.id)
    .single();

  if (error) return res.status(400).json({ error });

  res.json(data);
};