import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Register from "./components/Register.tsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
