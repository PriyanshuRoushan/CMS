import "dotenv/config";
import supabase from "./src/config/supabase.js";
import bcrypt from "bcrypt";

async function createAdmin() {
  console.log("Creating admin user...");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email: "roushan@gmail.com",
        password: hashedPassword,
        role: "admin"
      }
    ])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating admin:", error);
  } else {
    console.log("Admin created successfully:", data);
  }
}

createAdmin();
