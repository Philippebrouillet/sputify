import { Route, Routes } from "react-router-dom";
import Albums from "./routes/Albums";
import Home from "./routes/Home";
import "./styles/AppRoutes.css";

export default function AppRoutes() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="albums" element={<Albums />} />
      </Routes>
    </main>
  );
}
