import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js"; //
const app = express();


app.use(cors());
app.use(express.json());

// ✅ CREATE SUPABASE CLIENT
app.get('/', (req, res) => {
    res.send("API Running....")
});

async function testConnection() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Connection failed:', error.message);
  } else {
    console.log('✅ Connection successful:', data);
  }
}

testConnection();

export default app;