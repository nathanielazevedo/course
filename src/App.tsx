import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CourseHome from "./pages/CourseHome";
import Chapter from "./pages/Chapter";
import Section from "./pages/Section";
import DsaHome from "./pages/dsa/DsaHome";
import DsaDetail from "./pages/dsa/DsaDetail";
import DsaPractice from "./pages/dsa/DsaPractice";

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
        <Route path="/courses/dsa" element={<DsaHome />} />
        <Route path="/courses/dsa/:structureId" element={<DsaDetail />} />
        <Route
          path="/courses/dsa/:structureId/practice/:questionId"
          element={<DsaPractice />}
        />
        <Route path="/courses/:courseSlug" element={<CourseHome />} />
        <Route
          path="/courses/:courseSlug/chapters/:slug"
          element={<Chapter />}
        />
        <Route
          path="/courses/:courseSlug/chapters/:chapterSlug/sections/:sectionSlug"
          element={<Section />}
        />
      </Routes>
    </>
  );
}
