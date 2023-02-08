import React, { useState, useEffect } from "react";
import GalleryGrid from "./component/GalleryGrid";
import Navbar from "./component/Navbar";
import ImageFrame from "./component/ImageFrame";
import { Routes, Route } from "react-router-dom";

function App() {
  const [search, searchSet] = useState("Nature");

  return (
    <div>
      <Navbar searchSet={searchSet} />
      <Routes>
        <Route path="/" element={<GalleryGrid search={search} />} />
        <Route path="/image" element={<ImageFrame/>} />
      </Routes>
    </div>
  );
}

export default App;
