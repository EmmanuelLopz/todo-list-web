import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, About } from "../pages";
import Header from "../components/Header/Header";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}