import "dotenv/config";
import app from "./src/app.js";

import studentRoute from "./src/routes/student.routes.js";
import authRoutes from "./src/routes/auth.routes.js"; // ✅ ADD THIS

app.use("/api/students", studentRoute);
app.use("/api/auth", authRoutes); // ✅ ADD THIS

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});