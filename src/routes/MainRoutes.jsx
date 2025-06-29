import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllPost from "../pages/AllPost";
import NotFound from "../pages/NotFound";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Allpost" element={<AllPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
