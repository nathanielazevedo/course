import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chapter from "./pages/Chapter";
import Section from "./pages/Section";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chapters/:slug" element={<Chapter />} />
      <Route
        path="/chapters/:chapterSlug/sections/:sectionSlug"
        element={<Section />}
      />
    </Routes>
  );
}
