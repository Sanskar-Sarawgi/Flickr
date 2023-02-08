import React, { useState, useEffect } from "react";
import GalleryGrid from "./component/GalleryGrid";
import Navbar from "./component/Navbar";
import ImageFrame from "./component/ImageFrame";
import { Routes, Route } from "react-router-dom";

function App() {
  const [search, searchSet] = useState("Nature");
  const [page, pageset] = useState(1);
  const api = process.env.REACT_APP_APIKEY_FLICKR;
  return (
    <div>
      <Navbar searchSet={searchSet} pageset = {pageset}/>
      <Routes>
        <Route path="/" element={<GalleryGrid search={search} api = {api} page = {page} pageset = {pageset} />} />
        <Route path="/image/:id" element={<ImageFrame/>} />
      </Routes>
    </div>
  );
}

export default App;
