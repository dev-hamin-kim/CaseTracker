import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkin from "./pages/Checkin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkin />} />
      </Routes>
    </BrowserRouter>
  );
}
