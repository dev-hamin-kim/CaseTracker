import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckIn from "./pages/Checkin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckIn />} />
      </Routes>
    </BrowserRouter>
  );
}
