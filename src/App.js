import React, { useState } from "react";
import GalleryGrid from "./component/GalleryGrid";
import Navbar from "./component/Navbar";
import ImageFrame from "./component/ImageFrame";
import { Routes, Route } from "react-router-dom";
import Delete from "./component/Delete";
import Collection from "./component/Collection";

function App() {
  const [search, searchSet] = useState("car");
  const [page, pageset] = useState(1);
  const api = process.env.REACT_APP_APIKEY_FLICKR;
  return (
    <div>
      <Navbar searchSet={searchSet} pageset={pageset} />
      <Routes>
        <Route
          path="/"
          element={
            <GalleryGrid
              search={search}
              api={api}
              page={page}
              pageset={pageset}
            />
          }
        />
        <Route path="/image/:id" element={<ImageFrame />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </div>
  );
}

export default App;
