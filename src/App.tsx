import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Chapter from "./pages/Chapter";
import Section from "./pages/Section";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters/:slug" element={<Chapter />} />
        <Route
          path="/chapters/:chapterSlug/sections/:sectionSlug"
          element={<Section />}
        />
      </Routes>
    </>
  );
}
