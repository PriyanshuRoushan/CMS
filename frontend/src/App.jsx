import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./demo/createUser.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;